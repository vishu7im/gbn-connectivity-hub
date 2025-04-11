
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { Users, FileText, Briefcase, Image, Calendar, Clock, Shield, Ban } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

interface DashboardStats {
  totalUsers: number;
  pendingUsers: number;
  rejectedUsers: number;
  totalPosts: number;
  blockedPosts: number;
  totalJobs: number;
  activeJobs: number;
  totalGalleryImages: number;
  totalEvents: number;
  totalNews: number;
  activeUsers: number;
  postsByMonth: Array<{
    month: string;
    count: number;
  }>;
  dailyVisits: Array<{
    date: string;
    count: number;
  }>;
}

const API_URL = "http://localhost:5000/api";

const DashboardStats = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['adminDashboardStats'],
    queryFn: async () => {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('Not authenticated');
      
      const response = await axios.get<DashboardStats>(`${API_URL}/admin/stats`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return response.data;
    }
  });

  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {[...Array(8)].map((_, i) => (
            <Card key={i}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <Skeleton className="h-5 w-24" />
                <Skeleton className="h-4 w-4 rounded-full" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-8 w-16" />
              </CardContent>
            </Card>
          ))}
        </div>
        <Card>
          <CardHeader>
            <Skeleton className="h-6 w-32" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-[300px] w-full" />
          </CardContent>
        </Card>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-800 rounded-md text-red-600 dark:text-red-400">
        Error loading dashboard statistics. Please try refreshing the page.
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="dark:shadow-md dark:shadow-gray-800/10 dark:border-gray-800">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Alumni</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data?.totalUsers || 0}</div>
          </CardContent>
        </Card>
        
        <Card className="dark:shadow-md dark:shadow-gray-800/10 dark:border-gray-800">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Pending Verifications</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-amber-500">{data?.pendingUsers || 0}</div>
          </CardContent>
        </Card>
        
        <Card className="dark:shadow-md dark:shadow-gray-800/10 dark:border-gray-800">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Rejected Profiles</CardTitle>
            <Ban className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-500">{data?.rejectedUsers || 0}</div>
          </CardContent>
        </Card>
        
        <Card className="dark:shadow-md dark:shadow-gray-800/10 dark:border-gray-800">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Active Users</CardTitle>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-500">{data?.activeUsers || 0}</div>
          </CardContent>
        </Card>
        
        <Card className="dark:shadow-md dark:shadow-gray-800/10 dark:border-gray-800">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Posts</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data?.totalPosts || 0}</div>
            {data?.blockedPosts > 0 && (
              <p className="text-xs text-red-500 mt-1">
                {data.blockedPosts} blocked
              </p>
            )}
          </CardContent>
        </Card>
        
        <Card className="dark:shadow-md dark:shadow-gray-800/10 dark:border-gray-800">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Active Jobs</CardTitle>
            <Briefcase className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data?.activeJobs || 0}</div>
            <p className="text-xs text-muted-foreground mt-1">
              of {data?.totalJobs || 0} total
            </p>
          </CardContent>
        </Card>
        
        <Card className="dark:shadow-md dark:shadow-gray-800/10 dark:border-gray-800">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Gallery Images</CardTitle>
            <Image className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data?.totalGalleryImages || 0}</div>
          </CardContent>
        </Card>
        
        <Card className="dark:shadow-md dark:shadow-gray-800/10 dark:border-gray-800">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Events</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data?.totalEvents || 0}</div>
          </CardContent>
        </Card>
      </div>

      {/* Site Visits Chart */}
      <Card className="dark:shadow-md dark:shadow-gray-800/10 dark:border-gray-800">
        <CardHeader>
          <CardTitle>Site Visits (Last 30 Days)</CardTitle>
        </CardHeader>
        <CardContent className="px-2">
          <div className="h-[300px]">
            {data?.dailyVisits && data.dailyVisits.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data.dailyVisits}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    dataKey="date" 
                    tickFormatter={(value) => {
                      const date = new Date(value);
                      return `${date.getDate()}/${date.getMonth() + 1}`;
                    }}
                  />
                  <YAxis />
                  <Tooltip />
                  <Line 
                    type="monotone" 
                    dataKey="count" 
                    stroke="#8884d8" 
                    strokeWidth={2}
                    name="Visits" 
                  />
                </LineChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex items-center justify-center h-full text-muted-foreground">
                No visit data available
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Post Activity Chart */}
      <Card className="dark:shadow-md dark:shadow-gray-800/10 dark:border-gray-800">
        <CardHeader>
          <CardTitle>Post Activity (Last 6 Months)</CardTitle>
        </CardHeader>
        <CardContent className="px-2">
          <div className="h-[300px]">
            {data?.postsByMonth && data.postsByMonth.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data.postsByMonth}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="count" fill="#8884d8" name="Posts" />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex items-center justify-center h-full text-muted-foreground">
                No post activity data available
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardStats;
