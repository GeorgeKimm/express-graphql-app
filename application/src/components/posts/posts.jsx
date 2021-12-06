import React, { useState } from "react";

import withHocs from "./posts-hoc";

function Posts(props) {
  console.log("props", props);
  console.log("data", props.data);
  const { data, deletePost } = props;
  console.log("deletePostCheck", deletePost);
  const { posts = [] } = data;

  function handleDelete(id) {
    console.log("id", id);
    deletePost(id);
  }

  return (
    <>
      <h1>Posts:</h1>
      <ul>
        {posts.length &&
          posts.map(({ id, title, text, author }) => {
            return (
              <li key={id}>
                <article>
                  <h2>
                    <a href={`/posts/${id}>`}>{title}</a>
                  </h2>
                  <p>{text}</p>
                  <div className="info">
                    {/* <span>{createdAt.toLocaleDateString()}</span> */}
                    <span>{author}</span>
                  </div>
                  <button
                    className="btn-delete"
                    onClick={() => handleDelete(id)}
                  >
                    <i className="fas fa-trash-alt"></i>
                  </button>
                </article>
              </li>
            );
          })}
      </ul>
    </>
  );
}

export default withHocs(Posts);
