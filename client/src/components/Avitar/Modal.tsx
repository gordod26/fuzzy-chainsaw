import StoresContext from "../../util/context";
import ColorCircle from "./ColorSamples/ColorSampleSvg";
import { observer } from "mobx-react";
import { useContext, useEffect, useState } from "react";
import AuthModelBody from "./../AuthModelBody";
import Avatar from "boring-avatars";
import ColorGroup from "./ColorSamples/ColorSampleGroup";

// #2 create model to confirm delete
const AvitarModal = observer((props: any) => {
  const store = useContext(StoresContext);

  useEffect(() => {}, []);

  return (
    <div className="modal modal-open">
      <div className="modal-box mx-auto">
        <ColorGroup />
        <div className="modal-action mt-4 mb-6">
          <div className="btn m-auto">Random Palette</div>
        </div>
        <div className="grid grid-cols-3 grid-overflow-auto gap-5 place-items-center max-h-96">
          <div>
            <Avatar
              size={50}
              name="Matthew"
              variant="beam"
              colors={["#92A1C6", "#146A7C", "#F0AB3D", "#C271B4", "#C20D90"]}
            />
            <p className="flex justify-center font-light pt-2">John</p>
          </div>
          <div>
            <Avatar
              size={50}
              name="John"
              variant="beam"
              colors={["#92A1C6", "#146A7C", "#F0AB3D", "#C271B4", "#C20D90"]}
            />
            <p className="flex justify-center font-light pt-2">John</p>
          </div>
          <div>
            <Avatar
              size={50}
              name="Luke"
              variant="beam"
              colors={["#92A1C6", "#146A7C", "#F0AB3D", "#C271B4", "#C20D90"]}
            />
            <p className="flex justify-center font-light pt-2">Luke</p>
          </div>
          <div>
            <Avatar
              size={50}
              name="Jacob"
              variant="beam"
              colors={["#92A1C6", "#146A7C", "#F0AB3D", "#C271B4", "#C20D90"]}
            />
            <p className="flex justify-center font-light pt-2">Jacob</p>
          </div>
          <div>
            <Avatar
              size={50}
              name="Mary"
              variant="beam"
              colors={["#92A1C6", "#146A7C", "#F0AB3D", "#C271B4", "#C20D90"]}
            />
            <p className="flex justify-center font-light pt-2">Mary</p>
          </div>
          <div>
            <Avatar
              size={50}
              name="David"
              variant="beam"
              colors={["#92A1C6", "#146A7C", "#F0AB3D", "#C271B4", "#C20D90"]}
            />
            <p className="flex justify-center font-light pt-2">David</p>
          </div>
          <Avatar
            size={50}
            name="Margaret Brent"
            variant="beam"
            colors={["#92A1C6", "#146A7C", "#F0AB3D", "#C271B4", "#C20D90"]}
          />
          <Avatar
            size={50}
            name="Lucy Stone"
            variant="beam"
            colors={["#92A1C6", "#146A7C", "#F0AB3D", "#C271B4", "#C20D90"]}
          />
          <Avatar
            size={50}
            name="Mary Edwards"
            variant="beam"
            colors={["#92A1C6", "#146A7C", "#F0AB3D", "#C271B4", "#C20D90"]}
          />
          <Avatar
            size={50}
            name="Mary Baker"
            variant="beam"
            colors={["#92A1C6", "#146A7C", "#F0AB3D", "#C271B4", "#C20D90"]}
          />
          <Avatar
            size={50}
            name="Amelia Earhart"
            variant="beam"
            colors={["#92A1C6", "#146A7C", "#F0AB3D", "#C271B4", "#C20D90"]}
          />
        </div>
      </div>
    </div>
  );
});

export default AvitarModal;
