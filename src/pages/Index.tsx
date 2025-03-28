
import React from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import NewsSection from "@/components/NewsSection";
import EventsSection from "@/components/EventsSection";
import PrincipalDesk from "@/components/PrincipalDesk";
import AlumniSpotlight from "@/components/AlumniSpotlight";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      <main>
        <Hero />
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <NewsSection />
            <EventsSection />
          </div>
          <PrincipalDesk />
          <AlumniSpotlight />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
