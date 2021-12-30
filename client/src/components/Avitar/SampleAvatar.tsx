import StoresContext from "../../util/context";
import mstContext from "../../util/mstContext";
import { GET_AVATAR_STYLE } from "../../helpers/querys";
import colors from "nice-color-palettes";
import { randomColors } from "../../helpers/colors";
import ColorCircle from "./ColorSamples/ColorSampleSvg";
import { observer } from "mobx-react";
import { useContext, useEffect, useState } from "react";
import AuthModelBody from "./../AuthModelBody";
import Avatar from "boring-avatars";
import ColorGroup from "./ColorSamples/ColorSampleGroup";
import { gql, useMutation, useQuery } from "@apollo/client";

interface ISampleAvatar {
  AvatarId: number;
  colors: string[];
  handleSelect: any;
  selected: string | undefined;
}

// #2 create model to confirm delete
const SampleAvatar = observer(
  ({ AvatarId, colors, handleSelect, selected }: ISampleAvatar) => {
    const { loading, error, data } = useQuery(GET_AVATAR_STYLE, {
      variables: {
        getStyleId: AvatarId,
      },
    });

    const color0 = colors[0],
      color1 = colors[1],
      color2 = colors[2],
      color3 = colors[3],
      color4 = colors[4];

    useEffect(() => {
      //if(loading) {console.debug("avitar loading,", props.userId)}
      //if(error) {console.debug("getavitar error,", error , props.userId)}
      //if(data) { console.debug("avitar data", data, Number(props.userId))}
      //console.log("id", props.id);
      //console.log("props.time", props.time);
    }, [loading, error, data, AvatarId]);

    return (
      <div>
        {data ? (
          <div
            className={"relative"}
            onClick={() => handleSelect(data.getStyle.name)}
          >
            <Avatar
              size={50}
              name={data.getStyle.name}
              variant="beam"
              colors={[color0, color1, color2, color3, color4]}
            />
            {selected === data.getStyle.name && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 absolute -top-1 -right-1 opacity-70"
                viewBox="0 0 20 20"
                fill="green"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
            )}
          </div>
        ) : (
          <Avatar
            size={50}
            name="blank replacement"
            variant="marble"
            colors={["#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff"]}
          />
        )}
        <p className="flex justify-center font-light pt-2">
          {data && data.getStyle.alias}
        </p>
      </div>
    );
  }
);

export default SampleAvatar;
