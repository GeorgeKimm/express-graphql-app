import React, { useState } from "react";
import { useQuery } from "@apollo/client";

import { contactsQuery } from "./queries";

function Contacts() {
  const [name, setName] = useState("");

  const {
    loading,
    error,
    data = {},
  } = useQuery(contactsQuery, {
    variables: { name },
  });

  console.log("contactsQuery", contactsQuery);
  console.log("contactData", data);
  const { contacts } = data;

  return (
    <>
      <h1>Contacts:</h1>
      <ul className="contacts">
        {contacts &&
          contacts.map(({ id, link, name }) => {
            return (
              <li key={id}>
                <a href={link}>{name}</a>
              </li>
            );
          })}
      </ul>
    </>
  );
}

export default Contacts;
