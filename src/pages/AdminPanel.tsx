
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { toast } from 'sonner';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button"; // Added Button import
import UserVerificationTable from '@/components/admin/UserVerificationTable';
import GalleryManager from '@/components/admin/GalleryManager';
import NewsManager from '@/components/admin/NewsManager';
import EventsManager from '@/components/admin/EventsManager';
import DashboardStats from '@/components/admin/DashboardStats';
import DashboardLayout from '@/components/layouts/DashboardLayout';
import { useAuth } from '@/contexts/AuthContext';
import { 
  Loader2, 
  Users, 
  Image, 
  Newspaper, 
  Calendar, 
  LayoutDashboard, 
  PieChart, 
  BarChart2, 
  UserCheck, 
  UserX, 
  Shield,
  MessageSquare,
  Settings,
  User,
  Home,
  Award,
  FileText,
  Briefcase // Added Briefcase import
} from 'lucide-react';
import AdminSidebar from '@/components/admin/AdminSidebar';
import { mockAdminData } from '@/data/mockAdminData';
import AllUsersTable from '@/components/admin/AllUsersTable';
import AdminMessaging from '@/components/admin/AdminMessaging';
import AdminAccountSettings from '@/components/admin/AdminAccountSettings';
import GlobalMessages from '@/components/admin/GlobalMessages';
import CarouselManager from '@/components/admin/CarouselManager';
import PrincipalManager from '@/components/admin/PrincipalManager';
import AlumniSpotlightManager from '@/components/admin/AlumniSpotlightManager';

const API_URL = "http://localhost:5000/api";

const AdminPanel = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // For development, always consider the user an admin
  const isAdmin = true;
  const checkingAdmin = false;

  if (checkingAdmin) {
    return (
      <div className="flex items-center justify-center h-96">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <span className="ml-2">Checking permissions...</span>
      </div>
    );
  }

  // Use mock data for the admin panel
  const adminData = mockAdminData;

  return (
    <div className="flex h-screen">
      <AdminSidebar open={sidebarOpen} setOpen={setSidebarOpen} activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <div className={`transition-all duration-300 flex-1 overflow-auto ${sidebarOpen ? 'ml-64' : 'ml-20'}`}>
        <div className="container mx-auto py-8 px-4">
          <h1 className="text-3xl font-bold tracking-tight mb-3 bg-gradient-to-r from-purple-700 to-blue-500 text-transparent bg-clip-text">Admin Panel</h1>
          <p className="text-muted-foreground mb-6">Manage users, content, and monitor site activity</p>
          
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsContent value="dashboard" className="mt-0">
              <Card className="border-none shadow-md bg-white dark:bg-slate-800">
                <CardHeader className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-slate-800 dark:to-slate-900 rounded-t-lg">
                  <CardTitle className="text-xl text-gray-800 dark:text-gray-100">Dashboard Overview</CardTitle>
                  <CardDescription className="dark:text-gray-300">
                    Key metrics and statistics for the alumni portal
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-6">
                  <DashboardStats data={adminData.dashboardStats} />
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="all-users" className="mt-0">
              <Card className="border-none shadow-md bg-white dark:bg-slate-800">
                <CardHeader className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-slate-800 dark:to-slate-900 rounded-t-lg">
                  <CardTitle className="text-xl text-gray-800 dark:text-gray-100">All Users</CardTitle>
                  <CardDescription className="dark:text-gray-300">
                    View and manage all registered users
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-6">
                  <AllUsersTable users={adminData.allUsers.map(user => ({
                    ...user,
                    email: user.email || `${user.name.toLowerCase().replace(/\s/g, '.')}@example.com`,
                    isVerified: typeof user.isVerified === 'boolean' ? user.isVerified : true
                  }))} />
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="user-verification" className="mt-0">
              <Card className="border-none shadow-md bg-white dark:bg-slate-800">
                <CardHeader className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-slate-800 dark:to-slate-900 rounded-t-lg">
                  <CardTitle className="text-xl text-gray-800 dark:text-gray-100">User Verification</CardTitle>
                  <CardDescription className="dark:text-gray-300">
                    Review and verify pending alumni accounts
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-6">
                  <UserVerificationTable users={adminData.pendingUsers} />
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="gallery" className="mt-0">
              <Card className="border-none shadow-md bg-white dark:bg-slate-800">
                <CardHeader className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-slate-800 dark:to-slate-900 rounded-t-lg">
                  <CardTitle className="text-xl text-gray-800 dark:text-gray-100">Gallery Management</CardTitle>
                  <CardDescription className="dark:text-gray-300">
                    Upload and organize images for the alumni gallery
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-6">
                  <GalleryManager images={adminData.galleryImages} />
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="news" className="mt-0">
              <Card className="border-none shadow-md bg-white dark:bg-slate-800">
                <CardHeader className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-slate-800 dark:to-slate-900 rounded-t-lg">
                  <CardTitle className="text-xl text-gray-800 dark:text-gray-100">News Management</CardTitle>
                  <CardDescription className="dark:text-gray-300">
                    Publish and edit news articles for alumni
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-6">
                  <NewsManager newsItems={adminData.newsItems} />
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="events" className="mt-0">
              <Card className="border-none shadow-md bg-white dark:bg-slate-800">
                <CardHeader className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-slate-800 dark:to-slate-900 rounded-t-lg">
                  <CardTitle className="text-xl text-gray-800 dark:text-gray-100">Events Management</CardTitle>
                  <CardDescription className="dark:text-gray-300">
                    Create and manage alumni events
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-6">
                  <EventsManager events={adminData.events} />
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="messages" className="mt-0">
              <Card className="border-none shadow-md bg-white dark:bg-slate-800">
                <CardHeader className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-slate-800 dark:to-slate-900 rounded-t-lg">
                  <CardTitle className="text-xl text-gray-800 dark:text-gray-100">Admin Messaging</CardTitle>
                  <CardDescription className="dark:text-gray-300">
                    Send and receive messages with users
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-6">
                  <AdminMessaging />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="global-messages" className="mt-0">
              <Card className="border-none shadow-md bg-white dark:bg-slate-800">
                <CardHeader className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-slate-800 dark:to-slate-900 rounded-t-lg">
                  <CardTitle className="text-xl text-gray-800 dark:text-gray-100">Global Messages</CardTitle>
                  <CardDescription className="dark:text-gray-300">
                    View messages submitted through the Contact Us form
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-6">
                  <GlobalMessages />
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="carousel" className="mt-0">
              <Card className="border-none shadow-md bg-white dark:bg-slate-800">
                <CardHeader className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-slate-800 dark:to-slate-900 rounded-t-lg">
                  <CardTitle className="text-xl text-gray-800 dark:text-gray-100">Homepage Carousel</CardTitle>
                  <CardDescription className="dark:text-gray-300">
                    Manage images for the homepage carousel
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-6">
                  <CarouselManager />
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="principal" className="mt-0">
              <Card className="border-none shadow-md bg-white dark:bg-slate-800">
                <CardHeader className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-slate-800 dark:to-slate-900 rounded-t-lg">
                  <CardTitle className="text-xl text-gray-800 dark:text-gray-100">Principal's Desk</CardTitle>
                  <CardDescription className="dark:text-gray-300">
                    Update principal's details and message
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-6">
                  <PrincipalManager />
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="alumni-spotlight" className="mt-0">
              <Card className="border-none shadow-md bg-white dark:bg-slate-800">
                <CardHeader className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-slate-800 dark:to-slate-900 rounded-t-lg">
                  <CardTitle className="text-xl text-gray-800 dark:text-gray-100">Alumni Spotlight</CardTitle>
                  <CardDescription className="dark:text-gray-300">
                    Manage featured alumni on the homepage
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-6">
                  <AlumniSpotlightManager />
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="posts" className="mt-0">
              <Card className="border-none shadow-md bg-white dark:bg-slate-800">
                <CardHeader className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-slate-800 dark:to-slate-900 rounded-t-lg">
                  <CardTitle className="text-xl text-gray-800 dark:text-gray-100">Posts Moderation</CardTitle>
                  <CardDescription className="dark:text-gray-300">
                    Review and moderate user posts
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="text-center py-12">
                    <FileText className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                    <h3 className="text-lg font-medium mb-2">Post Moderation</h3>
                    <p className="text-muted-foreground mb-4 max-w-md mx-auto">
                      View and moderate all user posts. Flag or remove inappropriate content.
                    </p>
                    <Button onClick={() => toast.info("Feature coming soon")}>
                      View All Posts
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="jobs" className="mt-0">
              <Card className="border-none shadow-md bg-white dark:bg-slate-800">
                <CardHeader className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-slate-800 dark:to-slate-900 rounded-t-lg">
                  <CardTitle className="text-xl text-gray-800 dark:text-gray-100">Jobs Moderation</CardTitle>
                  <CardDescription className="dark:text-gray-300">
                    Review and moderate job listings
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="text-center py-12">
                    <Briefcase className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                    <h3 className="text-lg font-medium mb-2">Job Listings Moderation</h3>
                    <p className="text-muted-foreground mb-4 max-w-md mx-auto">
                      Review and moderate job listings posted by alumni. Ensure all listings are appropriate and legitimate.
                    </p>
                    <Button onClick={() => toast.info("Feature coming soon")}>
                      View All Job Listings
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="analytics" className="mt-0">
              <Card className="border-none shadow-md bg-white dark:bg-slate-800">
                <CardHeader className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-slate-800 dark:to-slate-900 rounded-t-lg">
                  <CardTitle className="text-xl text-gray-800 dark:text-gray-100">Analytics Dashboard</CardTitle>
                  <CardDescription className="dark:text-gray-300">
                    Site traffic and user engagement metrics
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card className="dark:bg-slate-900 dark:border-slate-700">
                      <CardHeader>
                        <CardTitle className="text-lg dark:text-gray-100">User Activity</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <BarChart2 className="h-40 w-full text-muted-foreground mb-4" />
                        <p className="text-sm text-muted-foreground">Simulated chart data - would display user logins over time</p>
                      </CardContent>
                    </Card>
                    <Card className="dark:bg-slate-900 dark:border-slate-700">
                      <CardHeader>
                        <CardTitle className="text-lg dark:text-gray-100">Content Distribution</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <PieChart className="h-40 w-full text-muted-foreground mb-4" />
                        <p className="text-sm text-muted-foreground">Simulated chart data - would show content type distribution</p>
                      </CardContent>
                    </Card>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="users-blocked" className="mt-0">
              <Card className="border-none shadow-md bg-white dark:bg-slate-800">
                <CardHeader className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-slate-800 dark:to-slate-900 rounded-t-lg">
                  <CardTitle className="text-xl text-gray-800 dark:text-gray-100">Blocked Users</CardTitle>
                  <CardDescription className="dark:text-gray-300">
                    Manage blocked user accounts
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-6">
                  <UserVerificationTable users={adminData.blockedUsers} isBlockedList={true} />
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="users-rejected" className="mt-0">
              <Card className="border-none shadow-md bg-white dark:bg-slate-800">
                <CardHeader className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-slate-800 dark:to-slate-900 rounded-t-lg">
                  <CardTitle className="text-xl text-gray-800 dark:text-gray-100">Rejected Users</CardTitle>
                  <CardDescription className="dark:text-gray-300">
                    View and manage rejected account requests
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-6">
                  <UserVerificationTable users={adminData.rejectedUsers} isRejectedList={true} />
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="settings" className="mt-0">
              <Card className="border-none shadow-md bg-white dark:bg-slate-800">
                <CardHeader className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-slate-800 dark:to-slate-900 rounded-t-lg">
                  <CardTitle className="text-xl text-gray-800 dark:text-gray-100">Admin Account Settings</CardTitle>
                  <CardDescription className="dark:text-gray-300">
                    Manage your admin account credentials
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-6">
                  <AdminAccountSettings />
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
