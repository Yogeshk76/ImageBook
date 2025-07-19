import React, { useEffect, useMemo } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/config";
import { Button, Container } from "../components";
import parse from "html-react-parser";
import { useSelector, useDispatch } from "react-redux";
import { getPostById, deletePostById } from "../store/postSlice";

export default function Post() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const post = useSelector((state) => state.post.selectedPost);
  const loading = useSelector((state) => state.post.loading);
  const error = useSelector((state) => state.post.error);

  const userData = useSelector((state) => state.auth.userData);

  useEffect(() => {
    if (slug) {
      dispatch(getPostById(slug)).unwrap();
    } else navigate("/");
  }, [slug, navigate]);

  useEffect(() => {
  if (!loading && slug && post === null) {
    navigate("/");
  }
}, [post, navigate, slug, loading]);

  const deletePost = () => {
    dispatch(deletePostById(post.$id)).unwrap().then((status) => {
      if (status) {
        appwriteService.deleteFile(post.featuredImage);
        navigate("/");
      }
    });
  };

  const isAuthor = useMemo(() => {
    return post && userData ? post.userId === userData.$id : false;
  }, [post, userData]);

  return post ? (
    <div className="py-8">
      <Container>
        {loading && <div className="text-center">Loading...</div>}
        {error && <div className="text-red-500 text-center">{error}</div>}


        <div className="w-full flex justify-center mb-4 relative border rounded-xl p-2">
          <img
            src={appwriteService.getFileView(post.featuredImage)}
            alt={post.title}
            className="rounded-lg w-full max-h-[400px] object-contain"
          />

          {isAuthor && (
            <div className="absolute right-6 top-6">
              <Link to={`/edit-post/${post.$id}`}>
                <Button bgColor="bg-green-500" className="mr-3">
                  Edit
                </Button>
              </Link>
              <Button bgColor="bg-red-500" onClick={deletePost}>
                Delete
              </Button>
            </div>
          )}
        </div>
        <div className="w-full mb-6">
          <h1 className="text-2xl font-bold">{post.title}</h1>
        </div>
        <div className="browser-css">{parse(post.content)}</div>
      </Container>
    </div>
  ) : null;
}
