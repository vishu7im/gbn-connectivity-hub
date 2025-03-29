
import React from "react";
import { Github, Globe, Linkedin, Mail, Twitter } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const mainDeveloper = {
  name: "Vishwajeet Sharma",
  title: "Full Stack Developer",
  image: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=2080",
  bio: "Passionate full-stack developer with a focus on creating seamless user experiences. Specialized in React, TypeScript, and modern frontend development.",
  skills: ["React", "TypeScript", "Node.js", "Tailwind CSS", "MongoDB", "Express"],
  links: {
    github: "https://github.com/vishwajeet",
    linkedin: "https://linkedin.com/in/vishwajeet-sharma",
    twitter: "https://twitter.com/vishwajeet",
    website: "https://vishwajeetsharma.dev",
    email: "vishwajeet@example.com"
  }
};

const contributingDevelopers = [
  {
    name: "Priya Singh",
    title: "Frontend Developer",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=2187",
    bio: "Frontend specialist with expertise in creating responsive UI components and animations.",
    skills: ["React", "CSS/SCSS", "UI/UX Design", "Animation"],
    links: {
      github: "https://github.com/priyasingh",
      linkedin: "https://linkedin.com/in/priyasingh",
    }
  },
  {
    name: "Rahul Verma",
    title: "Backend Developer",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=2187",
    bio: "Backend engineer with focus on API development, database optimization and server management.",
    skills: ["Node.js", "MongoDB", "Express", "GraphQL", "AWS"],
    links: {
      github: "https://github.com/rahulverma",
      linkedin: "https://linkedin.com/in/rahulverma",
    }
  },
];

const DeveloperCard = ({ developer, isMain = false }) => {
  return (
    <Card className={`overflow-hidden ${isMain ? 'border-primary' : ''}`}>
      <CardHeader className="p-0">
        <div className="h-32 bg-gradient-to-r from-blue-600 to-purple-600 relative">
          {isMain && (
            <div className="absolute bottom-0 left-0 bg-primary text-white px-3 py-1 text-sm rounded-tr-md">
              Lead Developer
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent className="pt-0 pb-6">
        <div className="flex flex-col items-center -mt-16">
          <Avatar className="h-32 w-32 border-4 border-background">
            <AvatarImage src={developer.image} alt={developer.name} />
            <AvatarFallback>{developer.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
          </Avatar>
          <CardTitle className="mt-4 text-xl">{developer.name}</CardTitle>
          <CardDescription className="text-sm">{developer.title}</CardDescription>
          
          <Separator className="my-4" />
          
          <p className="text-center text-muted-foreground mb-4">{developer.bio}</p>
          
          <div className="flex flex-wrap gap-2 justify-center mb-6">
            {developer.skills.map(skill => (
              <span key={skill} className="bg-secondary text-secondary-foreground px-3 py-1 rounded-full text-xs">
                {skill}
              </span>
            ))}
          </div>
          
          <div className="flex space-x-3">
            {developer.links.github && (
              <a href={developer.links.github} target="_blank" rel="noopener noreferrer">
                <Button size="icon" variant="outline">
                  <Github className="h-4 w-4" />
                </Button>
              </a>
            )}
            {developer.links.linkedin && (
              <a href={developer.links.linkedin} target="_blank" rel="noopener noreferrer">
                <Button size="icon" variant="outline">
                  <Linkedin className="h-4 w-4" />
                </Button>
              </a>
            )}
            {developer.links.twitter && (
              <a href={developer.links.twitter} target="_blank" rel="noopener noreferrer">
                <Button size="icon" variant="outline">
                  <Twitter className="h-4 w-4" />
                </Button>
              </a>
            )}
            {developer.links.website && (
              <a href={developer.links.website} target="_blank" rel="noopener noreferrer">
                <Button size="icon" variant="outline">
                  <Globe className="h-4 w-4" />
                </Button>
              </a>
            )}
            {developer.links.email && (
              <a href={`mailto:${developer.links.email}`}>
                <Button size="icon" variant="outline">
                  <Mail className="h-4 w-4" />
                </Button>
              </a>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const Developers = () => {
  return (
    <>
      <Header />
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold mb-2">Meet Our Developers</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            The talented team behind the GBN Polytechnic Alumni Portal, dedicated to building a platform that connects graduates across generations.
          </p>
        </div>
        
        <div className="mb-12">
          <h2 className="text-xl font-semibold mb-6">Lead Developer</h2>
          <div className="max-w-xl mx-auto">
            <DeveloperCard developer={mainDeveloper} isMain={true} />
          </div>
        </div>
        
        <div>
          <h2 className="text-xl font-semibold mb-6">Contributing Developers</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {contributingDevelopers.map((developer, index) => (
              <DeveloperCard key={index} developer={developer} />
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Developers;
