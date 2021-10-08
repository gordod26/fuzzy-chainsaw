import React, { useState } from "react";
import { useContext } from "react";
import { observer } from "mobx-react";
import StoresContext from "../util/context";
import { useQuery, gql } from "@apollo/client";

const Dropdown = observer(function Dropdown() {
  const store = useContext(StoresContext);
  const [open, setOpen] = useState(false);

  function openHandler() {
    setOpen(!open);
  }

  return (
    <div className="w-4/5 m-auto">
      <div
        className="float-right"
        onClick={() => {
          openHandler();
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </div>
      {open && (
        <nav>
          <ul className="flex justify-evenly">
            <li>About</li>
            <li>Settings</li>
            <li>Profile</li>
          </ul>
        </nav>
      )}
    </div>
  );
});

export default Dropdown;
