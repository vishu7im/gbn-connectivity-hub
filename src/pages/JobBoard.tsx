import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { Search, Briefcase, Building, MapPin, Clock, Filter, FilterX } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import ViewToggle from "@/components/ViewToggle";

const jobsData = [
  {
    id: 1,
    title: "Software Engineer",
    company: "TCS",
    location: "Bangalore",
    type: "Full-time",
    category: "Technology",
    salary: "₹8,00,000 - ₹12,00,000 per annum",
    postedBy: "Rajiv Kumar",
    postedDate: "2023-10-15",
    postedById: 1,
    description: "We are looking for a software engineer with expertise in React, Node.js, and database technologies. The ideal candidate will have 2+ years of experience in building web applications.",
    requirements: [
      "Bachelor's degree in Computer Science or related field",
      "2+ years of experience in software development",
      "Proficiency in React, Node.js, and SQL",
      "Good problem-solving skills"
    ],
    applicationLink: "https://example.com/apply"
  },
  {
    id: 2,
    title: "Electrical Engineer",
    company: "BHEL",
    location: "Delhi",
    type: "Full-time",
    category: "Engineering",
    salary: "₹7,50,000 - ₹9,50,000 per annum",
    postedBy: "Priya Singh",
    postedDate: "2023-10-10",
    postedById: 2,
    description: "Looking for an electrical engineer with experience in power systems design. The role involves designing and implementing electrical systems for industrial applications.",
    requirements: [
      "Bachelor's degree in Electrical Engineering",
      "3+ years of experience in power systems",
      "Knowledge of electrical safety standards",
      "Experience with AutoCAD or similar design tools"
    ],
    applicationLink: "https://example.com/apply"
  },
  {
    id: 3,
    title: "Product Manager",
    company: "Wipro",
    location: "Bangalore",
    type: "Full-time",
    category: "Management",
    salary: "₹15,00,000 - ₹20,00,000 per annum",
    postedBy: "Rajiv Kumar",
    postedDate: "2023-10-05",
    postedById: 1,
    description: "We are seeking a product manager to lead the development of our enterprise software products. The ideal candidate will have experience in agile product development methodologies.",
    requirements: [
      "Bachelor's or Master's degree in business or technology field",
      "5+ years of product management experience",
      "Strong leadership and communication skills",
      "Experience in B2B software products"
    ],
    applicationLink: "https://example.com/apply"
  },
  {
    id: 4,
    title: "Data Analyst Intern",
    company: "Infosys",
    location: "Pune",
    type: "Internship",
    category: "Analytics",
    salary: "₹25,000 - ₹30,000 per month",
    postedBy: "Priya Singh",
    postedDate: "2023-10-01",
    postedById: 2,
    description: "6-month internship opportunity for students or recent graduates interested in data analytics. Learn how to work with large datasets and create meaningful visualizations.",
    requirements: [
      "Currently pursuing or recently completed degree in relevant field",
      "Knowledge of SQL and Python",
      "Basic understanding of data visualization",
      "Strong analytical thinking"
    ],
    applicationLink: "https://example.com/apply"
  },
  {
    id: 5,
    title: "Mechanical Design Engineer",
    company: "Maruti Suzuki",
    location: "Gurgaon",
    type: "Full-time",
    category: "Engineering",
    salary: "₹6,00,000 - ₹9,00,000 per annum",
    postedBy: "Rajiv Kumar", 
    postedDate: "2023-09-28",
    postedById: 1,
    description: "Looking for a mechanical design engineer with experience in automotive component design. The role involves designing, testing, and improving mechanical parts for vehicles.",
    requirements: [
      "Bachelor's degree in Mechanical Engineering",
      "2+ years of experience in mechanical design",
      "Proficiency in CAD software",
      "Knowledge of manufacturing processes"
    ],
    applicationLink: "https://example.com/apply"
  }
];

const JobBoard = () => {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedType, setSelectedType] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [viewMode, setViewMode] = useState<"list" | "grid">(() => {
    const savedView = localStorage.getItem("jobsViewMode");
    return (savedView as "list" | "grid") || "list";
  });
  const itemsPerPage = viewMode === "grid" ? 6 : 4;

  useEffect(() => {
    localStorage.setItem("jobsViewMode", viewMode);
  }, [viewMode]);

  const categories = [...new Set(jobsData.map(job => job.category))];
  const jobTypes = [...new Set(jobsData.map(job => job.type))];

  const filteredJobs = jobsData.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          job.company.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          job.location.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = selectedCategory === "all" || job.category === selectedCategory;
    const matchesType = selectedType === "all" || job.type === selectedType;
    
    return matchesSearch && matchesCategory && matchesType;
  });

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentJobs = filteredJobs.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredJobs.length / itemsPerPage);

  const resetFilters = () => {
    setSearchTerm("");
    setSelectedCategory("all");
    setSelectedType("all");
    setCurrentPage(1);
  };

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Header />
      <main className="flex-grow">
        <div className="bg-primary text-primary-foreground py-12">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl md:text-4xl font-bold">Job Opportunities</h1>
            <p className="mt-2 text-primary-foreground/80">Find and post career opportunities for our alumni community</p>
          </div>
        </div>
        
        <div className="container mx-auto px-4 py-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Available Positions</h2>
            <div className="flex items-center gap-4">
              <ViewToggle view={viewMode} onChange={setViewMode} />
              {user?.isAlumni && (
                <Link to="/dashboard/post-job">
                  <Button>
                    <Briefcase className="mr-2 h-4 w-4" />
                    Post a Job
                  </Button>
                </Link>
              )}
            </div>
          </div>
          
          <Card className="mb-8">
            <CardContent className="pt-6">
              <div className="grid gap-6 md:grid-cols-4">
                <div className="col-span-2">
                  <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                    <Input
                      placeholder="Search by title, company or location..."
                      className="pl-9"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                </div>
                
                <div>
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger>
                      <SelectValue placeholder="All Categories" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>{category}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Select value={selectedType} onValueChange={setSelectedType}>
                    <SelectTrigger>
                      <SelectValue placeholder="All Job Types" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Job Types</SelectItem>
                      {jobTypes.map((type) => (
                        <SelectItem key={type} value={type}>{type}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="mt-4 flex justify-end">
                <Button 
                  variant="outline" 
                  onClick={resetFilters}
                  className="text-sm flex items-center"
                >
                  <FilterX className="mr-2 h-4 w-4" />
                  Reset Filters
                </Button>
              </div>
            </CardContent>
          </Card>
          
          {currentJobs.length > 0 ? (
            <div className={viewMode === "grid" ? "grid-layout" : "grid grid-cols-1 gap-6"}>
              {currentJobs.map((job) => (
                <Card key={job.id} className="overflow-hidden h-full">
                  <div className="border-l-4 border-primary h-full flex flex-col">
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-xl font-bold">
                            <Link to={`/jobs/${job.id}`} className="text-primary hover:underline">
                              {job.title}
                            </Link>
                          </CardTitle>
                          <CardDescription className="flex items-center mt-1">
                            <Building className="mr-1 h-4 w-4" />
                            {job.company}
                          </CardDescription>
                        </div>
                        <Badge variant={job.type === "Internship" ? "outline" : "default"} className={job.type === "Internship" ? "border-blue-500 text-blue-500" : ""}>
                          {job.type}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className={`pb-2 ${viewMode === "grid" ? "flex-grow" : ""}`}>
                      <div className="flex flex-wrap gap-y-2 gap-x-4 text-sm text-gray-500 mb-4">
                        <div className="flex items-center">
                          <MapPin className="mr-1 h-4 w-4" />
                          {job.location}
                        </div>
                        <div className="flex items-center">
                          <Filter className="mr-1 h-4 w-4" />
                          {job.category}
                        </div>
                        <div className="flex items-center">
                          <Clock className="mr-1 h-4 w-4" />
                          Posted on {formatDate(job.postedDate)}
                        </div>
                      </div>
                      
                      <p className={`text-gray-600 ${viewMode === "grid" ? "line-clamp-3" : "line-clamp-2"}`}>
                        {job.description}
                      </p>
                      
                      <div className="mt-4">
                        <p className="font-semibold">{job.salary}</p>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between pt-2 mt-auto">
                      <span className="text-sm text-gray-500">
                        Posted by {job.postedBy}
                      </span>
                      <Link to={`/jobs/${job.id}`}>
                        <Button variant="outline">View Details</Button>
                      </Link>
                    </CardFooter>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="p-8 text-center text-gray-500">
              <p>No job opportunities found matching your criteria</p>
            </Card>
          )}
          
          {filteredJobs.length > itemsPerPage && (
            <div className="mt-6">
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious 
                      onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                      className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
                    />
                  </PaginationItem>
                  
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <PaginationItem key={page}>
                      <PaginationLink
                        isActive={currentPage === page}
                        onClick={() => setCurrentPage(page)}
                      >
                        {page}
                      </PaginationLink>
                    </PaginationItem>
                  ))}
                  
                  <PaginationItem>
                    <PaginationNext 
                      onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                      className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default JobBoard;
