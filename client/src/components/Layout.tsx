import React from "react";
import NavBar from "./NavBar";
import Nav from "./Nav";

export default function Layout () {
  return (
    <div className={"h-screen flex flex-col overflow-hidden"}>
    <NavBar/>
      <Nav/>
    </div>
  )
}
