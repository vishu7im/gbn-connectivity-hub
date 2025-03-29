
import React, { useState, useEffect } from "react";
import { postsData } from "@/data/postsData";
import PostCard from "@/components/PostCard";
import CreatePostForm from "@/components/CreatePostForm";
import { useAuth } from "@/contexts/AuthContext";
import ViewToggle from "@/components/ViewToggle";

interface PostsFeedProps {
  userId?: number; // Optional: if provided, only show posts from this user
}

const PostsFeed: React.FC<PostsFeedProps> = ({ userId }) => {
  const { user } = useAuth();
  const [posts, setPosts] = useState(postsData);
  const [viewMode, setViewMode] = useState<"list" | "grid">(() => {
    const savedView = localStorage.getItem("postsViewMode");
    return (savedView as "list" | "grid") || "list";
  });

  useEffect(() => {
    // Filter posts if userId is provided
    if (userId) {
      setPosts(postsData.filter(post => post.userId === userId));
    } else {
      setPosts(postsData);
    }
  }, [userId, postsData]);

  // Save view preference to localStorage
  useEffect(() => {
    localStorage.setItem("postsViewMode", viewMode);
  }, [viewMode]);

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        {user && !userId && <CreatePostForm />}
        <ViewToggle view={viewMode} onChange={setViewMode} />
      </div>
      
      {posts.length > 0 ? (
        <div className={viewMode === "grid" ? "grid-layout" : "space-y-6"}>
          {posts.map(post => (
            <PostCard key={post.id} post={post} showComments={viewMode === "list"} />
          ))}
        </div>
      ) : (
        <div className="text-center p-6 bg-gray-100 rounded-lg">
          <h3 className="font-medium text-lg">No posts yet</h3>
          <p className="text-gray-500 mt-1">
            {userId ? "This user hasn't posted anything yet." : "Be the first to post!"}
          </p>
        </div>
      )}
    </div>
  );
};

export default PostsFeed;
