import React from "react";
import Post from "./Post.jsx";

function Content({ posts }) {
  return (
    <div className="content">
      {posts.map((post, index) => (
        <Post
          key={index}
          title={post.title}
          description={post.description}
          content={post.content}
          category={post.category}
        />
      ))}
    </div>
  );
}

export default Content;
