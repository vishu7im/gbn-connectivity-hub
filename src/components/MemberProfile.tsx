
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Building, GraduationCap, MapPin, Mail, Phone, Linkedin, Facebook, MessageSquare } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import PostsFeed from "@/components/PostsFeed";
import { alumniData } from "@/data/alumniData";
import MessengerChat from "@/components/MessengerChat";
import { useAuth } from "@/contexts/AuthContext";

interface MemberProfileProps {
  memberId: number;
}

const MemberProfile: React.FC<MemberProfileProps> = ({ memberId }) => {
  const [member, setMember] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    // In a real app, this would be an API call
    const foundMember = alumniData.find(m => m.id === memberId);
    if (foundMember) {
      // Enhance with mock profile data
      const enhancedMember = {
        ...foundMember,
        profileImage: null,
        bio: "Passionate professional with expertise in innovative solutions. Graduate from GBN Polytechnic with a strong foundation in technical skills and problem solving.",
        location: "Bangalore, India",
        phone: "+91 98765 43210",
        email: `${foundMember.name.toLowerCase().replace(/\s/g, '.')}@example.com`,
        linkedin: `linkedin.com/in/${foundMember.name.toLowerCase().replace(/\s/g, '-')}`,
        facebook: `facebook.com/${foundMember.name.toLowerCase().replace(/\s/g, '.')}`,
        projects: [
          { name: "Smart City Initiative", description: "Worked on IoT solutions for urban infrastructure" },
          { name: "E-Learning Platform", description: "Developed interactive learning modules for students" }
        ],
        skills: ["Leadership", "Project Management", "Technical Writing", "Public Speaking"]
      };
      setMember(enhancedMember);
    }
    setLoading(false);
  }, [memberId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!member) {
    return (
      <Card>
        <CardContent className="p-6">
          <h2 className="text-xl font-semibold text-center">Member not found</h2>
          <p className="text-muted-foreground text-center mt-2">The requested member profile could not be found.</p>
        </CardContent>
      </Card>
    );
  }

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase();
  };

  // Don't show messaging tab if viewing your own profile
  const isOwnProfile = user && user.id === memberId;

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="pb-0">
          <div className="md:flex items-start">
            <div className="md:w-1/4 flex justify-center mb-6 md:mb-0">
              <Avatar className="h-32 w-32">
                <AvatarFallback className="bg-primary text-primary-foreground text-4xl">
                  {getInitials(member.name)}
                </AvatarFallback>
              </Avatar>
            </div>
            <div className="md:w-3/4">
              <h1 className="text-3xl font-bold">{member.name}</h1>
              <div className="flex flex-wrap gap-2 mt-2 mb-4">
                <Badge variant="outline" className="font-normal">
                  <GraduationCap className="mr-1 h-3 w-3" />
                  {member.batch}
                </Badge>
                <Badge variant="secondary" className="font-normal">
                  {member.department}
                </Badge>
              </div>
              <div className="flex items-center text-muted-foreground mb-3">
                <Building className="h-4 w-4 mr-1" />
                <span>{member.currentRole} at {member.company}</span>
              </div>
              <div className="flex items-center text-muted-foreground mb-3">
                <MapPin className="h-4 w-4 mr-1" />
                <span>{member.location}</span>
              </div>
              <p className="mt-4 text-muted-foreground">{member.bio}</p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-6">
          <Tabs defaultValue="posts">
            <TabsList className="mb-4">
              <TabsTrigger value="posts">Posts</TabsTrigger>
              <TabsTrigger value="contact">Contact</TabsTrigger>
              <TabsTrigger value="about">About</TabsTrigger>
              {!isOwnProfile && user && <TabsTrigger value="message">Message</TabsTrigger>}
            </TabsList>
            <TabsContent value="posts">
              <PostsFeed userId={member.id} />
            </TabsContent>
            <TabsContent value="contact">
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card>
                    <CardContent className="p-4 flex items-center">
                      <Mail className="h-5 w-5 mr-2 text-primary" />
                      <a href={`mailto:${member.email}`} className="text-foreground hover:text-primary">
                        {member.email}
                      </a>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4 flex items-center">
                      <Phone className="h-5 w-5 mr-2 text-primary" />
                      <a href={`tel:${member.phone}`} className="text-foreground hover:text-primary">
                        {member.phone}
                      </a>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4 flex items-center">
                      <Linkedin className="h-5 w-5 mr-2 text-primary" />
                      <a href={`https://${member.linkedin}`} target="_blank" rel="noreferrer" className="text-foreground hover:text-primary">
                        {member.linkedin}
                      </a>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4 flex items-center">
                      <Facebook className="h-5 w-5 mr-2 text-primary" />
                      <a href={`https://${member.facebook}`} target="_blank" rel="noreferrer" className="text-foreground hover:text-primary">
                        {member.facebook}
                      </a>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="about">
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-3">Professional Skills</h3>
                  <div className="flex flex-wrap gap-2">
                    {member.skills.map((skill: string, index: number) => (
                      <Badge key={index} variant="outline">{skill}</Badge>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-3">Projects</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {member.projects.map((project: any, index: number) => (
                      <Card key={index}>
                        <CardContent className="p-4">
                          <h4 className="font-medium">{project.name}</h4>
                          <p className="text-sm text-muted-foreground mt-1">{project.description}</p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </div>
            </TabsContent>
            {!isOwnProfile && user && (
              <TabsContent value="message">
                <Card>
                  <CardContent className="p-4">
                    <div className="mb-4 flex items-center space-x-2">
                      <MessageSquare className="h-5 w-5 text-primary" />
                      <h3 className="text-lg font-semibold">Send a Message</h3>
                    </div>
                    <div className="h-[400px] border rounded-md">
                      <MessengerChat recipientId={member.id} />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            )}
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default MemberProfile;
