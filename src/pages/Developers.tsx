import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Github, Linkedin, Twitter } from "lucide-react";

const Developers = () => {
  const leadDeveloper = {
    name: "Vishal Munday",
    role: "Lead Developer",
    bio: "Full-stack developer with expertise in React, TypeScript, and modern web technologies. Passionate about creating intuitive user experiences and solving complex problems.",
    avatar: "VM",
    links: {
      github: "https://github.com/vishu7im",
      linkedin: "https://linkedin.com/in/vishu7im",
      twitter: "https://twitter.com/vishu7im",
    },
  };

  const contributingDevelopers = [
    {
      name: "Priya Sharma",
      role: "UI/UX Designer",
      bio: "Designer focused on creating beautiful and functional interfaces.",
      avatar: "PS",
    },
    {
      name: "Vikram Singh",
      role: "Frontend Developer",
      bio: "React specialist with an eye for detail and performance.",
      avatar: "VS",
    },
    {
      name: "Neha Gupta",
      role: "Backend Developer",
      bio: "Database expert ensuring reliable and secure data management.",
      avatar: "NG",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Header />
      <main className="flex-grow py-8 md:py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Meet Our Team</h1>
          <p className="text-muted-foreground mb-8">
            The talented people behind the GBN Polytechnic Alumni Portal
          </p>

          {/* Lead Developer */}
          <div className="mb-12">
            <h2 className="text-2xl font-semibold mb-6 border-b border-border pb-2">
              Lead Developer
            </h2>
            <Card className="max-w-3xl mx-auto overflow-hidden">
              <div className="md:flex">
                <div className="md:w-1/3 bg-muted p-6 flex flex-col items-center justify-center">
                  <Avatar className="h-32 w-32 mb-4">
                    <AvatarFallback className="bg-primary text-primary-foreground text-4xl">
                      {leadDeveloper.avatar}
                    </AvatarFallback>
                  </Avatar>
                  <h3 className="text-xl font-semibold text-center">
                    {leadDeveloper.name}
                  </h3>
                  <p className="text-primary text-sm mb-4 text-center">
                    {leadDeveloper.role}
                  </p>
                  <div className="flex space-x-4">
                    <a
                      href={leadDeveloper.links.github}
                      target="_blank"
                      rel="noreferrer"
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      <Github size={20} />
                    </a>
                    <a
                      href={leadDeveloper.links.linkedin}
                      target="_blank"
                      rel="noreferrer"
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      <Linkedin size={20} />
                    </a>
                    <a
                      href={leadDeveloper.links.twitter}
                      target="_blank"
                      rel="noreferrer"
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      <Twitter size={20} />
                    </a>
                  </div>
                </div>
                <div className="md:w-2/3 p-6">
                  <div className="prose dark:prose-invert">
                    <p className="text-lg">{leadDeveloper.bio}</p>
                    <p className="mt-4">
                      Created the GBN Polytechnic Alumni Portal using React,
                      TypeScript, and Tailwind CSS, with a focus on providing a
                      seamless experience for alumni to connect, share
                      opportunities, and stay updated with campus news.
                    </p>
                    <p className="mt-4">
                      Implemented features like user authentication, member
                      profiles, job board, news updates, event management, and a
                      customizable theme system.
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Contributing Developers */}
          <div>
            <h2 className="text-2xl font-semibold mb-6 border-b border-border pb-2">
              Contributing Developers
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {contributingDevelopers.map((dev, index) => (
                <Card key={index} className="overflow-hidden h-full">
                  <CardContent className="p-6 flex flex-col items-center">
                    <Avatar className="h-20 w-20 mb-4">
                      <AvatarFallback className="bg-secondary text-secondary-foreground text-xl">
                        {dev.avatar}
                      </AvatarFallback>
                    </Avatar>
                    <h3 className="text-lg font-semibold text-center">
                      {dev.name}
                    </h3>
                    <p className="text-primary text-sm mb-3 text-center">
                      {dev.role}
                    </p>
                    <p className="text-muted-foreground text-center text-sm">
                      {dev.bio}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Developers;
