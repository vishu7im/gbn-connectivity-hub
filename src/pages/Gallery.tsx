
import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Mock gallery data
const galleryData = {
  events: [
    { id: 1, title: "Annual Alumni Meet 2023", image: "https://images.unsplash.com/photo-1511578314322-379afb476865?w=800&auto=format&fit=crop&q=60", description: "Alumni from various batches gathered for the annual meet" },
    { id: 2, title: "Tech Symposium", image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&auto=format&fit=crop&q=60", description: "Industry experts sharing knowledge with students" },
    { id: 3, title: "Campus Fest", image: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=800&auto=format&fit=crop&q=60", description: "Cultural performances by students" },
  ],
  campus: [
    { id: 1, title: "Main Building", image: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=800&auto=format&fit=crop&q=60", description: "The iconic main academic building" },
    { id: 2, title: "Library", image: "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?w=800&auto=format&fit=crop&q=60", description: "Our state-of-the-art library" },
    { id: 3, title: "Labs", image: "https://images.unsplash.com/photo-1562774053-701939374585?w=800&auto=format&fit=crop&q=60", description: "Modern laboratories for practical learning" },
  ],
  achievements: [
    { id: 1, title: "National Science Fair Winner", image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&auto=format&fit=crop&q=60", description: "Our students won first place" },
    { id: 2, title: "Sports Championship", image: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=800&auto=format&fit=crop&q=60", description: "Annual inter-college sports trophy" },
  ],
};

const Gallery = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Header />
      <main className="flex-grow py-8 md:py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Photo Gallery</h1>
          <p className="text-muted-foreground mb-8">Explore memorable moments from our institution's journey</p>
          
          <Tabs defaultValue="events" className="mb-8">
            <TabsList className="mb-6">
              <TabsTrigger value="events">Events</TabsTrigger>
              <TabsTrigger value="campus">Campus</TabsTrigger>
              <TabsTrigger value="achievements">Achievements</TabsTrigger>
            </TabsList>
            
            {Object.entries(galleryData).map(([category, images]) => (
              <TabsContent key={category} value={category}>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {images.map(image => (
                    <Card key={image.id} className="overflow-hidden hover:shadow-md transition-shadow">
                      <div className="aspect-video relative overflow-hidden">
                        <img 
                          src={image.image} 
                          alt={image.title}
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" 
                        />
                      </div>
                      <CardContent className="p-4">
                        <h3 className="font-semibold text-lg">{image.title}</h3>
                        <p className="text-muted-foreground text-sm mt-1">{image.description}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Gallery;
