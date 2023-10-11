"use client";
import React, { useEffect, useState } from "react";
import PromptCard from "./PromptCard";

const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <div className="mt-16 prompt_layout">
      {data.map((post) => {
        return (
          <PromptCard
            key={post._id}
            post={post}
            handleTagClick={handleTagClick}
          />
        );
      })}
    </div>
  );
};

const Feed = () => {
  const [searchText, setSearchText] = useState("");
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const handleSearchChange = (e) => {
    const searchWord = e.target.value.toLowerCase();
    setSearchText(e.target.value);
    const searchPosts = posts.filter((post) => {
      return (
        post.prompt.toLowerCase().includes(searchWord) ||
        post.tag.toLowerCase().includes(searchWord) |
          post.creator.username.toLowerCase().includes(searchWord)
      );
    });
    setFilteredPosts(searchPosts);
  };

  const handleTagClick = (tag) => {
    setSearchText(tag);
    const searchWord = tag;
    const searchPosts = posts.filter((post) => {
      return (
        post.prompt.toLowerCase().includes(searchWord) ||
        post.tag.toLowerCase().includes(searchWord) |
          post.creator.username.toLowerCase().includes(searchWord)
      );
    });
    setFilteredPosts(searchPosts);
  };
  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch("/api/prompt");
      const data = await response.json();
      console.log("Printing the posts received here");
      console.log(data);
      setPosts(data);
    };

    fetchPosts();
  }, []);

  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input
          type="text"
          placeholder="Search for a tag or username"
          value={searchText}
          onChange={handleSearchChange}
          required
          className="search_input peer"
        />
      </form>

      <PromptCardList
        data={searchText ? filteredPosts : posts}
        handleTagClick={handleTagClick}
      />
    </section>
  );
};

export default Feed;
