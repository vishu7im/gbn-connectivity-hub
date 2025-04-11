
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const About = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow bg-gray-50 dark:bg-gray-900">
        {/* Hero Section */}
        <div className="bg-blue-900 dark:bg-blue-950 text-white py-16">
          <div className="container mx-auto px-4 max-w-6xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">About GBN Alumni Association</h1>
            <p className="text-xl text-blue-100">Connecting generations of GBN Polytechnic graduates</p>
          </div>
        </div>
        
        {/* Main Content */}
        <div className="container mx-auto px-4 py-12 max-w-6xl">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 mb-12">
            <h2 className="text-3xl font-bold mb-6 text-blue-900 dark:text-blue-400">Our History</h2>
            <p className="text-lg mb-6">
              GBN Govt. Polytechnic Nilokheri has a rich history dating back to its establishment. The institution has been a cornerstone for technical education in the region, producing countless skilled professionals who have gone on to make significant contributions in various fields.
            </p>
            <p className="text-lg mb-6">
              The Alumni Association was formed with the vision to create a bridge between past students and their alma mater. Over the years, we have grown from a small group of dedicated alumni to a vast network spanning across industries and geographical boundaries.
            </p>
            <p className="text-lg">
              Today, our alumni network includes professionals in engineering, management, education, civil services, and entrepreneurs who are leaders in their respective domains.
            </p>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 mb-12">
            <h2 className="text-3xl font-bold mb-6 text-blue-900 dark:text-blue-400">Our Mission</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="rounded-lg bg-blue-50 dark:bg-gray-700 p-6">
                <h3 className="text-xl font-semibold mb-3 text-blue-700 dark:text-blue-300">Connect</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  Build a strong network of alumni across generations, facilitating professional connections and lifelong friendships.
                </p>
              </div>
              <div className="rounded-lg bg-blue-50 dark:bg-gray-700 p-6">
                <h3 className="text-xl font-semibold mb-3 text-blue-700 dark:text-blue-300">Support</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  Provide mentorship, career guidance, and resources to current students and recent graduates as they navigate their professional journeys.
                </p>
              </div>
              <div className="rounded-lg bg-blue-50 dark:bg-gray-700 p-6">
                <h3 className="text-xl font-semibold mb-3 text-blue-700 dark:text-blue-300">Contribute</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  Create opportunities for alumni to give back to the institution through knowledge sharing, infrastructure development, and scholarship programs.
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 mb-12">
            <h2 className="text-3xl font-bold mb-6 text-blue-900 dark:text-blue-400">Our Activities</h2>
            <ul className="list-disc pl-8 space-y-4 text-lg text-gray-700 dark:text-gray-300">
              <li>Annual Alumni Meet - A yearly gathering of alumni to reconnect and reminisce</li>
              <li>Technical Seminars - Knowledge-sharing sessions by successful alumni</li>
              <li>Career Counseling - Guidance sessions for current students</li>
              <li>Industry Visits - Facilitating exposure to professional environments</li>
              <li>Scholarship Programs - Financial assistance for deserving students</li>
              <li>Alumni Awards - Recognizing exceptional achievements of our graduates</li>
              <li>Community Service - Social initiatives that make a positive impact</li>
            </ul>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8">
            <h2 className="text-3xl font-bold mb-6 text-blue-900 dark:text-blue-400">Join Us</h2>
            <p className="text-lg mb-6">
              We invite all alumni of GBN Govt. Polytechnic Nilokheri to join our association and be a part of this growing network. Your involvement can make a significant difference in shaping the future of our institution and supporting the next generation of professionals.
            </p>
            <div className="text-center">
              <a 
                href="/register" 
                className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition duration-300 transform hover:scale-105"
              >
                Register as an Alumni
              </a>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default About;
