import React from "react";
import Bible from "./Bible";
import HiddenDiv from "./HiddenDiv";
import IconMenu from "./IconMenu";

const BibleSectionContainer = (): JSX.Element => {
  return (
    <div>
      <Bible />
      <IconMenu />
    </div>
  );
};

export default BibleSectionContainer;
