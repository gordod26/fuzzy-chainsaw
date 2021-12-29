import StoresContext from "../../util/context";
import mstContext from "../../util/mstContext";
import colors from "nice-color-palettes";
import { randomColors } from "../../helpers/colors";
import ColorCircle from "./ColorSamples/ColorSampleSvg";
import { observer } from "mobx-react";
import { useContext, useEffect, useState } from "react";
import AuthModelBody from "./../AuthModelBody";
import Avatar from "boring-avatars";
import ColorGroup from "./ColorSamples/ColorSampleGroup";

// #2 create model to confirm delete
const AvitarModal = observer((props: any) => {
  const store = useContext(StoresContext);
  const mstStore = useContext(mstContext);
  const [colors, setColors] = useState([
    "#69d2e7",
    "#a7dbd8",
    "#e0e4cc",
    "#f38630",
    "#fa6900",
  ]);

  const handleSave = () => {
    mstStore.modals.toggleModel();
  };

  const handleClose = () => {
    mstStore.modals.toggleModel();
  };

  useEffect(() => {
    console.log(colors);
  }, []);

  return (
    <div className="modal modal-open">
      <div className="modal-box mx-auto">
        <ColorGroup
          color1={colors[0]}
          color2={colors[1]}
          color3={colors[2]}
          color4={colors[3]}
          color5={colors[4]}
        />
        <div className="modal-action mt-4 mb-6">
          <div
            onClick={() => {
              setColors(randomColors);
            }}
            className="btn m-auto"
          >
            Random Palette
          </div>
        </div>
        <div className="grid grid-cols-3 grid-overflow-auto gap-5 place-items-center max-h-96">
          <div>
            <Avatar
              size={50}
              name="Matthew"
              variant="beam"
              colors={[colors[0], colors[1], colors[2], colors[3], colors[4]]}
            />
            <p className="flex justify-center font-light pt-2">John</p>
          </div>
          <div>
            <Avatar
              size={50}
              name="John"
              variant="beam"
              colors={[colors[0], colors[1], colors[2], colors[3], colors[4]]}
            />
            <p className="flex justify-center font-light pt-2">John</p>
          </div>
          <div>
            <Avatar
              size={50}
              name="Luke"
              variant="beam"
              colors={[colors[0], colors[1], colors[2], colors[3], colors[4]]}
            />
            <p className="flex justify-center font-light pt-2">Luke</p>
          </div>
          <div>
            <Avatar
              size={50}
              name="Jacob"
              variant="beam"
              colors={[colors[0], colors[1], colors[2], colors[3], colors[4]]}
            />
            <p className="flex justify-center font-light pt-2">Jacob</p>
          </div>
          <div>
            <Avatar
              size={50}
              name="Mary"
              variant="beam"
              colors={[colors[0], colors[1], colors[2], colors[3], colors[4]]}
            />
            <p className="flex justify-center font-light pt-2">Mary</p>
          </div>
          <div>
            <Avatar
              size={50}
              name="David"
              variant="beam"
              colors={[colors[0], colors[1], colors[2], colors[3], colors[4]]}
            />
            <p className="flex justify-center font-light pt-2">David</p>
          </div>
        </div>
        <div className="flex justify-end mt-3">
          <button
            className="btn btn-circle btn-sm btn-warning m-3"
            onClick={handleClose}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="absolute w-4 h-4 stroke-current"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              ></path>
            </svg>
          </button>
          <button
            className="btn btn-circle btn-sm btn-success m-3"
            onClick={handleSave}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
});

export default AvitarModal;
