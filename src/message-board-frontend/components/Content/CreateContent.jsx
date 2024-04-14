import React, { useState } from "react";
import { message_board_backend as canister } from "../../../declarations/message-board-backend";

function CreateContentForm({ onNewPost }) {
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
    try {
      await canister.addFormData(formData);
      onNewPost();
    } catch (error) {
      console.error("Error submitting form data:", error);
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
        />
        <input
          type="text"
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleInputChange}
        />
        <textarea
          name="content"
          placeholder="Content"
          value={formData.content}
          onChange={handleInputChange}
        />
        <select
          name="category"
          value={formData.category}
          onChange={handleInputChange}
        >
          <option value="">Select a Category</option>
          <option value="news">News</option>
          <option value="sports">Sports</option>
          <option value="technology">Technology</option>
        </select>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default CreateContentForm;
