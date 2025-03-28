
import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Newspaper, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const NewsSection = () => {
  const newsItems = [
    {
      id: 1,
      title: "Annual Alumni Reunion Announced",
      date: "June 15, 2023",
      description: "Mark your calendars for the biggest alumni gathering of the year. This year's theme is 'Innovation and Tradition'.",
      category: "Announcement"
    },
    {
      id: 2,
      title: "Alumni Achievement: Dr. Patel Receives National Award",
      date: "May 28, 2023",
      description: "Our distinguished alumnus Dr. Rahul Patel (Batch of 2005) has been recognized with the prestigious National Innovation Award.",
      category: "Achievement"
    },
    {
      id: 3,
      title: "New Scholarship Fund for Underprivileged Students",
      date: "May 10, 2023",
      description: "The Alumni Association has established a new scholarship fund to support academically gifted students from economically challenged backgrounds.",
      category: "Initiative"
    }
  ];

  return (
    <section id="news" className="py-8">
      <div className="flex items-center gap-2 mb-6">
        <Newspaper className="h-6 w-6 text-[#0a2463]" />
        <h2 className="text-2xl font-bold text-[#0a2463]">Latest News</h2>
      </div>
      
      <div className="space-y-4">
        {newsItems.map((item) => (
          <Card key={item.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <CardTitle className="text-lg">{item.title}</CardTitle>
                <Badge variant="outline" className="bg-[#0a2463] text-white hover:bg-[#0a2463]">
                  {item.category}
                </Badge>
              </div>
              <CardDescription>{item.date}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">{item.description}</p>
            </CardContent>
            <CardFooter>
              <Button variant="ghost" className="text-[#0a2463] p-0 hover:text-[#e6c200]">
                Read more <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
      
      <div className="mt-6 text-center">
        <Button variant="outline" className="border-[#0a2463] text-[#0a2463] hover:bg-[#0a2463] hover:text-white">
          View All News
        </Button>
      </div>
    </section>
  );
};

export default NewsSection;
