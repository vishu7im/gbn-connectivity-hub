
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const Hero = () => {
  return (
    <div className="relative">
      {/* Hero section */}
      <div className="bg-gradient-to-r from-blue-900 to-indigo-800 dark:from-gray-900 dark:to-blue-900 text-white py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col items-center text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">
              Welcome to GBN Alumni Association
            </h1>
            <p className="text-lg md:text-xl max-w-3xl mb-8 leading-relaxed text-gray-200 dark:text-gray-300">
              A registered body of the Alumni members of GBN Govt. Polytechnic Nilokheri where you connect with fellow members and experience the growing spirit of our institute.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button size="lg" asChild>
                <Link to="/register">Join the Network</Link>
              </Button>
              <Button variant="outline" size="lg" asChild className="bg-white/10 hover:bg-white/20 border-white">
                <Link to="/about">Learn More</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* About section */}
      <div className="py-16 px-4 bg-gradient-to-b from-white to-gray-100 dark:from-gray-900 dark:to-gray-800">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">About Us</h2>
            <div className="w-20 h-1 bg-blue-600 dark:bg-blue-500 mx-auto rounded-full"></div>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <p className="text-lg mb-6 leading-relaxed">
              As an alumnus of Guru BrahmaNand Ji Govt. Polytechnic Nilokheri, you are a part of a legacy that spans decades. Our college has produced countless successful professionals.
            </p>
            <p className="text-lg mb-6 leading-relaxed">
              The Alumni Association was established to strengthen ties between alumni and the institution.
            </p>
            <p className="text-lg mb-6 leading-relaxed">
              Through this platform, we aim to:
            </p>
            <ul className="list-disc list-inside text-lg mb-8 space-y-2 pl-4">
              <li>Connect alumni with each other and the college</li>
              <li>Share experiences and professional growth</li>
              <li>Host networking events, expert talks, and reunions</li>
              <li>Encourage alumni to contribute through mentorship and support</li>
            </ul>
            <p className="text-lg font-semibold">
              We invite all alumni to be active members and help shape the future of GBN Polytechnic.
            </p>
          </div>
        </div>
      </div>

      {/* Principal's Message */}
      <div className="py-16 px-4 bg-white dark:bg-gray-900">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Principal's Message</h2>
            <div className="w-20 h-1 bg-blue-600 dark:bg-blue-500 mx-auto rounded-full"></div>
          </div>
          
          <Card className="dark:shadow-xl dark:shadow-blue-900/5 border dark:border-gray-800 overflow-hidden">
            <CardContent className="p-8">
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="w-full md:w-1/4 flex justify-center">
                  <div className="rounded-full overflow-hidden w-48 h-48 border-4 border-gray-200 dark:border-gray-700 shadow-lg">
                    <img 
                      src="https://via.placeholder.com/300" 
                      alt="Principal" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <div className="w-full md:w-3/4">
                  <h3 className="text-2xl font-bold mb-2">Sh. Jwala Prasad</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-6">Principal, GBN Govt. Polytechnic Nilokheri</p>
                  
                  <div className="text-lg space-y-4 italic text-gray-700 dark:text-gray-300">
                    <p>
                      I feel ecstatic and proud to write the inaugural message for the 'Alumni Website'. Our alumni are ambassadors of our institute and continue to make us proud with their success stories.
                    </p>
                    <p>
                      I express heartfelt gratitude to all of you who've excelled in professional and personal domains. Your legacy and achievements are inspiring, and I urge you to stay connected.
                    </p>
                    <p>
                      This platform is designed to keep you updated, share your stories, and relive memories. We also encourage you to deliver lectures, offer technical mentorship, or financial support.
                    </p>
                    <p>
                      Stay connected. Stay involved.
                    </p>
                    <p className="font-semibold not-italic">
                      Best regards,<br />
                      Sh. Jwala Prasad
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Hero;
