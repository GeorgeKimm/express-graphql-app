import React, { useRef, useEffect } from "react";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import Nav from "./components/menu/menu";

import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Home from "./components/home/home";
import Contacts from "./components/contacts/contacts";
import Posts from "./components/posts/posts";
import Post from "./components/posts/post";
import AddPost from "./components/add-post/add-post";

const client = new ApolloClient({
  uri: "http://localhost:3005/",
  cache: new InMemoryCache(),
});

const AutoReload = ({ children }) => {
  const location = useLocation();
  const previousKey = useRef("default");
  // console.log("previousKey", previousKey);
  // console.log("locationkey", location);

  useEffect(() => {
    if (
      previousKey.current !== "default" &&
      previousKey.current !== location.key
    ) {
      window.location.reload();
    }
    previousKey.current = location.key;
  }, [location]);

  return children;
};

function App() {
  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route
            exact
            path="/"
            element={
              <AutoReload>
                <Home />
              </AutoReload>
            }
          />
          <Route
            exact
            path="/posts"
            element={
              <AutoReload>
                <Posts />
              </AutoReload>
            }
          />
          <Route path="/posts/:id" element={<Post />} />
          <Route
            path="/add-post"
            element={
              <AutoReload>
                <AddPost />
              </AutoReload>
            }
          />
          <Route
            path="/contacts"
            element={
              <AutoReload>
                <Contacts />
              </AutoReload>
            }
          />
          <Route path="*" element={<h2>there is nothing here</h2>} />
        </Routes>
      </BrowserRouter>
    </ApolloProvider>
  );
}

export default App;
