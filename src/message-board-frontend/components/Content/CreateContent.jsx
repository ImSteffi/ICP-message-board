import React, { useState } from 'react';
import { message_board_backend } from '../../../declarations/message-board-backend';

function CreateContentForm() {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        content: '',
        category: '',
        image: null
    });

    const handleInputChange = (event) => {
        const { name, value, type, files } = event.target;
        setFormData({
            ...formData,
            [name]: type === 'file' ? files[0] : value
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await message_board_backend.addFormData(formData);
            console.log('Form data submitted successfully');
        } catch (error) {
            console.error('Error submitting form data:', error);
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
                <input 
                    type="file"
                    name="image"
                    onChange={handleInputChange}
                />
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}

export default CreateContentForm;
