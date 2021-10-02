import React, { JSXElementConstructor, useEffect } from "react";
import bible from "../data/kjv.json";
import { useContext } from "react";
import { observer } from "mobx-react";
import StoresContext from "../util/context";
import { useQuery, gql } from "@apollo/client";

type AppProps = {
  chapter: string;
  e: void;
};

const CHAPTER_QUERY = gql`
  query Query($chapterTranslation: String!, $chapterB: Int!, $chapterC: Int!) {
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
  const { loading, error, data } = useQuery(CHAPTER_QUERY, {
    variables: {
      chapterTranslation: "t_asv",
      chapterC: 1,
      chapterB: 1,
    },
  });
  const store = useContext(StoresContext);

  useEffect(() => {
    console.log("myquery", data.chapter.c);
  }, [data]);
  const textHandler = (text: Array<{ verse: string; text: string }>) => {
    return text.map((t) => {
      return (
        <div
          className={`${
            store.refStore.yellowVerses.some(
              (item) =>
                item.verse === t.verse &&
                item.book === bible.book &&
                bible.chapters[0].chapter === item.chapter
            )
              ? "bg-yellow-200"
              : "bg-transparent"
          } inline`}
          //adds verses to set of selected verses
          onClick={() => {
            store.refStore.yellowVersesHandler(
              bible.book,
              bible.chapters[0].chapter,
              t.verse
            );
            //console.log(bible.book, bible.chapters[0].chapter, ":", t.verse);
          }}
        >
          {" "}
          <sup>{JSON.stringify(t.verse).replace(/^"|"$/g, "")}</sup>
          <span>{JSON.stringify(t.text).replace(/^"|"$/g, "")}</span>
        </div>
      );
    });
  };

  return (
    <div className={"overflow-auto h-full"}>
      <h1 className={"text-center text-5xl py-7 font-bold"}>
        {JSON.stringify(bible.book.toUpperCase()).replace(/^"|"$/g, "")}
      </h1>
      <div className="w-3/5 h-full m-auto ">
        <h2 className={"text-7xl float-left inline px-3"}>
          {JSON.stringify(bible.chapters[0].chapter).replace(/^"|"$/g, "")}
        </h2>
        {textHandler(bible.chapters[0].verses)}
      </div>
    </div>
  );
});

export default Bible;
