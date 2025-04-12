
import React, { useState } from "react";
import Header from "@/components/Header";
import HomeCarousel from "@/components/HomeCarousel";
import NewsSection from "@/components/NewsSection";
import EventsSection from "@/components/EventsSection";
import PrincipalDesk from "@/components/PrincipalDesk";
import AlumniSpotlight from "@/components/AlumniSpotlight";
import Footer from "@/components/Footer";

// Demo carousel images
const demoCarouselImages = [
  {
    id: '1',
    url: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80',
    title: 'Welcome to GBN Polytechnic',
    description: 'Shaping futures through quality technical education since 1980'
  },
  {
    id: '2',
    url: 'https://images.unsplash.com/photo-1562774053-701939374585?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80',
    title: 'State-of-the-Art Campus',
    description: 'Modern facilities to provide the best learning environment'
  },
  {
    id: '3',
    url: 'https://images.unsplash.com/photo-1523580494863-6f3031224c94?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80',
    title: 'Alumni Success Stories',
    description: 'Our graduates are making a difference across industries worldwide'
  }
];

const Index = () => {
  const [carouselImages] = useState(demoCarouselImages);

  return (
    <div className="min-h-screen text-primary-foreground">
      <Header />
      <main>
        <section className="w-full">
          <HomeCarousel images={carouselImages} />
        </section>
        <div className="container mx-auto px-4 py-8">
          <PrincipalDesk />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
            <NewsSection />
            <EventsSection />
          </div>
          <AlumniSpotlight />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
