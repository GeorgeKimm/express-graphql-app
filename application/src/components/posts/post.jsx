import React, { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { useParams, useNavigate } from "react-router-dom";

import { postQuery } from "./queries";
import { postsQuery } from "./queries";
import { deletePostMutation } from "./mutation";

function Post() {
  const [name, setName] = useState("");
  const navigate = useNavigate();
  const params = useParams();

  const { id } = params;

  const { data = {} } = useQuery(postQuery, {
    variables: { id },
  });

  const { post } = data;

  const [deletePost, { loading, error, dataDeletePost }] = useMutation(
    deletePostMutation,
    {
      refetchQueries: [{ query: postsQuery, variables: { name } }],
    }
  );

  function handleDelete(id) {
    // console.log("id", id);
    deletePost({ variables: { id: id } });
    navigate("/posts");
  }

  return (
    <>
      {post && (
        <article className="post">
          <div className="info">
            <span>{post.author}</span>
          </div>
          <h1>{post.title}</h1>
          <p>{post.text}</p>
          <button className="btn-delete" onClick={() => handleDelete(post.id)}>
            <i className="fas fa-trash-alt"></i>
          </button>
        </article>
      )}
    </>
  );
}

export default Post;
