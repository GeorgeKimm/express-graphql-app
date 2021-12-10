import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";

import { postsQuery } from "../posts/queries";
import { addPostMutation } from "./mutation";

function AddPost() {
  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [text, setText] = useState("");
  const navigate = useNavigate();

  const [addPost, { loading, error, dataAddPost }] = useMutation(
    addPostMutation,
    {
      refetchQueries: [{ query: postsQuery, variables: { name } }],
    }
  );

  function handleSubmit(e) {
    addPost({ variables: { title: title, author: author, text: text } });
    navigate("/add-post");
    // window.location.reload();
  }

  function handleChange(e) {
    const target = e.target;
    switch (target.name) {
      case "title":
        setTitle(target.value);
        break;
      case "author":
        setAuthor(target.value);
        break;
      case "text":
        setText(target.value);
        break;
      default:
        console.log("error");
    }
  }

  return (
    <>
      <form
        id="post-form"
        method="post"
        action="/add-post"
        onSubmit={handleSubmit}
      >
        <div className="form-info">
          <label>
            Post Title
            <input
              type="text"
              name="title"
              value={title}
              onChange={handleChange}
            />
          </label>
          <label>
            Author
            <input
              type="text"
              name="author"
              value={author}
              onChange={handleChange}
            />
          </label>
        </div>
        <div className="form-text">
          <label>
            Post Text
            <textarea
              name="text"
              value={text}
              onChange={handleChange}
            ></textarea>
          </label>
        </div>
        <div className="form-button">
          <input type="submit" value="Submit" />
        </div>
      </form>
    </>
  );
}

export default AddPost;
