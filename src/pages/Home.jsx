import React, { useEffect } from "react";
import { Container, PostCard } from "../components";
import { useSelector, useDispatch } from "react-redux";
import { fetchPosts } from "../store/postSlice";

function Home() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.userData);
  const authStatus = useSelector((state) => state.auth.status);
  const posts = useSelector((state) => state.post.posts);
  const loading = useSelector((state) => state.post.loading);
  const error = useSelector((state) => state.post.error);

  useEffect(() => {
    if (authStatus) {
      dispatch(fetchPosts());
    }
  }, [authStatus, dispatch]);

  if (loading) {
    return (
      <div className="w-full py-8 mt-4 text-center">
        <Container>
          <p className="text-xl font-semibold">Loading posts...</p>
        </Container>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full py-8 mt-4 text-center text-red-500">
        <Container>
          <p className="text-xl font-semibold">Error: {error}</p>
        </Container>
      </div>
    );
  }

  if (!user && posts.length === 0) {
    return (
      <div className="w-full py-8 mt-4 text-center">
        <Container>
          <h1 className="text-2xl font-bold hover:text-gray-500">
            Login to read posts !!
          </h1>
        </Container>
      </div>
    );
  }

  if (user && posts.length === 0) {
    return (
      <div className="w-full py-8 mt-4 text-center">
        <Container>
          <h1 className="text-2xl font-bold hover:text-gray-500">
            Welcome back, {user.name}! <br />
            Add your posts:
          </h1>
        </Container>
      </div>
    );
  }

  return (
    <div className="w-full py-8">
      <Container>
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

export default Home;
