import React from "react";
import Avatar from "boring-avatars";
import Dropdown from "./Dropdown";
import StoresContext from "../util/context";
import { observer } from "mobx-react";
import { useContext } from "react";
import Model from "./Model";
import { GET_AVATAR } from "../helpers/querys";
import { gql, useMutation, useQuery } from "@apollo/client";
import { AUTH_ID, AUTH_NAME, AUTH_TOKEN } from "../constants/constants";
import mstContext from "../util/mstContext";
import UserAvatar from "./Avitar/UserAvatar";

const NavBar = observer(function NavBar() {
  const store = useContext(StoresContext);
  const authId = Number(localStorage.getItem(AUTH_ID));
  const mstStore = useContext(mstContext);
  const { loading, error, data } = useQuery(GET_AVATAR, {
    variables: {
      userId: Number(localStorage.getItem(AUTH_ID)),
    },
  });

  const avitarModalHandler = () => {
    mstStore.modals.toggleModel();
  };

  return (
    <div className="navbar ">
      {/*<div className="flex-none sm:flex">
        {/* hamburger menu
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
      </div>*/}
      {/*website title*/}
      <div className="flex-1 px-2 mx-2 lg:flex">
        <span className="text-lg font-bold">
          <span className="whitespace-nowrap">Bible Talk</span> Live
        </span>
      </div>
      <div className="flex-1 lg:flex-none"></div>
      <div className="flex-none">
        {store.authStore.isAuthenticated && (
          //name from localstorage if authenticated
          <h3 className="font-bold pb-1 text-blue-600 lowercase ">
            {localStorage.getItem(AUTH_NAME)}
          </h3>
        )}
        <Model name={"Login"} />
        {!store.authStore.isAuthenticated && <Model name="Register" />}
      </div>
      <div className="flex-none ">
        <div className="avatar dropdown dropdown-end">
          <div tabIndex={0} className={"rounded-full w-10 h-10 m-1 "}>
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 absolute right-0 top-0 opacity-70"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z"
                  clipRule="evenodd"
                />
              </svg>
              <UserAvatar userId={authId ? authId : 11} avitarSize={40} />
            </div>
          </div>
          {store.authStore.isAuthenticated && (
            <ul
              tabIndex={0}
              className="p-2 shadow menu dropdown-content bg-base-100 rounded-box w-52"
            >
              <li
                className="hover:font-bold cursor-pointer"
                onClick={avitarModalHandler}
              >
                Avatar
              </li>
              <li className="hover:font-bold cursor-pointer">User Settings</li>
              <li className="hover:font-bold cursor-pointer">
                Create a Community
              </li>
              <li className="hover:font-bold cursor-pointer">
                Create a Organization
              </li>
              <li className="hover:font-bold cursor-pointer">Newsletter</li>
              <li className="hover:font-bold cursor-pointer">
                Achievements & Statistics
              </li>
              <li className="hover:font-bold cursor-pointer"> Donate </li>
              {/*add logout to menu in mobile?*/}
              {/*<li className="hover:font-bold cursor-pointer"> Logout </li>*/}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
});

export default NavBar;
