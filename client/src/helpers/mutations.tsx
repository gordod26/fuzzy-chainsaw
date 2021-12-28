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

