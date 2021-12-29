import React from "react";
import NavBar from "./NavBar";
import Nav from "./Nav";
import AvitarModal from "./Avitar/Modal";
import mstContext from "../util/mstContext";
import { useContext } from "react";
import { observer } from "mobx-react";

const Layout = observer(() => {
  const mstStore = useContext(mstContext);

  return (
    <>
      <div className={"h-screen flex flex-col overflow-hidden"}>
        <NavBar />
        <Nav />
        {mstStore.modals.avitarModel && <AvitarModal />}
      </div>
    </>
  );
});

export default Layout;
