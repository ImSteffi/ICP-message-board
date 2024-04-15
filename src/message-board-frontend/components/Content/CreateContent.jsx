import React, { useState } from "react";
import { message_board_backend as canister } from "../../../declarations/message-board-backend";

function CreateContentForm({ deployNewPost, hasPosts }) {
  const [errors, setErrors] = useState({
    title: false,
    description: false,
    content: false,
    category: false,
  });

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    content: "",
    category: "",
  });

  const handleInputChange = (event) => {
    const { name, value, type, files } = event.target;
    setFormData({
      ...formData,
      [name]: type === "file" ? files[0] : value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const newErrors = {
      title: !formData.title,
      description: !formData.description,
      content: !formData.content,
      category: !formData.category,
    };
    setErrors(newErrors);
    if (
      !formData.title ||
      !formData.description ||
      !formData.content ||
      !formData.category
    ) {
      return;
    }
    try {
      await canister.addFormData(formData);
      deployNewPost();
      setFormData({
        title: "",
        description: "",
        content: "",
        category: "",
      });
      setErrors({
        title: false,
        description: false,
        content: false,
        category: false,
      });
    } catch (error) {
      console.error("Error submitting form data:", error);
    }
  };

  const handleDeleteAll = async () => {
    try {
      await canister.removeAllPosts();
      deployNewPost();
    } catch (error) {
      console.error("Error deleting all posts:", error);
    }
  };

  return (
    <div className="form">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={formData.title}
          onChange={handleInputChange}
          className={errors.title ? "error" : ""}
        />
        <input
          type="text"
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleInputChange}
          className={errors.description ? "error" : ""}
        />
        <textarea
          name="content"
          placeholder="Content"
          value={formData.content}
          onChange={handleInputChange}
          className={errors.content ? "error" : ""}
        />
        <select
          name="category"
          value={formData.category}
          onChange={handleInputChange}
          className={errors.category ? "error" : ""}
        >
          <option value="">Select a Category</option>
          <option value="news">News</option>
          <option value="sports">Sports</option>
          <option value="technology">Technology</option>
        </select>
        <button type="submit">Submit</button>
        {hasPosts && (
          <button type="button" onClick={handleDeleteAll} disabled={!hasPosts}>
            Delete All Posts
          </button>
        )}
      </form>
    </div>
  );
}

export default CreateContentForm;
