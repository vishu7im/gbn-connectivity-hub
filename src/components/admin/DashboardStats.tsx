
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { adminAPI } from "@/services/api";
import { Users, FileText, Briefcase, Image, Calendar, AlertTriangle, CheckCircle, Clock } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts";

const DashboardStats = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["adminStats"],
    queryFn: async () => {
      const response = await adminAPI.getDashboardStats();
      return response.data;
    },
  });

  if (isLoading) {
    return <DashboardStatsLoading />;
  }

  if (error || !data) {
    return (
      <div className="p-4 bg-destructive/10 text-destructive rounded-md">
        <h3 className="font-medium">Error loading dashboard stats</h3>
        <p className="text-sm">Please try refreshing the page.</p>
      </div>
    );
  }

  const stats = [
    {
      title: "Total Alumni",
      value: data.totalUsers,
      icon: <Users className="h-5 w-5 text-primary" />,
    },
    {
      title: "Pending Verifications",
      value: data.pendingUsers,
      icon: <Clock className="h-5 w-5 text-yellow-500" />,
    },
    {
      title: "Rejected Alumni",
      value: data.rejectedUsers,
      icon: <AlertTriangle className="h-5 w-5 text-destructive" />,
    },
    {
      title: "Active Alumni",
      value: data.activeUsers,
      icon: <CheckCircle className="h-5 w-5 text-green-500" />,
    },
    {
      title: "Total Posts",
      value: data.totalPosts,
      icon: <FileText className="h-5 w-5 text-blue-500" />,
    },
    {
      title: "Total Jobs",
      value: data.totalJobs,
      icon: <Briefcase className="h-5 w-5 text-indigo-500" />,
    },
    {
      title: "Gallery Images",
      value: data.totalGalleryImages,
      icon: <Image className="h-5 w-5 text-purple-500" />,
    },
    {
      title: "Total Events",
      value: data.totalEvents,
      icon: <Calendar className="h-5 w-5 text-pink-500" />,
    },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-4 flex flex-col items-center justify-center text-center">
              {stat.icon}
              <h3 className="text-3xl font-bold mt-2">{stat.value}</h3>
              <p className="text-sm text-muted-foreground">{stat.title}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Posts by Month</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={data.postsByMonth}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="count" fill="#8884d8" name="Posts" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Daily Visits (Last 30 Days)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={data.dailyVisits}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="count"
                    stroke="#82ca9d"
                    name="Visits"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

const DashboardStatsLoading = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {Array(8)
          .fill(0)
          .map((_, index) => (
            <Card key={index}>
              <CardContent className="p-4">
                <div className="flex flex-col items-center">
                  <Skeleton className="h-5 w-5 rounded-full" />
                  <Skeleton className="h-8 w-16 mt-2" />
                  <Skeleton className="h-4 w-24 mt-2" />
                </div>
              </CardContent>
            </Card>
          ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <Skeleton className="h-6 w-40" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-80 w-full" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <Skeleton className="h-6 w-40" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-80 w-full" />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardStats;
