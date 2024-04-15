import React from "react";
import Post from "./Post.jsx";

function Content({ posts, onDeletePost }) {
  return (
    <div className="content">
      {posts.map((post, index) => (
        <Post
          key={index}
          index={index}
          title={post.title}
          description={post.description}
          content={post.content}
          category={post.category}
          onDelete={onDeletePost}
        />
      ))}
    </div>
  );
}

export default Content;
