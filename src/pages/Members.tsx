
import React, { useState } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { Search, UserRound, GraduationCap, Briefcase, ExternalLink, MessageSquare } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PostsFeed from "@/components/PostsFeed";
import { useAuth } from "@/contexts/AuthContext";
import { alumniData } from "@/data/alumniData";

const Members = () => {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("all");
  const [selectedBatch, setSelectedBatch] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [activeTab, setActiveTab] = useState("directory");
  const itemsPerPage = 5;

  // Get unique departments and batches for filters
  const departments = [...new Set(alumniData.map(alumni => alumni.department))];
  const batches = [...new Set(alumniData.map(alumni => alumni.batch))];

  // Filter alumni based on search and filters
  const filteredAlumni = alumniData.filter(alumni => {
    const matchesSearch = alumni.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          alumni.company.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          alumni.currentRole.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesDepartment = selectedDepartment === "all" || alumni.department === selectedDepartment;
    const matchesBatch = selectedBatch === "all" || alumni.batch === selectedBatch;
    
    return matchesSearch && matchesDepartment && matchesBatch;
  });

  // Calculate pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredAlumni.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredAlumni.length / itemsPerPage);

  const resetFilters = () => {
    setSearchTerm("");
    setSelectedDepartment("all");
    setSelectedBatch("all");
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Header />
      <main className="flex-grow">
        <div className="bg-[#0a2463] text-white py-12">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl md:text-4xl font-bold">Alumni Community</h1>
            <p className="mt-2 text-gray-200">Connect with fellow graduates from GBN Polytechnic</p>
          </div>
        </div>
        
        <div className="container mx-auto px-4 py-8">
          <Tabs defaultValue="directory" onValueChange={setActiveTab} className="w-full">
            <TabsList className="mb-6">
              <TabsTrigger value="directory">Alumni Directory</TabsTrigger>
              <TabsTrigger value="feed">Community Feed</TabsTrigger>
            </TabsList>
            
            <TabsContent value="directory">
              <Card className="mb-8">
                <CardContent className="pt-6">
                  <div className="grid gap-6 md:grid-cols-4">
                    <div className="col-span-2">
                      <Label htmlFor="search" className="mb-2 block">Search</Label>
                      <div className="relative">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                        <Input
                          id="search"
                          placeholder="Search by name, role or company..."
                          className="pl-9"
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                        />
                      </div>
                    </div>
                    
                    <div>
                      <Label htmlFor="department" className="mb-2 block">Department</Label>
                      <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
                        <SelectTrigger>
                          <SelectValue placeholder="All Departments" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Departments</SelectItem>
                          {departments.map((dept) => (
                            <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <Label htmlFor="batch" className="mb-2 block">Batch Year</Label>
                      <Select value={selectedBatch} onValueChange={setSelectedBatch}>
                        <SelectTrigger>
                          <SelectValue placeholder="All Batches" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Batches</SelectItem>
                          {batches.map((batch) => (
                            <SelectItem key={batch} value={batch}>{batch}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div className="mt-4 flex justify-end">
                    <Button 
                      variant="outline" 
                      onClick={resetFilters}
                      className="text-sm"
                    >
                      Reset Filters
                    </Button>
                  </div>
                </CardContent>
              </Card>
              
              <div className="rounded-md border bg-card">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Batch</TableHead>
                      <TableHead>Department</TableHead>
                      <TableHead>Current Role</TableHead>
                      <TableHead>Company</TableHead>
                      <TableHead className="w-[100px]">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {currentItems.length > 0 ? (
                      currentItems.map((alumni) => (
                        <TableRow key={alumni.id} className="hover:bg-slate-100">
                          <TableCell className="font-medium flex items-center gap-2">
                            <div className="bg-[#0a2463] text-white p-1 rounded-full">
                              <UserRound size={20} />
                            </div>
                            <Link to={`/members/${alumni.id}`} className="hover:text-[#0a2463] hover:underline">
                              {alumni.name}
                            </Link>
                          </TableCell>
                          <TableCell className="flex items-center gap-2">
                            <GraduationCap size={16} className="text-[#e6c200]" />
                            {alumni.batch}
                          </TableCell>
                          <TableCell>{alumni.department}</TableCell>
                          <TableCell>{alumni.currentRole}</TableCell>
                          <TableCell className="flex items-center gap-2">
                            <Briefcase size={16} className="text-gray-500" />
                            {alumni.company}
                          </TableCell>
                          <TableCell>
                            <div className="flex space-x-2">
                              <Button variant="ghost" size="sm" asChild>
                                <Link to={`/members/${alumni.id}`}>
                                  <ExternalLink size={16} />
                                  <span className="sr-only">View Profile</span>
                                </Link>
                              </Button>
                              {user && alumni.id !== user.id && (
                                <Button variant="ghost" size="sm" asChild>
                                  <Link to={`/messenger?userId=${alumni.id}`}>
                                    <MessageSquare size={16} />
                                    <span className="sr-only">Message</span>
                                  </Link>
                                </Button>
                              )}
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center py-8 text-gray-500">
                          <p>No alumni found matching your criteria</p>
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
              
              {filteredAlumni.length > itemsPerPage && (
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
            </TabsContent>
            
            <TabsContent value="feed">
              <div className="max-w-3xl mx-auto">
                <PostsFeed />
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Members;
