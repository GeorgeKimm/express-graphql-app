import { gql } from "apollo-boost";

export const addPostMutation = gql`
  mutation addPost($title: String!, $author: String!, $text: String!) {
    addPost(title: $title, author: $author, text: $text) {
      title
    }
  }
`;
