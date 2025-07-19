import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import service from "../appwrite/config"; // Your Appwrite Service wrapper

// 🔄 Fetch all posts
export const fetchPosts = createAsyncThunk("post/fetchPosts", async () => {
  const response = await service.getPosts();
  return response.documents; // Appwrite returns { documents: [...] }
});

// 🔍 Get a single post by slug
export const getPostById = createAsyncThunk(
  "post/getPostById",
  async (slug) => {
    return await service.getPost(slug);
  }
);

// 🆕 Create a new post
export const createPost = createAsyncThunk(
  "post/createPost",
  async (postData) => {
    return await service.createPost(postData);
  }
);

// 📝 Update an existing post
export const updatePost = createAsyncThunk(
  "post/updatePost",
  async ({ slug, updatedData }) => {
    return await service.updatePost(slug, updatedData);
  }
);

// ❌ Delete a post
export const deletePostById = createAsyncThunk(
  "post/deletePost",
  async (slug) => {
    await service.deletePost(slug);
    return true;
  }
);

const postSlice = createSlice({
  name: "post",
  initialState: {
    posts: [],
    selectedPost: null,
    loading: false,
    error: null,
  },
  reducers: {
    clearSelectedPost: (state) => {
      state.selectedPost = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // 📦 Fetch all posts
      .addCase(fetchPosts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // 🔍 Get single post
      .addCase(getPostById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getPostById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedPost = action.payload;
      })
      .addCase(getPostById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // 🆕 Create post
      .addCase(createPost.fulfilled, (state, action) => {
        state.posts.push(action.payload);
      })

      // 📝 Update post
      .addCase(updatePost.fulfilled, (state, action) => {
        const index = state.posts.findIndex(
          (post) => post.$id === action.payload.$id
        );
        if (index !== -1) {
          state.posts[index] = action.payload;
        }
      })

      // ❌ Delete post
      .addCase(deletePostById.fulfilled, (state, action) => {
        state.posts = state.posts.filter(
          (post) => post.$id !== action.meta.arg
        ); // use slug from meta
      });
  },
});

export const { clearSelectedPost } = postSlice.actions;

export default postSlice.reducer;
