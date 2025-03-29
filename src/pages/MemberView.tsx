
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Mail, Phone, MapPin, Briefcase, Calendar, GraduationCap, Link2, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { alumniData } from "@/data/alumniData";
import { Link } from "react-router-dom";
import PostsFeed from "@/components/PostsFeed";

const MemberView = () => {
  const { id } = useParams();
  const [member, setMember] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call with a small delay
    const timer = setTimeout(() => {
      if (id) {
        const foundMember = alumniData.find(m => m.id === parseInt(id));
        setMember(foundMember);
      }
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [id]);

  if (loading) {
    return (
      <>
        <Header />
        <div className="container mx-auto p-4 min-h-[80vh] flex items-center justify-center">
          <div className="animate-pulse flex flex-col items-center">
            <div className="rounded-full bg-gray-300 h-32 w-32 mb-4"></div>
            <div className="h-6 bg-gray-300 rounded w-48 mb-4"></div>
            <div className="h-4 bg-gray-300 rounded w-64"></div>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  if (!member) {
    return (
      <>
        <Header />
        <div className="container mx-auto p-4 min-h-[80vh] flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-2">Member Not Found</h2>
            <p className="mb-4">The member you are looking for does not exist or has been removed.</p>
            <Button asChild>
              <Link to="/members">Back to Members</Link>
            </Button>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase();
  };

  return (
    <>
      <Header />
      <div className="container mx-auto p-4 py-8">
        <Button variant="outline" className="mb-6" asChild>
          <Link to="/members">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Members
          </Link>
        </Button>
        
        <Card>
          <CardContent className="p-0">
            {/* Cover Image */}
            <div className="h-48 bg-gradient-to-r from-blue-500 to-purple-600 relative"></div>
            
            {/* Profile Info */}
            <div className="px-6 pb-6">
              <div className="flex flex-col md:flex-row items-start md:items-end -mt-12 mb-6">
                <Avatar className="h-24 w-24 border-4 border-background">
                  <AvatarFallback className="text-2xl bg-primary text-primary-foreground">
                    {getInitials(member.name)}
                  </AvatarFallback>
                </Avatar>
                <div className="mt-4 md:mt-0 md:ml-6 flex-1">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                    <div>
                      <h1 className="text-2xl font-bold">{member.name}</h1>
                      <p className="text-gray-500">{member.currentRole} at {member.company}</p>
                    </div>
                    <div className="mt-4 md:mt-0 flex gap-2">
                      <Badge variant="outline" className="font-normal">
                        <GraduationCap className="mr-1 h-3 w-3" />
                        {member.batch}
                      </Badge>
                      <Badge variant="secondary" className="font-normal">
                        {member.department}
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>
              
              <Separator className="my-6" />
              
              <Tabs defaultValue="about">
                <TabsList className="mb-6 grid w-full grid-cols-3">
                  <TabsTrigger value="about">About</TabsTrigger>
                  <TabsTrigger value="experience">Experience</TabsTrigger>
                  <TabsTrigger value="posts">Posts</TabsTrigger>
                </TabsList>
                <TabsContent value="about">
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-medium mb-2">Bio</h3>
                      <p className="text-gray-600">{member.bio || "No bio provided."}</p>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-medium mb-2">Contact Information</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex items-center">
                          <Mail className="h-5 w-5 text-gray-500 mr-2" />
                          <span>{member.email}</span>
                        </div>
                        {member.phone && (
                          <div className="flex items-center">
                            <Phone className="h-5 w-5 text-gray-500 mr-2" />
                            <span>{member.phone}</span>
                          </div>
                        )}
                        {member.location && (
                          <div className="flex items-center">
                            <MapPin className="h-5 w-5 text-gray-500 mr-2" />
                            <span>{member.location}</span>
                          </div>
                        )}
                        {member.website && (
                          <div className="flex items-center">
                            <Link2 className="h-5 w-5 text-gray-500 mr-2" />
                            <a href={member.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                              Personal Website
                            </a>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-medium mb-2">Education</h3>
                      <div className="flex items-start">
                        <GraduationCap className="h-5 w-5 text-gray-500 mr-2 mt-1" />
                        <div>
                          <p className="font-medium">GBN Polytechnic</p>
                          <p className="text-gray-600">{member.department}</p>
                          <p className="text-gray-500 text-sm">{member.batch}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="experience">
                  <div className="space-y-6">
                    <div className="flex items-start">
                      <Briefcase className="h-5 w-5 text-gray-500 mr-3 mt-1" />
                      <div>
                        <p className="font-medium">{member.currentRole}</p>
                        <p className="text-gray-600">{member.company}</p>
                        <p className="text-gray-500 text-sm">2020 - Present</p>
                        <p className="mt-2">{member.jobDescription || "No job description provided."}</p>
                      </div>
                    </div>
                    
                    {member.previousExperience && member.previousExperience.map((exp: any, index: number) => (
                      <div key={index} className="flex items-start">
                        <Briefcase className="h-5 w-5 text-gray-500 mr-3 mt-1" />
                        <div>
                          <p className="font-medium">{exp.role}</p>
                          <p className="text-gray-600">{exp.company}</p>
                          <p className="text-gray-500 text-sm">{exp.period}</p>
                          <p className="mt-2">{exp.description}</p>
                        </div>
                      </div>
                    ))}
                    
                    {(!member.previousExperience || member.previousExperience.length === 0) && (
                      <p className="text-gray-500">No previous experience listed.</p>
                    )}
                  </div>
                </TabsContent>
                <TabsContent value="posts">
                  <PostsFeed userId={parseInt(id || "0")} />
                </TabsContent>
              </Tabs>
            </div>
          </CardContent>
        </Card>
      </div>
      <Footer />
    </>
  );
};

export default MemberView;
