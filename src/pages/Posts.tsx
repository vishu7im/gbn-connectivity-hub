
import React, { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PostsFeed from "@/components/PostsFeed";
import { useAuth } from "@/contexts/AuthContext";
import CreatePostForm from "@/components/CreatePostForm";
import ViewToggle from "@/components/ViewToggle";

const Posts = () => {
  const { user } = useAuth();
  const [viewMode, setViewMode] = useState<"list" | "grid">(() => {
    const savedView = localStorage.getItem("postsViewMode");
    return (savedView as "list" | "grid") || "list";
  });

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-grow">
        <div className="bg-primary py-8 shadow-md">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl md:text-4xl font-bold text-primary-foreground">Alumni Posts</h1>
            <p className="mt-2 text-primary-foreground/80">
              Connect with fellow alumni and share your thoughts and experiences
            </p>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          {user && <CreatePostForm />}
          
          <div className="flex justify-end mb-4">
            <ViewToggle view={viewMode} onChange={setViewMode} />
          </div>

          <PostsFeed viewMode={viewMode} />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Posts;
