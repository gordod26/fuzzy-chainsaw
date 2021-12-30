import { gql } from "@apollo/client";

export const VOTE_MUTATION = gql`
  mutation Mutation($postId: ID!) {
    vote(postId: $postId) {
      post {
        id
        votes {
          id
          user {
            id
          }
        }
      }
      user {
        id
      }
    }
  }
`;

export const DELETE_POST_MUTATION = gql`
  mutation Mutatin($deletePostId: ID!) {
    deletePost(id: $deletePostId) {
      id
    }
  }
`;

export const MUTATION_POST = gql`
  mutation Mutation($description: String!) {
    post(description: $description) {
      id
      description
      postedBy {
        id
        name
      }
    }
  }
`;

export const CHANGE_AVATAR = gql`
  mutation Mutation(
    $name: String!
    $color0: String!
    $color1: String!
    $color2: String!
    $color3: String!
    $color4: String!
  ) {
    changeAvatar(
      name: $name
      color0: $color0
      color1: $color1
      color2: $color2
      color3: $color3
      color4: $color4
    ) {
      id
    }
  }
`;
