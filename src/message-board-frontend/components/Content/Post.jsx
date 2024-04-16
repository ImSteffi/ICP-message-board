import React, { useState } from "react";

function Post({
  title,
  description,
  content,
  category,
  index,
  onEdit,
  onDelete,
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    title,
    description,
    content,
    category,
  });

  const handleEditChange = (event) => {
    setEditData({ ...editData, [event.target.name]: event.target.value });
  };

  const submitEdit = () => {
    onEdit(index, editData);
    setIsEditing(false);
  };

  const cancelEdit = () => {
    setEditData({
      title,
      description,
      content,
      category,
    });
    setIsEditing(false);
  };

  const categories = ["News", "Sports", "Technology", "Entertainment", "Health"];

  return (
    <div className="post">
      {isEditing ? (
        <>
          <input
            type="text"
            value={editData.title}
            name="title"
            onChange={handleEditChange}
          />
          <input
            type="text"
            value={editData.description}
            name="description"
            onChange={handleEditChange}
          />
          <textarea
            name="content"
            value={editData.content}
            onChange={handleEditChange}
          />
          <select
            name="category"
            value={editData.category}
            onChange={handleEditChange}
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
          <button onClick={submitEdit}>Save</button>
          <button onClick={cancelEdit}>Cancel</button>
        </>
      ) : (
        <>
          <h3 className="post-title">{title}</h3>
          <h4 className="post-description">{description}</h4>
          <h4 className="post-content">{content}</h4>
          <div className="post-category">{category}</div>
          <button onClick={() => setIsEditing(true)}>Edit</button>
          <button onClick={() => onDelete(index)}>Delete Post</button>
        </>
      )}
    </div>
  );
}

export default Post;
