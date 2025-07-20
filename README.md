# ImageBook

A modern React-based blog/post management application that allows users to create, edit, and manage posts with images. Built with React, Redux Toolkit, and Appwrite as the backend service.

## 🚀 Features

- **User Authentication** - Sign up, login, and logout functionality
- **Post Management** - Create, read, update, and delete blog posts
- **Rich Text Editor** - TinyMCE integration for content creation
- **Image Upload** - Upload and manage featured images for posts
- **Responsive Design** - Built with Tailwind CSS for mobile-first design
- **State Management** - Redux Toolkit for efficient state handling
- **Real-time Updates** - Dynamic content loading and updates

## 🛠️ Tech Stack

### Frontend

- **React 19.1.0** - Modern React with hooks
- **Vite** - Fast build tool and development server
- **Redux Toolkit** - State management
- **React Router DOM** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **TinyMCE** - Rich text editor
- **React Hook Form** - Form handling and validation

### Backend & Services

- **Appwrite** - Backend-as-a-Service for authentication, database, and storage
- **HTML React Parser** - Parse HTML content safely

### Development Tools

- **ESLint** - Code linting
- **Vite** - Development server and build tool

## 📁 Project Structure

```
src/
├── components/           # Reusable UI components
│   ├── AuthLayout.jsx   # Authentication wrapper
│   ├── Button.jsx       # Custom button component
│   ├── Input.jsx        # Form input component
│   ├── Login.jsx        # Login form
│   ├── Logo.jsx         # Application logo
│   ├── PostCard.jsx     # Post display card
│   ├── RTE.jsx          # Rich Text Editor wrapper
│   ├── Select.jsx       # Select dropdown component
│   ├── Signup.jsx       # Signup form
│   ├── Container/       # Layout container
│   ├── Footer/          # Footer component
│   ├── Header/          # Header and navigation
│   └── post-form/       # Post creation/editing form
├── pages/               # Page components
│   ├── AddPost.jsx      # Create new post page
│   ├── AllPosts.jsx     # Display all posts page
│   ├── EditPost.jsx     # Edit existing post page
│   ├── Home.jsx         # Homepage
│   ├── Login.jsx        # Login page
│   ├── Post.jsx         # Individual post view
│   └── Signup.jsx       # Registration page
├── store/               # Redux store configuration
│   ├── authSlice.js     # Authentication state management
│   ├── postSlice.js     # Post state management
│   └── store.js         # Store configuration
├── appwrite/            # Appwrite service configuration
│   ├── auth.js          # Authentication services
│   └── config.js        # Database and storage services
└── conf/                # Configuration files
    └── conf.js          # Environment configuration
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Appwrite account and project setup

### Installation

1. **Clone the repository**

   ```bash
   git clone <your-repo-url>
   cd imagebook
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Environment Setup**
   Create environment variables for Appwrite configuration in `src/conf/conf.js`:

   ```javascript
   const conf = {
     appwriteUrl: "YOUR_APPWRITE_URL",
     appwriteProjectId: "YOUR_PROJECT_ID",
     appwriteDatabaseId: "YOUR_DATABASE_ID",
     appwriteCollectionId: "YOUR_COLLECTION_ID",
     appwriteBucketId: "YOUR_BUCKET_ID",
   };
   ```
   
## 📱 Application Flow

1. **Authentication**: Users can sign up or log in to access the platform
2. **Home Page**: Displays all published posts in a card layout
3. **Create Post**: Authenticated users can create new posts with rich content and images
4. **Edit Post**: Authors can edit their existing posts
5. **View Post**: Individual post view with full content display

## 🔧 Key Components

- **AuthLayout**: Protects routes and handles authentication state
- **PostForm**: Handles both creating and editing posts with form validation
- **RTE (Rich Text Editor)**: TinyMCE integration for content creation
- **PostCard**: Displays post previews with images and metadata

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.
