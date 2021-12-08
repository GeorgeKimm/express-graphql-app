import { gql } from "@apollo/client";

export const postsQuery = gql`
  query postsQuery($name: String) {
    posts(name: $name) {
      id
      text
      title
      author
    }
  }
`;
