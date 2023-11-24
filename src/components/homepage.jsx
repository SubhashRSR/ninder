import { useEffect, useState } from "react";
import { supabase } from "../service/supabase";

import { FiSend } from "react-icons/fi";

import tempPhoto from "/temp.png";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Post = ({ post }) => {
  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="flex border border-gray-300 rounded-lg p-4 mb-4 shadow-md">
      <img
        src={tempPhoto}
        alt="Profile"
        className="h-12 w-12 rounded-full mr-4 object-cover"
      />
      <div className="flex flex-col">
        <div className="flex items-center mb-2">
          <p className="text-lg font-semibold mr-2">{post.full_name}</p>
          <span className="text-gray-500 text-sm">
            {formatDate(post.created_at)}
          </span>
        </div>
        <p className="text-gray-800">{post.content}</p>
      </div>
    </div>
  );
};

const Homepage = () => {
  const [user, setUser] = useState(null);
  const [postContent, setPostContent] = useState("");
  const [posts, setPosts] = useState([]); // State to hold posts

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();
        setUser(user);
      } catch (error) {
        console.error("Error fetching user data:", error.message);
      }
    };

    const fetchPosts = async () => {
      try {
        // Fetch all posts from the PostTable
        const { data, error } = await supabase
          .from("Post Table")
          .select("*")
          .order("created_at", { ascending: false });
        if (error) {
          throw error;
        }
        setPosts(data || []);
      } catch (error) {
        console.error("Error fetching posts:", error.message);
      }
    };

    fetchUserData();
    fetchPosts();
  }, []);

  const handlePostSubmit = async (e) => {
    e.preventDefault();
    try {
      if (postContent.trim() !== "") {
        // Insert the post into the PostTable
        await supabase.from("Post Table").insert([
          {
            user_id: user.id,
            full_name: user.user_metadata.full_name,
            content: postContent,
          },
        ]);

        // Clear the post content after posting
        setPostContent("");

        // Fetch updated posts after adding a new post
        const { data, error } = await supabase
          .from("Post Table")
          .select("*")
          .order("created_at", { ascending: false });
        if (error) {
          throw error;
        }

        toast.success("Post submitted successfully!");
        setPosts(data || []);
      }
    } catch (error) {
      console.error("Error creating post:", error.message);
      toast.error("Failed to submit post!");
    }
  };

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-3xl font-bold mt-8 mb-4">
        Welcome, {user?.user_metadata.full_name}
      </h1>
      <form onSubmit={handlePostSubmit} className="mb-6">
        <textarea
          placeholder="What's on your mind?"
          value={postContent}
          onChange={(e) => setPostContent(e.target.value)}
          className="w-full border border-gray-300 rounded-lg p-2 mb-2 focus:outline-none focus:border-blue-500"
        ></textarea>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md flex items-center"
        >
          <FiSend className="mr-2" />
          Post
        </button>
      </form>

      <p className="font-semibold text-3xl my-7">See what other are talking,</p>
      <div>
        {posts.map((post) => (
          <Post key={post.post_id} post={post} />
        ))}
      </div>
      <ToastContainer style={{ width: "400px" }} />
    </div>
  );
};

export default Homepage;
