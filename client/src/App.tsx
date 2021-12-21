import React, { createContext } from "react";
import "./App.css";
import Layout from "./components/Layout";
import { observer } from "mobx-react";
import stores from "./mobx/index";
import StoresContext from "./util/context";

const App = observer(function App() {
  return (
    <StoresContext.Provider value={stores}>
      <Layout></Layout>
    </StoresContext.Provider>
  );
});

export default App;
