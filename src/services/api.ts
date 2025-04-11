
import axios from "axios";

const API_URL = "http://localhost:5000/api";

// Create axios instance with base URL
const apiClient = axios.create({
  baseURL: API_URL,
});

// Add request interceptor to add auth token
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
});

// Auth API
export const authAPI = {
  login: (email: string, password: string) => apiClient.post("/auth/login", { email, password }),
  register: (userData: any) => apiClient.post("/auth/register", userData),
  getCurrentUser: () => apiClient.get("/auth/me"),
  updateProfile: (profileData: any) => apiClient.put("/auth/profile", profileData),
  updatePassword: (passwordData: any) => apiClient.put("/auth/password", passwordData),
};

// Admin API
export const adminAPI = {
  getDashboardStats: () => apiClient.get("/admin/stats"),
  trackVisit: (userId?: string) => apiClient.post("/admin/track-visit", { userId }),
  getPendingVerifications: () => apiClient.get("/admin/verifications"),
  verifyUser: (userId: string, status: "approved" | "rejected", remarks?: string) => 
    apiClient.put(`/admin/verify/${userId}`, { status, remarks }),
  moderatePost: (postId: string, action: "block" | "unblock", reason?: string) => 
    apiClient.put(`/admin/posts/${postId}`, { action, reason }),
};

// User API
export const userAPI = {
  getAllUsers: () => apiClient.get("/users"),
  getUserById: (id: string) => apiClient.get(`/users/${id}`),
  getMyProfile: () => apiClient.get("/users/profile/me"),
};

// Post API
export const postAPI = {
  getAllPosts: (page = 1, limit = 10) => apiClient.get(`/posts?page=${page}&limit=${limit}`),
  getPostById: (id: string) => apiClient.get(`/posts/${id}`),
  getPostsByUser: (userId: string) => apiClient.get(`/posts/user/${userId}`),
  createPost: (postData: any) => apiClient.post("/posts", postData),
  likePost: (id: string) => apiClient.post(`/posts/${id}/like`),
  addComment: (id: string, content: string) => apiClient.post(`/posts/${id}/comments`, { content }),
  getComments: (id: string) => apiClient.get(`/posts/${id}/comments`),
};

// Job API
export const jobAPI = {
  getAllJobs: (page = 1, limit = 10) => apiClient.get(`/jobs?page=${page}&limit=${limit}`),
  getJobById: (id: string) => apiClient.get(`/jobs/${id}`),
  getJobsByUser: (userId: string) => apiClient.get(`/jobs/user/${userId}`),
  createJob: (jobData: any) => apiClient.post("/jobs", jobData),
};

// Gallery API
export const galleryAPI = {
  getAllImages: (page = 1, limit = 12) => apiClient.get(`/gallery?page=${page}&limit=${limit}`),
  uploadImage: (formData: FormData) => apiClient.post("/gallery", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  }),
  deleteImage: (id: string) => apiClient.delete(`/gallery/${id}`),
};

// News API
export const newsAPI = {
  getAllNews: () => apiClient.get("/news"),
  getNewsById: (id: string) => apiClient.get(`/news/${id}`),
  createNews: (newsData: any) => apiClient.post("/news", newsData),
  updateNews: (id: string, newsData: any) => apiClient.put(`/news/${id}`, newsData),
  deleteNews: (id: string) => apiClient.delete(`/news/${id}`),
};

// Event API
export const eventAPI = {
  getAllEvents: () => apiClient.get("/events"),
  getEventById: (id: string) => apiClient.get(`/events/${id}`),
  createEvent: (eventData: any) => apiClient.post("/events", eventData),
  updateEvent: (id: string, eventData: any) => apiClient.put(`/events/${id}`, eventData),
  deleteEvent: (id: string) => apiClient.delete(`/events/${id}`),
};

// Handle file uploads
export const uploadAPI = {
  uploadImage: (file: File) => {
    const formData = new FormData();
    formData.append("image", file);
    return apiClient.post("/upload/image", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
};
