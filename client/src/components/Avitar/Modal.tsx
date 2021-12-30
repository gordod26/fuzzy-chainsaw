import StoresContext from "../../util/context";
import { gql, useMutation, useQuery } from "@apollo/client";
import mstContext from "../../util/mstContext";
import colors from "nice-color-palettes";
import { randomColors } from "../../helpers/colors";
import ColorCircle from "./ColorSamples/ColorSampleSvg";
import { observer } from "mobx-react";
import { useContext, useEffect, useState } from "react";
import AuthModelBody from "./../AuthModelBody";
import Avatar from "boring-avatars";
import ColorGroup from "./ColorSamples/ColorSampleGroup";
import SampleAvatar from "./SampleAvatar";
import { CHANGE_AVATAR } from "../../helpers/mutations";
import { GET_AVATAR } from "../../helpers/querys";
import { AUTH_TOKEN } from "../../constants/constants";

interface IAvatarModal {}

// #2 create model to confirm delete
const AvatarModal = observer((props: any) => {
  const authToken = localStorage.getItem(AUTH_TOKEN);
  const store = useContext(StoresContext);
  const mstStore = useContext(mstContext);
  const [colors, setColors] = useState([
    "#69d2e7",
    "#a7dbd8",
    "#e0e4cc",
    "#f38630",
    "#fa6900",
  ]);
  const [selected, setSelected] = useState<string>();

  const [changeMutation] = useMutation(CHANGE_AVATAR, {
    context: {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
    },
    variables: {
      name: String(selected),
      color0: String(colors[0]),
      color1: String(colors[1]),
      color2: String(colors[2]),
      color3: String(colors[3]),
      color4: String(colors[4]),
    },
    refetchQueries: [GET_AVATAR],
    onCompleted: (changeMutation) => {
      console.log(changeMutation);
    },
  });

  const handleSave = () => {
    if (selected) {
      changeMutation();
    }
    mstStore.modals.toggleModel();
  };
  const handleClose = () => {
    mstStore.modals.toggleModel();
  };
  const handleSelect = (AvitarName: string) => {
    if (selected === AvitarName) {
      setSelected(undefined);
    } else {
      setSelected(AvitarName);
    }
  };

  useEffect(() => {
    console.debug(colors);
    console.debug(selected);
  }, [selected, colors]);

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
          <SampleAvatar
            AvatarId={1}
            colors={colors}
            handleSelect={handleSelect}
            selected={selected}
          />
          <SampleAvatar
            AvatarId={2}
            colors={colors}
            handleSelect={handleSelect}
            selected={selected}
          />
          <SampleAvatar
            AvatarId={3}
            colors={colors}
            handleSelect={handleSelect}
            selected={selected}
          />
          <SampleAvatar
            AvatarId={4}
            colors={colors}
            handleSelect={handleSelect}
            selected={selected}
          />
          <SampleAvatar
            AvatarId={5}
            colors={colors}
            handleSelect={handleSelect}
            selected={selected}
          />
          <SampleAvatar
            AvatarId={6}
            colors={colors}
            handleSelect={handleSelect}
            selected={selected}
          />
        </div>
        <div className="flex justify-end mt-3">
          {/*save & close buttons*/}
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

export default AvatarModal;
