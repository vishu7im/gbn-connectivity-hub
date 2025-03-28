
import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, MapPin, Clock, Users, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const EventsSection = () => {
  const events = [
    {
      id: 1,
      title: "Annual Alumni Meet 2023",
      date: "July 15, 2023",
      time: "10:00 AM - 4:00 PM",
      location: "GBN Polytechnic Main Auditorium",
      attendees: 120
    },
    {
      id: 2,
      title: "Career Guidance Workshop",
      date: "August 5, 2023",
      time: "2:00 PM - 5:00 PM",
      location: "Online (Zoom)",
      attendees: 85
    },
    {
      id: 3,
      title: "Industry-Academia Partnership Seminar",
      date: "August 20, 2023",
      time: "11:00 AM - 1:00 PM",
      location: "GBN Polytechnic Conference Hall",
      attendees: 50
    }
  ];

  return (
    <section id="events" className="py-8">
      <div className="flex items-center gap-2 mb-6">
        <Calendar className="h-6 w-6 text-[#0a2463]" />
        <h2 className="text-2xl font-bold text-[#0a2463]">Upcoming Events</h2>
      </div>
      
      <div className="space-y-4">
        {events.map((event) => (
          <Card key={event.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">{event.title}</CardTitle>
              <CardDescription className="flex items-center gap-1">
                <Calendar className="h-3 w-3" /> {event.date}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-gray-500" />
                  <span>{event.time}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-gray-500" />
                  <span>{event.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-gray-500" />
                  <span>{event.attendees} attending</span>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="ghost" className="text-[#0a2463] p-0 hover:text-[#e6c200]">
                View details <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
      
      <div className="mt-6 text-center">
        <Button variant="outline" className="border-[#0a2463] text-[#0a2463] hover:bg-[#0a2463] hover:text-white">
          View All Events
        </Button>
      </div>
    </section>
  );
};

export default EventsSection;
