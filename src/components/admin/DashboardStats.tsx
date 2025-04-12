
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DashboardStatsType } from "@/data/mockAdminData";
import { Users, FileText, Briefcase, Image, Calendar, Newspaper, Activity } from "lucide-react";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from "recharts";

interface DashboardStatsProps {
  data: DashboardStatsType;
}

const colors = ["#3b82f6", "#10b981", "#ef4444", "#f59e0b", "#8b5cf6", "#ec4899"];

const DashboardStats = ({ data }: DashboardStatsProps) => {
  // Calculate percentage of users verified
  const totalRegistered = data.totalUsers;
  const pendingPercentage = Math.round((data.pendingUsers / totalRegistered) * 100);
  const verifiedPercentage = 100 - pendingPercentage;

  // Create data for the pie chart
  const contentDistribution = [
    { name: "Posts", value: data.totalPosts },
    { name: "Jobs", value: data.totalJobs },
    { name: "Gallery", value: data.totalGalleryImages },
    { name: "Events", value: data.totalEvents },
    { name: "News", value: data.totalNews },
  ];

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Users
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <Users className="h-5 w-5 text-blue-500 mr-2" />
              <div className="text-2xl font-bold">{data.totalUsers.toLocaleString()}</div>
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              {data.activeUsers.toLocaleString()} active in the last 30 days
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Pending Verifications
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <Activity className="h-5 w-5 text-amber-500 mr-2" />
              <div className="text-2xl font-bold">{data.pendingUsers.toLocaleString()}</div>
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              {data.rejectedUsers.toLocaleString()} rejected registrations
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Posts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <FileText className="h-5 w-5 text-green-500 mr-2" />
              <div className="text-2xl font-bold">{data.totalPosts.toLocaleString()}</div>
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              {data.postsByMonth[data.postsByMonth.length - 1]?.count || 0} new posts this month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Active Jobs
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <Briefcase className="h-5 w-5 text-purple-500 mr-2" />
              <div className="text-2xl font-bold">{data.totalJobs.toLocaleString()}</div>
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              From various companies and industries
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Gallery Images
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <Image className="h-5 w-5 text-indigo-500 mr-2" />
              <div className="text-2xl font-bold">{data.totalGalleryImages.toLocaleString()}</div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Events
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <Calendar className="h-5 w-5 text-red-500 mr-2" />
              <div className="text-2xl font-bold">{data.totalEvents.toLocaleString()}</div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              News Articles
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <Newspaper className="h-5 w-5 text-cyan-500 mr-2" />
              <div className="text-2xl font-bold">{data.totalNews.toLocaleString()}</div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Daily Site Visits (Last 12 Days)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data.dailyVisits}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    dataKey="date" 
                    tickFormatter={(date) => new Date(date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                  />
                  <YAxis />
                  <Tooltip 
                    formatter={(value) => [`${value} visits`, 'Visits']}
                    labelFormatter={(date) => new Date(date).toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' })}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="count" 
                    stroke="#3b82f6" 
                    strokeWidth={2}
                    dot={{ r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>User Registration Activity</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center">
            <div className="h-80 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={contentDistribution}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    fill="#8884d8"
                    paddingAngle={2}
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {contentDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`${value}`, 'Count']} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Posts Created by Month</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data.postsByMonth}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip formatter={(value) => [`${value} posts`, 'Posts']} />
                  <Bar dataKey="count" fill="#10b981" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardStats;
