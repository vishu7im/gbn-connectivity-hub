
import React, { useState, useEffect, useRef } from "react";
import PostCard from "@/components/PostCard";
import { useAuth } from "@/contexts/AuthContext";
import { Post } from "@/data/postsData";
import axios from "axios";
import { Skeleton } from "@/components/ui/skeleton";
import { useIntersection } from "@/hooks/use-intersection";

interface PostsFeedProps {
  userId?: number; // Optional: if provided, only show posts from this user
  viewMode?: "list" | "grid"; // Optional: specify the view mode
}

const API_URL = "http://localhost:5000/api";
const POSTS_PER_PAGE = 5;

const PostsFeed: React.FC<PostsFeedProps> = ({ userId, viewMode: propViewMode }) => {
  const { user } = useAuth();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  
  const [viewMode, setViewMode] = useState<"list" | "grid">(() => {
    // If a viewMode prop is provided, use it, otherwise check localStorage
    if (propViewMode) return propViewMode;
    const savedView = localStorage.getItem("postsViewMode");
    return (savedView as "list" | "grid") || "list";
  });

  // Create ref for intersection observer
  const ref = useRef<HTMLDivElement>(null);
  
  // Set up intersection observer for infinite scrolling
  const entry = useIntersection(ref, {
    root: null,
    rootMargin: "0px",
    threshold: 1.0
  });

  // Update viewMode when propViewMode changes
  useEffect(() => {
    if (propViewMode) {
      setViewMode(propViewMode);
    }
  }, [propViewMode]);

  // Save view preference to localStorage
  useEffect(() => {
    localStorage.setItem("postsViewMode", viewMode);
  }, [viewMode]);

  // Fetch posts from API
  const fetchPosts = async (pageNum: number, replace = false) => {
    try {
      setLoadingMore(pageNum > 1);
      if (pageNum === 1) setLoading(true);
      setError(null);
      
      let endpoint = `${API_URL}/posts?page=${pageNum}&limit=${POSTS_PER_PAGE}`;
      if (userId) {
        endpoint = `${API_URL}/posts/user/${userId}?page=${pageNum}&limit=${POSTS_PER_PAGE}`;
      }

      const response = await axios.get(endpoint);
      
      // Transform API data to match our local Post type
      const formattedPosts = response.data.posts.map((post: any) => ({
        id: post.id,
        userId: post.user_id,
        userName: post.user_name,
        content: post.content,
        image: post.image || undefined,
        createdAt: post.created_at,
        likes: post.likes_count || 0,
        comments: [] // We'll fetch comments separately when needed
      }));
      
      if (replace) {
        setPosts(formattedPosts);
      } else {
        setPosts(prev => [...prev, ...formattedPosts]);
      }
      
      setHasMore(formattedPosts.length === POSTS_PER_PAGE);
      
    } catch (err) {
      console.error("Error fetching posts:", err);
      setError("Failed to load posts. Please try again later.");
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  // Initial load
  useEffect(() => {
    fetchPosts(1, true);
    setPage(1);
  }, [userId]);

  // Handle infinite scrolling
  useEffect(() => {
    if (entry?.isIntersecting && hasMore && !loading && !loadingMore) {
      setPage(prev => prev + 1);
      fetchPosts(page + 1);
    }
  }, [entry?.isIntersecting, hasMore, loading, loadingMore]);

  // Show loading state
  if (loading && page === 1) {
    return (
      <div className="space-y-6">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="bg-card rounded-lg shadow-medium p-4">
            <div className="flex items-center space-x-4 mb-4">
              <Skeleton className="h-10 w-10 rounded-full" />
              <div>
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-3 w-20 mt-2" />
              </div>
            </div>
            <Skeleton className="h-24 w-full" />
            <div className="mt-4 flex justify-between">
              <Skeleton className="h-8 w-20" />
              <Skeleton className="h-8 w-20" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  // Show error state
  if (error && posts.length === 0) {
    return (
      <div className="text-center p-6 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-md">
        <h3 className="font-medium text-lg text-red-500">{error}</h3>
        <p className="text-gray-500 dark:text-gray-400 mt-1">
          Please check your connection and try again.
        </p>
      </div>
    );
  }

  return (
    <div>
      {posts.length > 0 ? (
        <div className={viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" : "space-y-6"}>
          {posts.map(post => (
            <PostCard key={post.id} post={post} showComments={viewMode === "list"} />
          ))}
        </div>
      ) : (
        <div className="text-center p-6 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-md">
          <h3 className="font-medium text-lg">No posts yet</h3>
          <p className="text-gray-500 dark:text-gray-400 mt-1">
            {userId ? "This user hasn't posted anything yet." : "Be the first to post!"}
          </p>
        </div>
      )}

      {/* Loading more indicator */}
      {loadingMore && (
        <div className="mt-4 space-y-4">
          <div className="bg-card rounded-lg shadow-medium p-4">
            <div className="flex items-center space-x-4 mb-4">
              <Skeleton className="h-10 w-10 rounded-full" />
              <div>
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-3 w-20 mt-2" />
              </div>
            </div>
            <Skeleton className="h-24 w-full" />
          </div>
        </div>
      )}

      {/* Intersection observer target */}
      {hasMore && <div ref={ref} className="h-10"></div>}
    </div>
  );
};

export default PostsFeed;
