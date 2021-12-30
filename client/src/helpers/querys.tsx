import { gql } from "@apollo/client";

export const GET_AVATAR = gql`
  query Query($userId: Int!) {
    getAvatar(userId: $userId) {
      name
      color0
      color1
      color2
      color3
      color4
    }
  }
`;

export const GET_AVATAR_STYLE = gql`
  query Query($getStyleId: Int!) {
    getStyle(id: $getStyleId) {
      id
      name
      alias
    }
  }
`;
