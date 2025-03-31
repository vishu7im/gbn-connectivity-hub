
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
import { Loader2 } from 'lucide-react';

const API_URL = "http://localhost:5000/api";

const AdminPanel = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("dashboard");

  // Check if user is admin
  const { data: isAdmin, isLoading: checkingAdmin } = useQuery({
    queryKey: ['isAdmin'],
    queryFn: async () => {
      try {
        const token = localStorage.getItem('token');
        
        if (!token) return false;
        
        await axios.get(`${API_URL}/auth/pending`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        
        return true;
      } catch (error) {
        return false;
      }
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

  if (!isAdmin) {
    return (
      <DashboardLayout>
        <div className="container max-w-4xl mx-auto py-8 px-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-center text-red-500">Access Denied</CardTitle>
              <CardDescription className="text-center">
                You don't have permission to access the admin panel.
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <p>Please contact the system administrator if you believe this is an error.</p>
            </CardContent>
          </Card>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="container mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold tracking-tight mb-6">Admin Panel</h1>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-5 mb-8">
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="user-verification">User Verification</TabsTrigger>
            <TabsTrigger value="gallery">Gallery</TabsTrigger>
            <TabsTrigger value="news">News</TabsTrigger>
            <TabsTrigger value="events">Events</TabsTrigger>
          </TabsList>
          
          <TabsContent value="dashboard" className="mt-0">
            <Card>
              <CardHeader>
                <CardTitle>Dashboard</CardTitle>
                <CardDescription>
                  Overview of the alumni portal statistics and activities.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <DashboardStats />
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="user-verification" className="mt-0">
            <Card>
              <CardHeader>
                <CardTitle>User Verification</CardTitle>
                <CardDescription>
                  Verify alumni accounts to allow them to post content and jobs.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <UserVerificationTable />
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="gallery" className="mt-0">
            <Card>
              <CardHeader>
                <CardTitle>Gallery Management</CardTitle>
                <CardDescription>
                  Manage images in the alumni gallery.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <GalleryManager />
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="news" className="mt-0">
            <Card>
              <CardHeader>
                <CardTitle>News Management</CardTitle>
                <CardDescription>
                  Create and manage news articles for alumni.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <NewsManager />
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="events" className="mt-0">
            <Card>
              <CardHeader>
                <CardTitle>Events Management</CardTitle>
                <CardDescription>
                  Manage upcoming events for alumni.
                </CardDescription>
              </CardHeader>
              <CardContent>
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
