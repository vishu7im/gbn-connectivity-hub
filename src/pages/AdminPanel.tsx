
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { toast } from 'sonner';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import UserVerificationTable from '@/components/admin/UserVerificationTable';
import GalleryManager from '@/components/admin/GalleryManager';
import NewsManager from '@/components/admin/NewsManager';
import EventsManager from '@/components/admin/EventsManager';
import DashboardStats from '@/components/admin/DashboardStats';
import DashboardLayout from '@/components/layouts/DashboardLayout';
import { useAuth } from '@/contexts/AuthContext';
import { Loader2, Users, Image, Newspaper, Calendar, LayoutDashboard, PieChart, BarChart2, UserCheck, UserX, Shield } from 'lucide-react';
import AdminSidebar from '@/components/admin/AdminSidebar';
import { mockAdminData } from '@/data/mockAdminData';

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
      <DashboardLayout>
        <div className="flex items-center justify-center h-96">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <span className="ml-2">Checking permissions...</span>
        </div>
      </DashboardLayout>
    );
  }

  // Use mock data for the admin panel
  const adminData = mockAdminData;

  return (
    <DashboardLayout>
      <div className="flex h-[calc(100vh-4rem)]">
        <AdminSidebar open={sidebarOpen} setOpen={setSidebarOpen} activeTab={activeTab} setActiveTab={setActiveTab} />
        
        <div className={`transition-all duration-300 flex-1 overflow-auto ${sidebarOpen ? 'ml-64' : 'ml-20'}`}>
          <div className="container mx-auto py-8 px-4">
            <h1 className="text-3xl font-bold tracking-tight mb-3 bg-gradient-to-r from-purple-700 to-blue-500 text-transparent bg-clip-text">Admin Panel</h1>
            <p className="text-muted-foreground mb-6">Manage users, content, and monitor site activity</p>
            
            <TabsContent value="dashboard" className={`mt-0 ${activeTab === 'dashboard' ? 'block' : 'hidden'}`}>
              <Card className="border-none shadow-md bg-white">
                <CardHeader className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-t-lg">
                  <CardTitle className="text-xl text-gray-800">Dashboard Overview</CardTitle>
                  <CardDescription>
                    Key metrics and statistics for the alumni portal
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-6">
                  <DashboardStats data={adminData.dashboardStats} />
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="user-verification" className={`mt-0 ${activeTab === 'user-verification' ? 'block' : 'hidden'}`}>
              <Card className="border-none shadow-md bg-white">
                <CardHeader className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-t-lg">
                  <CardTitle className="text-xl text-gray-800">User Verification</CardTitle>
                  <CardDescription>
                    Review and verify pending alumni accounts
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-6">
                  <UserVerificationTable users={adminData.pendingUsers} />
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="gallery" className={`mt-0 ${activeTab === 'gallery' ? 'block' : 'hidden'}`}>
              <Card className="border-none shadow-md bg-white">
                <CardHeader className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-t-lg">
                  <CardTitle className="text-xl text-gray-800">Gallery Management</CardTitle>
                  <CardDescription>
                    Upload and organize images for the alumni gallery
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-6">
                  <GalleryManager images={adminData.galleryImages} />
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="news" className={`mt-0 ${activeTab === 'news' ? 'block' : 'hidden'}`}>
              <Card className="border-none shadow-md bg-white">
                <CardHeader className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-t-lg">
                  <CardTitle className="text-xl text-gray-800">News Management</CardTitle>
                  <CardDescription>
                    Publish and edit news articles for alumni
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-6">
                  <NewsManager newsItems={adminData.newsItems} />
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="events" className={`mt-0 ${activeTab === 'events' ? 'block' : 'hidden'}`}>
              <Card className="border-none shadow-md bg-white">
                <CardHeader className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-t-lg">
                  <CardTitle className="text-xl text-gray-800">Events Management</CardTitle>
                  <CardDescription>
                    Create and manage alumni events
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-6">
                  <EventsManager events={adminData.events} />
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="analytics" className={`mt-0 ${activeTab === 'analytics' ? 'block' : 'hidden'}`}>
              <Card className="border-none shadow-md bg-white">
                <CardHeader className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-t-lg">
                  <CardTitle className="text-xl text-gray-800">Analytics Dashboard</CardTitle>
                  <CardDescription>
                    Site traffic and user engagement metrics
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">User Activity</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <BarChart2 className="h-40 w-full text-muted-foreground mb-4" />
                        <p className="text-sm text-muted-foreground">Simulated chart data - would display user logins over time</p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">Content Distribution</CardTitle>
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
            
            <TabsContent value="users-blocked" className={`mt-0 ${activeTab === 'users-blocked' ? 'block' : 'hidden'}`}>
              <Card className="border-none shadow-md bg-white">
                <CardHeader className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-t-lg">
                  <CardTitle className="text-xl text-gray-800">Blocked Users</CardTitle>
                  <CardDescription>
                    Manage blocked user accounts
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-6">
                  <UserVerificationTable users={adminData.blockedUsers} isBlockedList={true} />
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="users-rejected" className={`mt-0 ${activeTab === 'users-rejected' ? 'block' : 'hidden'}`}>
              <Card className="border-none shadow-md bg-white">
                <CardHeader className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-t-lg">
                  <CardTitle className="text-xl text-gray-800">Rejected Users</CardTitle>
                  <CardDescription>
                    View and manage rejected account requests
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-6">
                  <UserVerificationTable users={adminData.rejectedUsers} isRejectedList={true} />
                </CardContent>
              </Card>
            </TabsContent>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AdminPanel;
