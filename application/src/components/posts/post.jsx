import React from "react";
import { useParams } from "react-router-dom";

{
  /* <article class="post">
  <div class="info">
    <span>{post.author}</span>
  </div>
  <h1>{post.title}</h1>
  <p>{post.text}</p>
  <button class="btn-delete" data-id={post.id}>
    <i class="fas fa-trash-alt" data-id={post.id}></i>
  </button>
</article>; */
}

function Post() {
  let params = useParams();
  return (
    <>
      <h1>Post Page</h1>
      <p>{params.id}</p>
    </>
  );
}

export default Post;
