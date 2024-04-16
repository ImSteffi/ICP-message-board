import React from "react";
import Post from "./Post.jsx";

function Content({ posts, onEditPost, onDeletePost }) {
  return (
    <div className="content" key={posts.length}>
      {posts.map((post, index) => (
        <Post
          key={post.id}
          index={index}
          title={post.title}
          description={post.description}
          content={post.content}
          category={post.category}
          onEdit={onEditPost}
          onDelete={onDeletePost}
        />
      ))}
    </div>
  );
}

export default Content;
