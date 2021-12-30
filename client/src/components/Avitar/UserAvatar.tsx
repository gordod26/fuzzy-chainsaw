import StoresContext from "../../util/context";
import mstContext from "../../util/mstContext";
import { GET_AVATAR } from "../../helpers/querys";
import colors from "nice-color-palettes";
import { randomColors } from "../../helpers/colors";
import ColorCircle from "./ColorSamples/ColorSampleSvg";
import { observer } from "mobx-react";
import { useContext, useEffect, useState } from "react";
import AuthModelBody from "./../AuthModelBody";
import Avatar from "boring-avatars";
import ColorGroup from "./ColorSamples/ColorSampleGroup";
import { gql, useMutation, useQuery } from "@apollo/client";

interface IUserAvatar {
  avitarSize: number;
  userId: number;
}

// #2 create model to confirm delete
const UserAvatar = observer(({ avitarSize, userId }: IUserAvatar) => {
  const { loading, error, data } = useQuery(GET_AVATAR, {
    variables: {
      userId: Number(userId),
    },
  });

  useEffect(() => {
    //if(loading) {console.debug("avitar loading,", props.userId)}
    //if(error) {console.debug("getavitar error,", error , props.userId)}
    //if(data) { console.debug("avitar data", data, Number(props.userId))}
    //console.log("id", props.id);
    //console.log("props.time", props.time);
  }, [loading, error, data, userId]);

  return (
    <>
      {data ? (
        <Avatar
          size={avitarSize}
          name={data.getAvatar.name}
          variant="beam"
          colors={[
            data.getAvatar.color0,
            data.getAvatar.color1,
            data.getAvatar.color2,
            data.getAvatar.color3,
            data.getAvatar.color4,
          ]}
        />
      ) : (
        <Avatar
          size={avitarSize}
          name="blank replacement"
          variant="marble"
          colors={["#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff"]}
        />
      )}
    </>
  );
});

export default UserAvatar;
