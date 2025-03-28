
import React from "react";
import { Button } from "@/components/ui/button";

const Hero = () => {
  return (
    <div className="relative bg-[#0a2463] text-white">
      <div 
        className="absolute inset-0 bg-black opacity-40"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1496307653780-42ee777d4833?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          mixBlendMode: "overlay"
        }}
      ></div>
      <div className="container mx-auto px-4 py-16 md:py-24 relative z-10">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Welcome to the GBN Polytechnic Alumni Network
          </h1>
          <p className="text-xl mb-8 text-gray-200">
            Connecting generations of excellence, fostering lifelong relationships, and promoting the legacy of our institution.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button className="bg-[#e6c200] hover:bg-[#d4b400] text-[#0a2463] font-semibold">
              Join the Network
            </Button>
            <Button variant="outline" className="border-white text-white hover:bg-white hover:text-[#0a2463]">
              Explore Alumni Stories
            </Button>
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-slate-50 to-transparent"></div>
    </div>
  );
};

export default Hero;
