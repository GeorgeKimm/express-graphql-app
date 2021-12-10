import React, { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { Link, Outlet } from "react-router-dom";

import { postsQuery } from "./queries";
import { deletePostMutation } from "./mutation";

function Posts() {
  const [name, setName] = useState("");

  // useQuery возвращает состоянии загрузки, ошибку если она есть и 3 аргумент объект со свойствами
  const {
    loading,
    error,
    data = {},
  } = useQuery(postsQuery, {
    variables: { name },
  });

  // console.log("data", data);
  const { posts } = data;
  // console.log("posts", posts);

  // useMutation первым аргументом возвращает функцию, остальное как у useQuery
  const [deletePost, { load, err, dataDeletePost }] = useMutation(
    deletePostMutation,
    {
      refetchQueries: [{ query: postsQuery, variables: { name } }],
    }
  );

  function handleDelete(id) {
    // console.log("id", id);
    deletePost({ variables: { id: id } });
  }

  return (
    <>
      <h1>Posts:</h1>
      <ul>
        {posts &&
          posts.map(({ id, title, text, author, createdAt }) => {
            return (
              <li key={id}>
                <article>
                  <h2>
                    {/* <a href={`/posts/${id}`}>{title}</a> */}
                    <Link to={`/posts/${id}`}>{title}</Link>
                  </h2>
                  <p>{text}</p>
                  <div className="info">
                    <span>{createdAt}</span>
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

export default Posts;
