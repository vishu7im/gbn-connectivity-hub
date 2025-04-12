
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
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
import { Loader2, Users, Image, Newspaper, Calendar, LayoutDashboard } from 'lucide-react';

const API_URL = "http://localhost:5000/api";

const AdminPanel = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("dashboard");

  // Simplified admin check - always return true for development
  const { data: isAdmin, isLoading: checkingAdmin } = useQuery({
    queryKey: ['isAdmin'],
    queryFn: async () => {
      // For development, always return true to bypass admin check
      return true;
    },
  });

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

  return (
    <DashboardLayout>
      <div className="container mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold tracking-tight mb-3 bg-gradient-to-r from-purple-700 to-blue-500 text-transparent bg-clip-text">Admin Panel</h1>
        <p className="text-muted-foreground mb-6">Manage users, content, and monitor site activity</p>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-5 mb-8 bg-gray-100 p-1 rounded-lg">
            <TabsTrigger value="dashboard" className="flex items-center gap-2 data-[state=active]:bg-white data-[state=active]:shadow-sm">
              <LayoutDashboard className="h-4 w-4" />
              <span className="hidden sm:inline">Dashboard</span>
            </TabsTrigger>
            <TabsTrigger value="user-verification" className="flex items-center gap-2 data-[state=active]:bg-white data-[state=active]:shadow-sm">
              <Users className="h-4 w-4" />
              <span className="hidden sm:inline">Users</span>
            </TabsTrigger>
            <TabsTrigger value="gallery" className="flex items-center gap-2 data-[state=active]:bg-white data-[state=active]:shadow-sm">
              <Image className="h-4 w-4" />
              <span className="hidden sm:inline">Gallery</span>
            </TabsTrigger>
            <TabsTrigger value="news" className="flex items-center gap-2 data-[state=active]:bg-white data-[state=active]:shadow-sm">
              <Newspaper className="h-4 w-4" />
              <span className="hidden sm:inline">News</span>
            </TabsTrigger>
            <TabsTrigger value="events" className="flex items-center gap-2 data-[state=active]:bg-white data-[state=active]:shadow-sm">
              <Calendar className="h-4 w-4" />
              <span className="hidden sm:inline">Events</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="dashboard" className="mt-0">
            <Card className="border-none shadow-md bg-white">
              <CardHeader className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-t-lg">
                <CardTitle className="text-xl text-gray-800">Dashboard Overview</CardTitle>
                <CardDescription>
                  Key metrics and statistics for the alumni portal
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <DashboardStats />
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="user-verification" className="mt-0">
            <Card className="border-none shadow-md bg-white">
              <CardHeader className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-t-lg">
                <CardTitle className="text-xl text-gray-800">User Verification</CardTitle>
                <CardDescription>
                  Review and verify pending alumni accounts
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <UserVerificationTable />
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="gallery" className="mt-0">
            <Card className="border-none shadow-md bg-white">
              <CardHeader className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-t-lg">
                <CardTitle className="text-xl text-gray-800">Gallery Management</CardTitle>
                <CardDescription>
                  Upload and organize images for the alumni gallery
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <GalleryManager />
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="news" className="mt-0">
            <Card className="border-none shadow-md bg-white">
              <CardHeader className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-t-lg">
                <CardTitle className="text-xl text-gray-800">News Management</CardTitle>
                <CardDescription>
                  Publish and edit news articles for alumni
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <NewsManager />
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="events" className="mt-0">
            <Card className="border-none shadow-md bg-white">
              <CardHeader className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-t-lg">
                <CardTitle className="text-xl text-gray-800">Events Management</CardTitle>
                <CardDescription>
                  Create and manage alumni events
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <EventsManager />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default AdminPanel;
