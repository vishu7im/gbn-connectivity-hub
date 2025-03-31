
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { ThemeProvider } from "@/contexts/ThemeContext";
import ProtectedRoute from "@/components/ProtectedRoute";
import ThemeCustomizer from "@/components/ThemeCustomizer";
import Index from "./pages/Index";
import Members from "./pages/Members";
import MemberView from "./pages/MemberView";
import Posts from "./pages/Posts";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Register from "./pages/Register";
import JobBoard from "./pages/JobBoard";
import JobDetail from "./pages/JobDetail";
import Dashboard from "./pages/Dashboard";
import PostJob from "./pages/PostJob";
import UserProfile from "./pages/UserProfile";
import Messenger from "./pages/Messenger";
import Developers from "./pages/Developers";
import Gallery from "./pages/Gallery";
import { useState } from "react";

function App() {
  // Create QueryClient inside component to ensure it's only created once during component rendering
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <AuthProvider>
          <BrowserRouter>
            <TooltipProvider>
              <Toaster />
              <Sonner />
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/members" element={<Members />} />
                <Route path="/members/:id" element={<MemberView />} />
                <Route path="/posts" element={<Posts />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/jobs" element={<JobBoard />} />
                <Route path="/jobs/:id" element={<JobDetail />} />
                <Route path="/gallery" element={<Gallery />} />
                <Route path="/developers" element={<Developers />} />
                
                {/* Protected routes */}
                <Route 
                  path="/dashboard" 
                  element={
                    <ProtectedRoute>
                      <Dashboard />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/dashboard/profile" 
                  element={
                    <ProtectedRoute>
                      <UserProfile />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/dashboard/post-job" 
                  element={
                    <ProtectedRoute>
                      <PostJob />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/messenger" 
                  element={
                    <ProtectedRoute>
                      <Messenger />
                    </ProtectedRoute>
                  } 
                />
                
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
              <ThemeCustomizer />
            </TooltipProvider>
          </BrowserRouter>
        </AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
