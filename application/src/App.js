import React from "react";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import Nav from "./components/menu/menu";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/home/home";
import Contacts from "./components/contacts/contacts";
import Posts from "./components/posts/posts";
import Post from "./components/posts/post";
import AddPost from "./components/add-post/add-post";

const client = new ApolloClient({
  uri: "http://localhost:3005/",
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/posts" element={<Posts />}>
            <Route path=":id" element={<Post />} />
          </Route>
          <Route exact path="/add-post" element={<AddPost />} />
          <Route exact path="/contacts" element={<Contacts />} />
          <Route path="*" element={<h2>there is nothing here</h2>} />
        </Routes>
      </BrowserRouter>
    </ApolloProvider>
  );
}

export default App;
