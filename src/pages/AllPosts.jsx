import React, { useState, useEffect } from "react";
import { Container, PostCard } from "../components";
import { fetchPosts } from "../store/postSlice";
import { useDispatch, useSelector } from "react-redux";

function AllPosts() {
  const posts = useSelector((state) => state.post.posts);
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.post.loading);
  const error = useSelector((state) => state.post.error);

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  return (
    <div className="w-full py-8">
      <Container>
        {loading && <p className="text-center w-full py-4">Loading posts...</p>}
        {error && (
          <p className="text-center w-full py-4 text-red-500">Error: {error}</p>
        )}
        {!loading && posts.length === 0 && (
          <p className="text-center w-full py-4">No posts available.</p>
        )}

        <div className="flex flex-wrap">
          {posts.map((post) => (
            <div key={post.$id} className="p-2 w-1/4">
              <PostCard {...post} />
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}

export default AllPosts;
