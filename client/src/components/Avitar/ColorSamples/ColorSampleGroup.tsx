import StoresContext from "../../../util/context";
import { observer } from "mobx-react";
import { useContext, useEffect, useState } from "react";
import Color from "./ColorSampleSvg";

// #2 create model to confirm delete
const ColorCircle = observer((props: any) => {
  const store = useContext(StoresContext);

  useEffect(() => {}, []);

  return (
    <div className={"flex flex-row justify-center"}>
      <Color color={"#594f4f"} />
      <Color color={"#547980"} />
      <Color color={"#45ADA8"} />
      <Color color={"#9de0ad"} />
      <Color color={"#e5fcc2"} />
    </div>
  );
});

export default ColorCircle;
