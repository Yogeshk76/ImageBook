import React, { useEffect } from "react";
import { Container, PostForm } from "../components";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getPostById } from "../store/postSlice";

function EditPost() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const post = useSelector((state) => state.post.selectedPost);
  const loading = useSelector((state) => state.post.loading);
  const error = useSelector((state) => state.post.error);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const result = await dispatch(getPostById(slug)).unwrap();
        if (!result) {
          navigate("/");
        }
      } catch (error) {
        navigate("/");
      }
    };

    if (slug) {
      fetchPost();
    } else {
      navigate("/");
    }
  }, [slug, dispatch, navigate]);

  if (loading) return <div className="text-center py-10">Loading...</div>;
  if (error)
    return <div className="text-center text-red-500 py-10">{error}</div>;

  return post ? (
    <div className="py-8">
      <Container>
        <PostForm post={post} />
      </Container>
    </div>
  ) : null;
}

export default EditPost;
