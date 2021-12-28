import { gql} from "@apollo/client";

export const GET_AVITAR = gql`
query Query($userId: Int!) {
  getAvitar(userId: $userId) {
    name
    color0
    color1
    color2
    color3
    color4
  }
}
`;




