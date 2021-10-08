import { useContext } from "react";
import StoresContext from "../util/context";
import { observer } from "mobx-react";

interface IData {
  data: {
    book: {
      b: number;
      n: string;
    };
    chapter: {
      c: [
        {
          id: number;
          b: number;
          c: number;
          v: number;
          t: string;
        }
      ];
    };
  };
}

const BibleTextHandler = observer(function BibleTextHandler(props: IData) {
  const store = useContext(StoresContext);
  return (
    <div>
      {props.data.chapter.c.map((t: any) => {
        return (
          <div
            className={`${
              store.refStore.yellowVerses.some(
                (item) =>
                  item.verse === t.v &&
                  item.book === props.data.book.n &&
                  props.data.chapter.c[0].c === item.chapter
              )
                ? "bg-yellow-200"
                : "bg-transparent"
            } inline`}
            //adds verses to set of selected verses
            onClick={() => {
              store.refStore.yellowVersesHandler(
                props.data.book.n,
                props.data.chapter.c[0].c,
                t.v
              );
            }}
          >
            {" "}
            <sup>{t.v}</sup>
            <span>{t.t}</span>
          </div>
        );
      })}
    </div>
  );
});

export default BibleTextHandler;
export type { IData };
