
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Users, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const AlumniSpotlight = () => {
  const [activeIndex, setActiveIndex] = React.useState(0);
  
  const alumni = [
    {
      id: 1,
      name: "Priya Malhotra",
      batch: "2010",
      profession: "Senior Software Engineer at Google",
      achievement: "Led the development of Google Maps features used by millions",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 2,
      name: "Arjun Singh",
      batch: "2005",
      profession: "Founder & CEO, EcoTech Solutions",
      achievement: "Pioneered affordable solar solutions for rural communities",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 3,
      name: "Neha Kapoor",
      batch: "2012",
      profession: "Research Scientist, Space Research Organization",
      achievement: "Key contributor to India's Mars Orbiter Mission",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 4,
      name: "Vikram Desai",
      batch: "2008",
      profession: "Chief Architect, Urban Development Authority",
      achievement: "Designed award-winning sustainable public spaces",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    }
  ];

  const nextSlide = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % alumni.length);
  };

  const prevSlide = () => {
    setActiveIndex((prevIndex) => (prevIndex - 1 + alumni.length) % alumni.length);
  };

  return (
    <section id="alumni" className="py-12">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Users className="h-6 w-6 text-[#0a2463]" />
          <h2 className="text-2xl font-bold text-[#0a2463]">Alumni Spotlight</h2>
        </div>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            size="icon" 
            onClick={prevSlide}
            className="rounded-full border-[#0a2463] text-[#0a2463] hover:bg-[#0a2463] hover:text-white"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button 
            variant="outline" 
            size="icon" 
            onClick={nextSlide}
            className="rounded-full border-[#0a2463] text-[#0a2463] hover:bg-[#0a2463] hover:text-white"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      <Card className="overflow-hidden bg-gradient-to-r from-[#0a2463] to-[#1e3a8a]">
        <CardContent className="p-0">
          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/2 h-64 md:h-auto relative">
              <img 
                src={alumni[activeIndex].image} 
                alt={alumni[activeIndex].name}
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent py-4 px-6 md:hidden">
                <h3 className="text-xl font-bold text-white">{alumni[activeIndex].name}</h3>
                <p className="text-gray-200">Batch of {alumni[activeIndex].batch}</p>
              </div>
            </div>
            
            <div className="md:w-1/2 p-6 md:p-8 text-white">
              <div className="hidden md:block">
                <h3 className="text-2xl font-bold">{alumni[activeIndex].name}</h3>
                <p className="text-gray-200 mb-4">Batch of {alumni[activeIndex].batch}</p>
              </div>
              
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-[#e6c200] mb-1">Current Role</h4>
                  <p>{alumni[activeIndex].profession}</p>
                </div>
                
                <div>
                  <h4 className="font-semibold text-[#e6c200] mb-1">Notable Achievement</h4>
                  <p>{alumni[activeIndex].achievement}</p>
                </div>
                
                <div>
                  <h4 className="font-semibold text-[#e6c200] mb-1">Journey After GBN</h4>
                  <p>
                    After graduating from GBN Polytechnic, {alumni[activeIndex].name.split(' ')[0]} pursued further education and built a remarkable career through dedication and the strong foundation provided by our institution.
                  </p>
                </div>
                
                <Button variant="outline" className="mt-2 border-white text-white hover:bg-white hover:text-[#0a2463]">
                  Read Full Story
                </Button>
              </div>
              
              <div className="flex mt-6 space-x-2">
                {alumni.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveIndex(index)}
                    className={`w-3 h-3 rounded-full ${
                      index === activeIndex ? "bg-[#e6c200]" : "bg-white/30"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  );
};

export default AlumniSpotlight;
