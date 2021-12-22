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
      <Color color={props.color1} />
      <Color color={props.color2} />
      <Color color={props.color3} />
      <Color color={props.color4} />
      <Color color={props.color5} />
    </div>
  );
});

export default ColorCircle;
