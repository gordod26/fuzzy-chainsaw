import React, { useState } from "react";
import { useContext } from "react";
import { observer } from "mobx-react";
import StoresContext from "../util/context";
import { useQuery, gql } from "@apollo/client";

const TranslationMenu = observer(function TranslationMenu() {
  const store = useContext(StoresContext);
  const [open, setOpen] = useState(false);

  function openHandler() {
    setOpen(!open);
  }

  return (
    <div
      className="flex"
      onClick={() => {
        openHandler();
      }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6 flex-0"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
        />
      </svg>
      {open && (
        <nav className="bg-gray-200 flex-1 border-gray-300 border">
          <ul className="flex justify-evenly">
            <li>
              <button
                onClick={() => {
                  store.bibleStore.handleTranslation("t_asv");
                }}
              >
                ASV
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  store.bibleStore.handleTranslation("t_kjv");
                }}
              >
                KJV
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  store.bibleStore.handleTranslation("t_bbe");
                }}
              >
                BBE
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  store.bibleStore.handleTranslation("t_dby");
                }}
              >
                DBY
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  store.bibleStore.handleTranslation("t_ylt");
                }}
              >
                YLT
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  store.bibleStore.handleTranslation("t_web");
                }}
              >
                WEB
              </button>
            </li>
          </ul>
        </nav>
      )}
    </div>
  );
});

export default TranslationMenu;
