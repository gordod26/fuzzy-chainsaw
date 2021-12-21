import StoresContext from "../../../util/context";
import { observer } from "mobx-react";
import { useContext, useEffect, useState } from "react";

interface IColorSampleSvgProps {
  color: string;
}

// #2 create model to confirm delete
const ColorCircle = observer((props: IColorSampleSvgProps) => {
  const store = useContext(StoresContext);

  return (
    <div>
      <svg height={20} width={30}>
        <circle cx={10} cy={10} r={10} fill={props.color} />
      </svg>
    </div>
  );
});

export default ColorCircle;
