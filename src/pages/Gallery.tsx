
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Loader2, Image } from 'lucide-react';

interface GalleryImage {
  id: number;
  title: string | null;
  description: string | null;
  image_path: string;
  user_id: number;
  uploaded_by: string;
  created_at: string;
}

const API_URL = "http://localhost:5000/api";

const Gallery = () => {
  // Get all gallery images
  const { data: images, isLoading, error } = useQuery({
    queryKey: ['galleryImages'],
    queryFn: async () => {
      const response = await axios.get<GalleryImage[]>(`${API_URL}/gallery`);
      return response.data;
    }
  });

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-1 container max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">Alumni Gallery</h1>
        
        <div className="bg-accent/20 p-6 rounded-lg mb-8">
          <p className="text-lg">
            Explore moments captured during alumni events, reunions, and celebrations.
          </p>
        </div>
        
        {isLoading ? (
          <div className="flex justify-center py-12">
            <Loader2 className="h-10 w-10 animate-spin text-primary" />
          </div>
        ) : error ? (
          <div className="bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-800 rounded-lg p-8 text-center">
            <p className="text-red-600 dark:text-red-400 text-lg">Failed to load gallery images</p>
            <p className="text-gray-600 dark:text-gray-400 mt-2">Please try again later</p>
          </div>
        ) : !images || images.length === 0 ? (
          <div className="bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-lg p-12 text-center">
            <Image className="h-16 w-16 mx-auto text-gray-400 mb-4" />
            <h3 className="text-xl font-medium">No images yet</h3>
            <p className="text-gray-500 dark:text-gray-400 mt-2 max-w-md mx-auto">
              Check back soon for photos from our alumni events and activities.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {images.map((image) => (
              <Card 
                key={image.id} 
                className="overflow-hidden group hover:shadow-lg transition-shadow"
              >
                <div className="h-64 overflow-hidden">
                  <img
                    src={`${API_URL}${image.image_path}`}
                    alt={image.title || 'Gallery image'}
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                {(image.title || image.description) && (
                  <CardContent className="p-4">
                    {image.title && <h3 className="font-semibold">{image.title}</h3>}
                    {image.description && (
                      <p className="text-gray-600 dark:text-gray-300 mt-1 text-sm">
                        {image.description}
                      </p>
                    )}
                  </CardContent>
                )}
              </Card>
            ))}
          </div>
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default Gallery;
