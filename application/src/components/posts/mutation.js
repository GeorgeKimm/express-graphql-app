import { gql } from "apollo-boost";

export const deletePostMutation = gql`
  mutation deletePost($id: ID) {
    deletePost(id: $id) {
      id
    }
  }
`;
