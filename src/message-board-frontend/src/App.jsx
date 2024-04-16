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
          category: post.category,
        }))
        .reverse();
      setPosts(reversedPosts);
    } catch (error) {
      console.error("Failed to fetch posts:", error);
    }
  };

  const editPost = async (frontendIndex, newPostData) => {
    const backendIndex = posts.length - 1 - frontendIndex;
    try {
      const success = await canister.editPost(backendIndex, newPostData);
      if (success) {
        fetchPosts();
      } else {
        console.error("Failed to edit post: Post not found");
      }
    } catch (error) {
      console.error("Failed to edit post:", error);
    }
  };
  
  const deletePost = async (frontendIndex) => {
    const backendIndex = posts.length - 1 - frontendIndex;
    try {
      await canister.removePost(backendIndex);
      fetchPosts();
    } catch (error) {
      console.error("Failed to delete post:", error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <main>
      <Navbar />
      <CreateContentForm
        deployNewPost={fetchPosts}
        hasPosts={posts.length > 0}
      />
      <Content posts={posts} onEditPost={editPost} onDeletePost={deletePost} />
    </main>
  );
}

export default App;
