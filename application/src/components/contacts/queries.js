import { gql } from "@apollo/client";

export const contactsQuery = gql`
  query contactsQuery($name: String) {
    contacts(name: $name) {
      id
      name
      link
    }
  }
`;
