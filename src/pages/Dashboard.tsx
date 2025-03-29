import React, { useState } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Briefcase,
  User,
  MessageSquare,
  Bell,
  Settings,
  Plus,
  Pencil,
  Clock,
  Eye,
  Calendar,
} from "lucide-react";

// Import sample job data and components
import { jobsData } from "@/data/jobsData";
import PostsFeed from "@/components/PostsFeed";

const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState("jobs");

  if (!user) {
    navigate("/login");
    return null;
  }

  // Filter jobs posted by the current user
  const userJobs = jobsData.filter((job) => job.postedById === user.id);

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .toUpperCase();
  };

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };

  return (
    <div className="min-h-screen text-primary-foreground flex flex-col">
      <Header />
      <main className="flex-grow">
        <div className=" bg-primary py-8">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl md:text-4xl font-bold">Dashboard</h1>
            <p className="mt-2 text-gray-200">
              Manage your alumni profile and activities
            </p>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <Card className="mb-6">
                <CardContent className="pt-6 flex flex-col items-center">
                  <Avatar className="h-20 w-20 mb-4">
                    <AvatarFallback className="bg-primary  text-xl">
                      {getInitials(user.name)}
                    </AvatarFallback>
                  </Avatar>
                  <h2 className="text-xl font-semibold">{user.name}</h2>
                  <p className="text-gray-500">{user.email}</p>
                  <div className="mt-4 w-full flex justify-center">
                    <Button className="w-full" asChild>
                      <Link to="/dashboard/profile">
                        <Pencil className="mr-2 h-4 w-4" />
                        Edit Profile
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-0">
                  <nav>
                    <ul className="divide-y">
                      <li>
                        <Link
                          to="/dashboard"
                          className={`flex items-center px-4 py-3 transition-colors ${
                            location.pathname === "/dashboard"
                              ? "font-medium"
                              : ""
                          }`}
                        >
                          <Briefcase className="mr-3 h-5 w-5 text-[#0a2463]" />
                          Dashboard Home
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/dashboard/profile"
                          className={`flex items-center px-4 py-3 hover:bg-gray-100 transition-colors ${
                            location.pathname === "/dashboard/profile"
                              ? "bg-gray-100 font-medium"
                              : ""
                          }`}
                        >
                          <User className="mr-3 h-5 w-5 text-[#0a2463]" />
                          Profile
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/dashboard/post-job"
                          className={`flex items-center px-4 py-3 hover:bg-gray-100 transition-colors ${
                            location.pathname === "/dashboard/post-job"
                              ? "bg-gray-100 font-medium"
                              : ""
                          }`}
                        >
                          <Plus className="mr-3 h-5 w-5 text-[#0a2463]" />
                          Post New Job
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/messenger"
                          className="flex items-center px-4 py-3 hover:bg-gray-100 transition-colors"
                        >
                          <MessageSquare className="mr-3 h-5 w-5 text-[#0a2463]" />
                          Messages
                        </Link>
                      </li>
                      <li>
                        <button
                          onClick={logout}
                          className="w-full flex items-center px-4 py-3 text-left hover:bg-gray-100 text-red-600 transition-colors"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="mr-3 h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                            />
                          </svg>
                          Logout
                        </button>
                      </li>
                    </ul>
                  </nav>
                </CardContent>
              </Card>
            </div>

            {/* Main content */}
            <div className="lg:col-span-3">
              <Tabs
                defaultValue="jobs"
                onValueChange={setActiveTab}
                className="w-full"
              >
                <TabsList className="mb-6">
                  <TabsTrigger value="jobs">My Job Postings</TabsTrigger>
                  <TabsTrigger value="posts">My Posts</TabsTrigger>
                </TabsList>

                <TabsContent value="jobs">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold">My Job Postings</h2>
                    <Link to="/dashboard/post-job">
                      <Button>
                        <Plus className="mr-2 h-4 w-4" />
                        Post New Job
                      </Button>
                    </Link>
                  </div>

                  {userJobs.length > 0 ? (
                    <div className="space-y-4">
                      {userJobs.map((job) => (
                        <Card key={job.id}>
                          <CardHeader className="pb-2">
                            <div className="flex justify-between">
                              <CardTitle className="text-lg">
                                <Link
                                  to={`/jobs/${job.id}`}
                                  className="text-[#0a2463] hover:underline"
                                >
                                  {job.title}
                                </Link>
                              </CardTitle>
                              <div className="flex items-center space-x-2">
                                <Link to={`/dashboard/edit-job/${job.id}`}>
                                  <Button size="sm" variant="outline">
                                    <Pencil className="h-4 w-4" />
                                    <span className="sr-only">Edit</span>
                                  </Button>
                                </Link>
                                <Link to={`/jobs/${job.id}`}>
                                  <Button size="sm" variant="outline">
                                    <Eye className="h-4 w-4" />
                                    <span className="sr-only">View</span>
                                  </Button>
                                </Link>
                              </div>
                            </div>
                            <CardDescription>
                              {job.company} • {job.location}
                            </CardDescription>
                          </CardHeader>
                          <CardContent>
                            <div className="flex items-center text-sm text-gray-500">
                              <Clock className="mr-1 h-4 w-4" />
                              Posted on {formatDate(job.postedDate)}
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  ) : (
                    <Card>
                      <CardContent className="py-10 text-center">
                        <Briefcase className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                        <p className="text-xl font-medium mb-2">
                          No job postings yet
                        </p>
                        <p className="text-gray-500 mb-6">
                          You haven't posted any job opportunities yet.
                        </p>
                        <Link to="/dashboard/post-job">
                          <Button>
                            <Plus className="mr-2 h-4 w-4" />
                            Post New Job
                          </Button>
                        </Link>
                      </CardContent>
                    </Card>
                  )}
                </TabsContent>

                <TabsContent value="posts">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold">My Posts</h2>
                  </div>

                  <PostsFeed userId={user.id} />
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Dashboard;
