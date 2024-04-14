import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import CreateContentForm from "../components/Content/CreateContent.jsx";
import Content from "../components/Content/Content.jsx";
import { message_board_backend as canister } from "../../declarations/message-board-backend";

function App() {
  const [posts, setPosts] = useState([]);

  const fetchPosts = async () => {
    try {
      const postData = await canister.getFormData();
      const reversedPosts = postData
        .map((post) => ({
          title: post.title,
          description: post.description,
          content: post.content,
          category: post.category
        }))
        .reverse();
      setPosts(reversedPosts);
    } catch (error) {
      console.error("Failed to fetch posts:", error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <main>
      <Navbar />
      <CreateContentForm deployNewPost={fetchPosts} hasPosts={posts.length > 0 }/>
      <Content posts={posts} />
    </main>
  );
}

export default App;
