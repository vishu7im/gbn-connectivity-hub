import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { GraduationCap, Briefcase, Clock, MapPin, Mail, Phone, Linkedin, Facebook, ChevronLeft, MessageSquare, ThumbsUp, Share2 } from "lucide-react";

// Extended sample alumni data with more information and posts
const alumniData = [
  { 
    id: 1, 
    name: "Rajiv Kumar", 
    batch: "2018", 
    department: "Computer Science", 
    currentRole: "Software Engineer", 
    company: "TCS",
    email: "rajiv.kumar@example.com",
    phone: "+91 9876543210",
    location: "Bangalore, India",
    linkedin: "linkedin.com/in/rajiv-kumar",
    facebook: "facebook.com/rajiv.kumar",
    bio: "I am a passionate software engineer with expertise in full-stack development. My journey at GBN Polytechnic laid the foundation for my career in technology.",
    achievements: ["Microsoft Certified Professional", "Best Employee Award 2021", "5+ years of experience in software development"],
    profileImage: "",
    posts: [
      {
        id: 101,
        content: "Just completed a major project using React and Node.js. So excited about the results!",
        date: "2023-08-15",
        likes: 24,
        comments: 5
      },
      {
        id: 102,
        content: "Grateful for the education I received at GBN Polytechnic. It's been the foundation of my career success. #ThrowbackThursday",
        date: "2023-07-20",
        likes: 45,
        comments: 12
      }
    ]
  },
  { 
    id: 2, 
    name: "Priya Singh", 
    batch: "2019", 
    department: "Electrical Engineering", 
    currentRole: "Electrical Engineer", 
    company: "BHEL",
    email: "priya.singh@example.com",
    phone: "+91 9876543211",
    location: "Delhi, India",
    linkedin: "linkedin.com/in/priya-singh",
    facebook: "facebook.com/priya.singh",
    bio: "Electrical engineer specializing in power systems and renewable energy solutions. I'm dedicated to creating sustainable energy solutions for a better tomorrow.",
    achievements: ["Certified Energy Manager", "Published research on solar energy systems", "Speaker at National Energy Conference 2022"],
    profileImage: "",
    posts: [
      {
        id: 201,
        content: "Just finished conducting a workshop on renewable energy solutions at my alma mater. So proud to give back to the community!",
        date: "2023-09-05",
        likes: 32,
        comments: 8
      }
    ]
  },
  { id: 3, name: "Amit Sharma", batch: "2017", department: "Mechanical Engineering", currentRole: "Product Manager", company: "Maruti Suzuki", email: "amit.sharma@example.com", phone: "+91 9876543212", location: "Gurgaon, India", linkedin: "linkedin.com/in/amit-sharma", facebook: "facebook.com/amit.sharma", bio: "Mechanical engineer turned product manager with a passion for automotive innovation. I leverage my technical background to create user-centric product solutions.", achievements: ["Six Sigma Black Belt", "Product Management Certification", "Led 3 successful product launches"], profileImage: "", posts: [{ id: 301, content: "Excited to announce our new vehicle model launching next month. It's been an incredible journey developing this product!", date: "2023-10-10", likes: 67, comments: 15 }] },
  { id: 4, name: "Neha Gupta", batch: "2020", department: "Civil Engineering", currentRole: "Site Engineer", company: "L&T", email: "neha.gupta@example.com", phone: "+91 9876543213", location: "Mumbai, India", linkedin: "linkedin.com/in/neha-gupta", facebook: "facebook.com/neha.gupta", bio: "Recent civil engineering graduate passionate about sustainable construction practices. Currently working on major infrastructure projects across western India.", achievements: ["University Gold Medalist", "LEED Green Associate", "Published paper on sustainable construction"], profileImage: "", posts: [{ id: 401, content: "First day at the new construction site! Excited to be part of this massive infrastructure project.", date: "2023-06-15", likes: 42, comments: 8 }] },
  { id: 5, name: "Vikram Patel", batch: "2018", department: "Electronics", currentRole: "Hardware Engineer", company: "Samsung", email: "vikram.patel@example.com", phone: "+91 9876543214", location: "Noida, India", linkedin: "linkedin.com/in/vikram-patel", facebook: "facebook.com/vikram.patel", bio: "Electronics engineer specializing in consumer electronics hardware design. Passionate about creating innovative and user-friendly electronic products.", achievements: ["Patent holder for power-saving circuit design", "Samsung Innovation Award 2022", "Mentor for electronics startups"], profileImage: "", posts: [{ id: 501, content: "Just got my patent approved for the new power-saving circuit design! Years of hard work finally paid off.", date: "2023-09-20", likes: 89, comments: 23 }] },
  { id: 6, name: "Sunita Mishra", batch: "2016", department: "Computer Science", currentRole: "Tech Lead", company: "Infosys", email: "sunita.mishra@example.com", phone: "+91 9876543215", location: "Pune, India", linkedin: "linkedin.com/in/sunita-mishra", facebook: "facebook.com/sunita.mishra", bio: "Experienced tech lead with expertise in cloud computing and distributed systems. I enjoy mentoring junior developers and building scalable solutions.", achievements: ["AWS Certified Solutions Architect", "Best Team Lead Award 2021", "Speaker at multiple tech conferences"], profileImage: "", posts: [{ id: 601, content: "Proud to share that my team just completed the migration of our entire infrastructure to the cloud. A big milestone for us!", date: "2023-08-05", likes: 56, comments: 12 }] },
  { id: 7, name: "Arun Joshi", batch: "2019", department: "Mechanical Engineering", currentRole: "Design Engineer", company: "Tata Motors", email: "arun.joshi@example.com", phone: "+91 9876543216", location: "Pune, India", linkedin: "linkedin.com/in/arun-joshi", facebook: "facebook.com/arun.joshi", bio: "Mechanical design engineer with a focus on automotive components. I'm passionate about creating efficient and sustainable vehicle designs.", achievements: ["CAD Design Excellence Award", "Published research on lightweight materials", "Contributed to 2 major vehicle launches"], profileImage: "", posts: [{ id: 701, content: "Visited my alma mater today to give a talk on careers in automotive design. So nostalgic to be back at GBN Polytechnic!", date: "2023-07-12", likes: 38, comments: 9 }] },
  { id: 8, name: "Meera Reddy", batch: "2017", department: "Civil Engineering", currentRole: "Project Manager", company: "DLF", email: "meera.reddy@example.com", phone: "+91 9876543217", location: "Hyderabad, India", linkedin: "linkedin.com/in/meera-reddy", facebook: "facebook.com/meera.reddy", bio: "Civil engineer with expertise in residential and commercial construction. Now managing large-scale real estate development projects across South India.", achievements: ["PMP Certified", "Best Project Delivery Award 2022", "Completed 5 major projects ahead of schedule"], profileImage: "", posts: [{ id: 801, content: "Happy to announce that our latest residential project has been awarded the Green Building certification. Sustainability is the future!", date: "2023-10-02", likes: 72, comments: 18 }] },
  { id: 9, name: "Sanjay Kapoor", batch: "2020", department: "Electrical Engineering", currentRole: "Power Systems Engineer", company: "NTPC", email: "sanjay.kapoor@example.com", phone: "+91 9876543218", location: "Delhi, India", linkedin: "linkedin.com/in/sanjay-kapoor", facebook: "facebook.com/sanjay.kapoor", bio: "Recent graduate working on power generation and distribution systems. Interested in renewable energy integration with conventional power grids.", achievements: ["Energy Conservation Award", "Published paper on grid stability", "Certified Power Systems Engineer"], profileImage: "", posts: [{ id: 901, content: "Just completed my first major project at NTPC. Learned so much about large-scale power distribution systems!", date: "2023-05-25", likes: 29, comments: 7 }] },
  { id: 10, name: "Anjali Desai", batch: "2018", department: "Electronics", currentRole: "IoT Specialist", company: "Wipro", email: "anjali.desai@example.com", phone: "+91 9876543219", location: "Bangalore, India", linkedin: "linkedin.com/in/anjali-desai", facebook: "facebook.com/anjali.desai", bio: "Electronics engineer specializing in IoT solutions. I work on creating connected device ecosystems for smart homes and industrial applications.", achievements: ["IoT Innovation Challenge Winner", "Speaker at IoT World Congress", "Led development of 3 major IoT platforms"], profileImage: "", posts: [{ id: 1001, content: "Excited to be speaking at the upcoming IoT conference in Bangalore. Will be sharing insights on our latest smart home solution!", date: "2023-09-15", likes: 48, comments: 11 }] },
  { id: 11, name: "Rahul Verma", batch: "2016", department: "Computer Science", currentRole: "Data Scientist", company: "Amazon", email: "rahul.verma@example.com", phone: "+91 9876543220", location: "Bangalore, India", linkedin: "linkedin.com/in/rahul-verma", facebook: "facebook.com/rahul.verma", bio: "Data scientist with expertise in machine learning and AI. I work on developing algorithms that power recommendation systems and predictive analytics.", achievements: ["Kaggle Competition Gold Medal", "Published research on NLP", "Developed ML models used by millions"], profileImage: "", posts: [{ id: 1101, content: "Just published my research paper on advanced NLP techniques in the International Journal of AI. Proud moment!", date: "2023-08-28", likes: 93, comments: 27 }] },
  { id: 12, name: "Kavita Malhotra", batch: "2019", department: "Civil Engineering", currentRole: "Structural Engineer", company: "Shapoorji Pallonji", email: "kavita.malhotra@example.com", phone: "+91 9876543221", location: "Mumbai, India", linkedin: "linkedin.com/in/kavita-malhotra", facebook: "facebook.com/kavita.malhotra", bio: "Structural engineer focused on designing earthquake-resistant buildings. I'm passionate about creating safe and sustainable structures.", achievements: ["Young Engineer Award", "Certified Structural Engineer", "Contributed to design of 10+ high-rise buildings"], profileImage: "", posts: [{ id: 1201, content: "Visited the construction site of my first major structural design project. Amazing to see my calculations and drawings come to life!", date: "2023-07-30", likes: 61, comments: 14 }] }
];

const MemberView = () => {
  const { id } = useParams<{ id: string }>();
  const [alumni, setAlumni] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In a real app, this would be an API call
    const selectedAlumni = alumniData.find(a => a.id === Number(id));
    if (selectedAlumni) {
      setAlumni(selectedAlumni);
    }
    setLoading(false);
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col">
        <Header />
        <main className="flex-grow container mx-auto px-4 py-8">
          <div className="flex justify-center items-center h-[60vh]">
            <div className="text-xl">Loading...</div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!alumni) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col">
        <Header />
        <main className="flex-grow container mx-auto px-4 py-8">
          <div className="flex flex-col justify-center items-center h-[60vh]">
            <div className="text-xl mb-4">Alumni not found</div>
            <Link to="/members">
              <Button variant="outline">Go back to members</Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase();
  };

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Header />
      <main className="flex-grow">
        <div className="bg-[#0a2463] text-white py-8">
          <div className="container mx-auto px-4">
            <Link to="/members" className="inline-flex items-center text-white hover:text-[#e6c200] transition-colors">
              <ChevronLeft size={20} />
              <span>Back to Members</span>
            </Link>
            <h1 className="text-3xl md:text-4xl font-bold mt-4">{alumni.name}</h1>
            <div className="flex flex-wrap items-center gap-3 mt-2">
              <Badge className="bg-[#e6c200] hover:bg-[#e6c200]/80">
                <GraduationCap className="mr-1 h-3 w-3" />
                Batch {alumni.batch}
              </Badge>
              <Badge variant="outline" className="text-white border-white">
                {alumni.department}
              </Badge>
            </div>
          </div>
        </div>
        
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left column - Profile Details */}
            <div className="lg:col-span-1">
              <Card>
                <CardHeader className="flex flex-col items-center text-center">
                  <Avatar className="h-24 w-24 mb-4">
                    {alumni.profileImage ? (
                      <AvatarImage src={alumni.profileImage} alt={alumni.name} />
                    ) : (
                      <AvatarFallback className="bg-[#0a2463] text-white text-xl">
                        {getInitials(alumni.name)}
                      </AvatarFallback>
                    )}
                  </Avatar>
                  <CardTitle>{alumni.name}</CardTitle>
                  <CardDescription className="text-base font-medium mt-1">
                    {alumni.currentRole} at {alumni.company}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-lg font-semibold mb-2">Bio</h3>
                      <p className="text-gray-600">{alumni.bio}</p>
                    </div>
                    
                    <Separator />
                    
                    <div>
                      <h3 className="text-lg font-semibold mb-2">Contact Information</h3>
                      <ul className="space-y-2">
                        <li className="flex items-center gap-2">
                          <Mail size={16} className="text-gray-500" />
                          <span>{alumni.email}</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <Phone size={16} className="text-gray-500" />
                          <span>{alumni.phone}</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <MapPin size={16} className="text-gray-500" />
                          <span>{alumni.location}</span>
                        </li>
                      </ul>
                    </div>
                    
                    <Separator />
                    
                    <div>
                      <h3 className="text-lg font-semibold mb-2">Social Media</h3>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm" asChild>
                          <a href={`https://${alumni.linkedin}`} target="_blank" rel="noopener noreferrer">
                            <Linkedin size={16} />
                            <span className="ml-1">LinkedIn</span>
                          </a>
                        </Button>
                        <Button variant="outline" size="sm" asChild>
                          <a href={`https://${alumni.facebook}`} target="_blank" rel="noopener noreferrer">
                            <Facebook size={16} />
                            <span className="ml-1">Facebook</span>
                          </a>
                        </Button>
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div>
                      <h3 className="text-lg font-semibold mb-2">Education</h3>
                      <div className="flex items-start gap-2">
                        <GraduationCap size={18} className="text-[#e6c200] mt-0.5" />
                        <div>
                          <p className="font-medium">GBN Polytechnic</p>
                          <p className="text-sm text-gray-600">{alumni.department}</p>
                          <p className="text-sm text-gray-600">Batch of {alumni.batch}</p>
                        </div>
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div>
                      <h3 className="text-lg font-semibold mb-2">Current Position</h3>
                      <div className="flex items-start gap-2">
                        <Briefcase size={18} className="text-[#0a2463] mt-0.5" />
                        <div>
                          <p className="font-medium">{alumni.currentRole}</p>
                          <p className="text-sm text-gray-600">{alumni.company}</p>
                        </div>
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div>
                      <h3 className="text-lg font-semibold mb-2">Achievements</h3>
                      <ul className="list-disc list-inside space-y-1 text-gray-600">
                        {alumni.achievements.map((achievement: string, index: number) => (
                          <li key={index}>{achievement}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {/* Right column - Posts and Activities */}
            <div className="lg:col-span-2">
              <Tabs defaultValue="posts">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="posts">Posts</TabsTrigger>
                  <TabsTrigger value="activities">Activities</TabsTrigger>
                </TabsList>
                
                <TabsContent value="posts" className="mt-4">
                  <h2 className="text-2xl font-bold mb-4">Recent Posts</h2>
                  
                  {alumni.posts.length > 0 ? (
                    <div className="space-y-4">
                      {alumni.posts.map((post: any) => (
                        <Card key={post.id}>
                          <CardContent className="pt-6">
                            <div className="flex items-start gap-3 mb-4">
                              <Avatar>
                                <AvatarFallback className="bg-[#0a2463] text-white">
                                  {getInitials(alumni.name)}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <h3 className="font-semibold">{alumni.name}</h3>
                                <div className="flex items-center text-gray-500 text-sm">
                                  <Clock size={14} className="mr-1" />
                                  <span>{formatDate(post.date)}</span>
                                </div>
                              </div>
                            </div>
                            
                            <p className="mb-4">{post.content}</p>
                            
                            <div className="flex justify-between items-center text-sm text-gray-500">
                              <div className="flex items-center gap-4">
                                <button className="flex items-center gap-1 hover:text-blue-600 transition-colors">
                                  <ThumbsUp size={16} />
                                  <span>{post.likes} Likes</span>
                                </button>
                                <button className="flex items-center gap-1 hover:text-blue-600 transition-colors">
                                  <MessageSquare size={16} />
                                  <span>{post.comments} Comments</span>
                                </button>
                              </div>
                              <button className="flex items-center gap-1 hover:text-blue-600 transition-colors">
                                <Share2 size={16} />
                                <span>Share</span>
                              </button>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  ) : (
                    <Card>
                      <CardContent className="py-8 text-center text-gray-500">
                        <p>No posts to display</p>
                      </CardContent>
                    </Card>
                  )}
                </TabsContent>
                
                <TabsContent value="activities" className="mt-4">
                  <h2 className="text-2xl font-bold mb-4">Recent Activities</h2>
                  <Card>
                    <CardContent className="py-8 text-center text-gray-500">
                      <p>No recent activities to display</p>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default MemberView;
