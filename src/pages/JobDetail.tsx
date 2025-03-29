import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Building,
  MapPin,
  Calendar,
  Briefcase,
  ChevronLeft,
  ExternalLink,
  Clock,
} from "lucide-react";

// Import sample job data
import { jobsData } from "@/data/jobsData";

const JobDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const [job, setJob] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In a real app, this would be an API call
    const selectedJob = jobsData.find((j) => j.id === Number(id));
    if (selectedJob) {
      setJob(selectedJob);
    }
    setLoading(false);
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col">
        <Header />
        <main className="flex-grow container mx-auto px-4 py-8">
          <div className="flex justify-center items-center h-[60vh]">
            <div className="text-xl">Loading...</div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!job) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col">
        <Header />
        <main className="flex-grow container mx-auto px-4 py-8">
          <div className="flex flex-col justify-center items-center h-[60vh]">
            <div className="text-xl mb-4">Job not found</div>
            <Link to="/jobs">
              <Button variant="outline">Go back to job listings</Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };

  const isOwner = user && user.id === job.postedById;

  return (
    <div className="min-h-screen text-primary-foreground flex flex-col">
      <Header />
      <main className="flex-grow">
        <div className="bg-[#0a2463] bg-primary py-8">
          <div className="container mx-auto px-4">
            <Link
              to="/jobs"
              className="inline-flex items-center text-white hover:text-[#e6c200] transition-colors"
            >
              <ChevronLeft size={20} />
              <span>Back to Jobs</span>
            </Link>
            <h1 className="text-3xl md:text-4xl font-bold mt-4">{job.title}</h1>
            <div className="flex flex-wrap items-center gap-4 mt-2">
              <div className="flex items-center text-gray-200">
                <Building className="mr-1.5 h-4 w-4" />
                <span>{job.company}</span>
              </div>
              <div className="flex items-center text-gray-200">
                <MapPin className="mr-1.5 h-4 w-4" />
                <span>{job.location}</span>
              </div>
              <Badge className="bg-[#e6c200] hover:bg-[#e6c200]/80">
                {job.type}
              </Badge>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main content */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Job Description</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="mb-6 text-gray-700">{job.description}</p>

                  <h3 className="text-lg font-semibold mb-3">Requirements</h3>
                  <ul className="list-disc list-inside space-y-1 text-gray-700 mb-6">
                    {job.requirements.map((requirement, index) => (
                      <li key={index}>{requirement}</li>
                    ))}
                  </ul>

                  {isOwner ? (
                    <div className="flex space-x-4 mt-8">
                      <Link to={`/dashboard/edit-job/${job.id}`}>
                        <Button variant="outline">Edit Job Posting</Button>
                      </Link>
                      <Button variant="destructive">Delete Job</Button>
                    </div>
                  ) : (
                    <Button className="mt-8" asChild>
                      <a
                        href={job.applicationLink}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <ExternalLink className="mr-2 h-4 w-4" />
                        Apply for this Position
                      </a>
                    </Button>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Job Overview</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-sm font-medium text-gray-500">
                        Salary Range
                      </h4>
                      <p className="font-semibold">{job.salary}</p>
                    </div>

                    <Separator />

                    <div>
                      <h4 className="text-sm font-medium text-gray-500">
                        Job Type
                      </h4>
                      <div className="flex items-center mt-1">
                        <Briefcase className="mr-2 h-4 w-4 text-gray-500" />
                        <span>{job.type}</span>
                      </div>
                    </div>

                    <Separator />

                    <div>
                      <h4 className="text-sm font-medium text-gray-500">
                        Category
                      </h4>
                      <div className="flex items-center mt-1">
                        <Briefcase className="mr-2 h-4 w-4 text-gray-500" />
                        <span>{job.category}</span>
                      </div>
                    </div>

                    <Separator />

                    <div>
                      <h4 className="text-sm font-medium text-gray-500">
                        Posted On
                      </h4>
                      <div className="flex items-center mt-1">
                        <Calendar className="mr-2 h-4 w-4 text-gray-500" />
                        <span>{formatDate(job.postedDate)}</span>
                      </div>
                    </div>

                    <Separator />

                    <div>
                      <h4 className="text-sm font-medium text-gray-500">
                        Posted By
                      </h4>
                      <Link
                        to={`/members/${job.postedById}`}
                        className="flex items-center mt-1 text-blue-600 hover:underline"
                      >
                        <span>{job.postedBy}</span>
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default JobDetail;
