
import React, { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { Search, UserRound, GraduationCap, Briefcase } from "lucide-react";

// Sample alumni data
const alumniData = [
  { id: 1, name: "Rajiv Kumar", batch: "2018", department: "Computer Science", currentRole: "Software Engineer", company: "TCS" },
  { id: 2, name: "Priya Singh", batch: "2019", department: "Electrical Engineering", currentRole: "Electrical Engineer", company: "BHEL" },
  { id: 3, name: "Amit Sharma", batch: "2017", department: "Mechanical Engineering", currentRole: "Product Manager", company: "Maruti Suzuki" },
  { id: 4, name: "Neha Gupta", batch: "2020", department: "Civil Engineering", currentRole: "Site Engineer", company: "L&T" },
  { id: 5, name: "Vikram Patel", batch: "2018", department: "Electronics", currentRole: "Hardware Engineer", company: "Samsung" },
  { id: 6, name: "Sunita Mishra", batch: "2016", department: "Computer Science", currentRole: "Tech Lead", company: "Infosys" },
  { id: 7, name: "Arun Joshi", batch: "2019", department: "Mechanical Engineering", currentRole: "Design Engineer", company: "Tata Motors" },
  { id: 8, name: "Meera Reddy", batch: "2017", department: "Civil Engineering", currentRole: "Project Manager", company: "DLF" },
  { id: 9, name: "Sanjay Kapoor", batch: "2020", department: "Electrical Engineering", currentRole: "Power Systems Engineer", company: "NTPC" },
  { id: 10, name: "Anjali Desai", batch: "2018", department: "Electronics", currentRole: "IoT Specialist", company: "Wipro" },
  { id: 11, name: "Rahul Verma", batch: "2016", department: "Computer Science", currentRole: "Data Scientist", company: "Amazon" },
  { id: 12, name: "Kavita Malhotra", batch: "2019", department: "Civil Engineering", currentRole: "Structural Engineer", company: "Shapoorji Pallonji" },
];

const Members = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("all");
  const [selectedBatch, setSelectedBatch] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
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
            <h1 className="text-3xl md:text-4xl font-bold">Alumni Directory</h1>
            <p className="mt-2 text-gray-200">Connect with fellow graduates from GBN Polytechnic</p>
          </div>
        </div>
        
        <div className="container mx-auto px-4 py-8">
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
                </TableRow>
              </TableHeader>
              <TableBody>
                {currentItems.length > 0 ? (
                  currentItems.map((alumni) => (
                    <TableRow key={alumni.id}>
                      <TableCell className="font-medium flex items-center gap-2">
                        <div className="bg-[#0a2463] text-white p-1 rounded-full">
                          <UserRound size={20} />
                        </div>
                        {alumni.name}
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
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-8 text-gray-500">
                      No alumni found matching your criteria
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
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Members;
