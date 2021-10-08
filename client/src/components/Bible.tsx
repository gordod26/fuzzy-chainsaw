import React, { JSXElementConstructor, useEffect } from "react";
import bible from "../data/kjv.json";
import { useContext } from "react";
import { observer } from "mobx-react";
import StoresContext from "../util/context";
import { useQuery, gql } from "@apollo/client";
import BibleTextHandler from "./BibleTextHandler";

const CHAPTER_QUERY = gql`
  query QueryBible(
    $bookB: Int!
    $chapterTranslation: String!
    $chapterB: Int!
    $chapterC: Int!
  ) {
    book(b: $bookB) {
      b
      n
    }
    chapter(translation: $chapterTranslation, b: $chapterB, c: $chapterC) {
      c {
        id
        b
        c
        v
        t
      }
    }
  }
`;

const Bible = observer(function Bible() {
  const store = useContext(StoresContext);
  const { loading, error, data } = useQuery(CHAPTER_QUERY, {
    fetchPolicy: "no-cache",
    variables: {
      chapterTranslation: store.bibleStore.translation,
      chapterC: store.bibleStore.c,
      chapterB: store.bibleStore.b,
      bookB: store.bibleStore.b,
    },
  });

  useEffect(() => {
    store.bibleStore.handleData(data);

    console.log("GQL query", data);
  }, [data]);
  const textHandler = (text: Array<{ v: string; t: string }>) => {
    return text.map((t) => {
      return (
        <div
          className={`${
            store.refStore.yellowVerses.some(
              (item) =>
                item.verse === t.v &&
                item.book === data.book.n &&
                data.chapter.c[0].c === item.chapter
            )
              ? "bg-yellow-200"
              : "bg-transparent"
          } inline`}
          //adds verses to set of selected verses
          onClick={() => {
            store.refStore.yellowVersesHandler(
              data.book.n,
              data.chapter.c[0].c,
              t.v
            );
            //console.log(bible.book, bible.chapters[0].chapter, ":", t.verse);
          }}
        >
          {" "}
          <sup>{t.v}</sup>
          <span>{t.t}</span>
        </div>
      );
    });
  };

  return (
    <div>
      {loading && <></>}
      {error && <p>ERROR, {error}</p>}
      {data && (
        <div className={"overflow-auto h-full"}>
          <h1 className={"text-center text-5xl py-7 font-bold"}>
            {JSON.stringify(data.book.n).replace(/^"|"$/g, "")}
          </h1>
          <div className="transition-opacity w-3/5 h-full m-auto ">
            <h2 className={"text-7xl float-left inline px-3"}>
              {JSON.stringify(data.chapter.c[0].c).replace(/^"|"$/g, "")}
            </h2>
            <BibleTextHandler data={data} />;
          </div>
        </div>
      )}
    </div>
  );
});

export default Bible;
