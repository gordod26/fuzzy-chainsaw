import { makeAutoObservable, toJS } from "mobx";
import { parse } from "path";
import { ChangeEvent } from "react";

interface IRefStore {}

export default class RefStore {
  constructor() {
    makeAutoObservable(this);
  }

  //selected verse
  yellowVerses: any[] = [];
  postInput: string = "";
  formattedSelection = "";

  logVerse(e: any) {
    console.log("RefStore", "logVerse", e);
  }
  // push or remove verse from selected verse
  yellowVersesHandler(book: string, chapter: number, verse: string) {
    const obj = { book: book, chapter: chapter, verse: verse };
    const index = this.yellowVerses.findIndex(
      (item) =>
        item.book === obj.book &&
        item.chapter === obj.chapter &&
        item.verse === obj.verse
    );
    this.yellowVerses.some(
      (item) =>
        item.book === obj.book &&
        item.chapter === obj.chapter &&
        item.verse === obj.verse
    )
      ? this.yellowVerses.splice(index, 1)
      : this.yellowVerses.push(obj);
    //this.yellowVerses.push({ book: book, chapter: chapter, verse: verse });
    console.log("RefStore", "yellowVersesHandler", toJS(this.yellowVerses));

    this.refFormatHandler();
  }

  clearPostInput() {
    this.postInput = "";
  }

  postInputHandler(e?: ChangeEvent<HTMLTextAreaElement> | string) {
    if (typeof e !== "string" && e !== undefined) {
      this.postInput = e.target.value;
      console.log("Refstore", "postInputHandler", toJS(this.postInput));
    } else {
      this.postInput = "";
    }
  }

  refFormatHandler() {
    const a = this.yellowVerses;
    const formatted = function formatWithRanges() {
      const vArr = a
        .map((i) => Number(i.verse))
        .sort((a, b) => {
          return a - b;
        });

      let res = [],
        last = null;

      for (let x of vArr) {
        if (last && last[1] + 1 === x) last[1]++;
        else res.push((last = [x, x]));
      }

      return res
        .map((r) => (r[0] === r[1] ? r[0] : r[0] + "-" + r[1]))
        .join(",");
    };
    const fullFormat =
      typeof a[0] === "undefined"
        ? ""
        : `${a[0].book.slice(0, 3)} ${a[0].chapter}:${formatted()}`;

    return (this.formattedSelection = fullFormat);
  }
}
