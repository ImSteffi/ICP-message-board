function Post({ title, description, content, category, index, onDelete }) {
  return (
    <div className="post">
      <h3 className="post-title">{title}</h3>
      <h4 className="post-description">{description}</h4>
      <h4 className="post-content">{content}</h4>
      <div className="post-category">{category}</div>
      <button onClick={() => onDelete(index)}>Delete Post</button>
    </div>
  );
}

export default Post;
