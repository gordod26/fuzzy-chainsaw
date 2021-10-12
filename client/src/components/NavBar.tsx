import React from "react";
import Avatar from "boring-avatars";
import ButtonsLoginRegister from "./ButtonsLoginRegister";
import Dropdown from "./Dropdown";
import StoresContext from "../util/context";
import { observer } from "mobx-react";
import { useContext } from "react";
import Model from "./Model";
import { gql, useMutation } from "@apollo/client";

const NavBar = observer(function NavBar() {
  const store = useContext(StoresContext);
  return (
    <div className="navbar ">
      <div className="flex-none hidden lg:flex">
        {/* hamburger menu*/}
        <button className="btn btn-square btn-ghost">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="inline-block w-6 h-6 stroke-current"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h16M4 18h16"
            ></path>
          </svg>
        </button>
      </div>
      {/*website title*/}
      <div className="flex-1 hidden px-2 mx-2 lg:flex">
        <span className="text-lg font-bold">Bible Talk Live</span>
      </div>
      <div className="flex-1 lg:flex-none"></div>
      <div className="flex-none">
        <Model name={"Login"} />
        {!store.authStore.isAuthenticated && <Model name="Register" />}
      </div>
      <div className="flex-none">
        <div className="avatar">
          <div className={"rounded-full w-10 h-10 m-1"}>
            <Avatar
              size={40}
              name="Lucy Stone"
              variant="beam"
              colors={["#CAFF42", "#0E8D94", "#D0E0EB", "E9D558", "#49708A"]}
            />
          </div>
        </div>
      </div>
    </div>
  );
});

export default NavBar;
