import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, Filter, FilterX, GraduationCap, Building } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { alumniData } from "@/data/alumniData";
import ViewToggle from "@/components/ViewToggle";
import MemberCard from "@/components/MemberCard";

const Members = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBatch, setSelectedBatch] = useState("all");
  const [selectedDept, setSelectedDept] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [viewMode, setViewMode] = useState<"list" | "grid">(() => {
    const savedView = localStorage.getItem("membersViewMode");
    return (savedView as "list" | "grid") || "list";
  });

  const itemsPerPage = viewMode === "grid" ? 8 : 10;

  // Save view preference to localStorage
  useEffect(() => {
    localStorage.setItem("membersViewMode", viewMode);
  }, [viewMode]);

  // Get unique batches and departments for filters
  const batches = [...new Set(alumniData.map((alumni) => alumni.batch))];
  const departments = [
    ...new Set(alumniData.map((alumni) => alumni.department)),
  ];

  // Filter alumni based on search and filters
  const filteredAlumni = alumniData.filter((alumni) => {
    const matchesSearch =
      alumni.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      alumni.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      alumni.currentRole.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesBatch =
      selectedBatch === "all" || alumni.batch === selectedBatch;
    const matchesDept =
      selectedDept === "all" || alumni.department === selectedDept;

    return matchesSearch && matchesBatch && matchesDept;
  });

  // Calculate pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentAlumni = filteredAlumni.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredAlumni.length / itemsPerPage);

  const resetFilters = () => {
    setSearchTerm("");
    setSelectedBatch("all");
    setSelectedDept("all");
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <div className="bg-primary py-12">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl md:text-4xl text-primary-foreground font-bold">
              Alumni Community
            </h1>
            <p className="mt-2 text-primary-foreground/80">
              Connect with fellow alumni from GBN Polytechnic
            </p>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl  font-bold">Our Members</h2>
            <ViewToggle view={viewMode} onChange={setViewMode} />
          </div>

          <Card className="mb-8">
            <CardContent className="pt-6">
              <div className="grid gap-6 md:grid-cols-4">
                <div className="col-span-2">
                  <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                    <Input
                      placeholder="Search by name, role or company..."
                      className="pl-9"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                </div>

                <div>
                  <Select
                    value={selectedBatch}
                    onValueChange={setSelectedBatch}
                  >
                    <SelectTrigger className="flex items-center">
                      <GraduationCap className="mr-2 h-4 w-4" />
                      <SelectValue placeholder="All Batches" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Batches</SelectItem>
                      {batches.map((batch) => (
                        <SelectItem key={batch} value={batch}>
                          {batch}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Select value={selectedDept} onValueChange={setSelectedDept}>
                    <SelectTrigger className="flex items-center">
                      <Building className="mr-2 h-4 w-4" />
                      <SelectValue placeholder="All Departments" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Departments</SelectItem>
                      {departments.map((dept) => (
                        <SelectItem key={dept} value={dept}>
                          {dept}
                        </SelectItem>
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

          {currentAlumni.length > 0 ? (
            <div className={viewMode === "grid" ? "grid-layout" : "space-y-4"}>
              {currentAlumni.map((member) => (
                <MemberCard
                  key={member.id}
                  member={member}
                  viewMode={viewMode}
                />
              ))}
            </div>
          ) : (
            <Card className="p-8 text-center text-gray-500">
              <p>No alumni found matching your criteria</p>
            </Card>
          )}

          {filteredAlumni.length > itemsPerPage && (
            <div className="mt-6">
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      onClick={() =>
                        setCurrentPage((prev) => Math.max(prev - 1, 1))
                      }
                      className={
                        currentPage === 1
                          ? "pointer-events-none opacity-50"
                          : ""
                      }
                    />
                  </PaginationItem>

                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                    (page) => (
                      <PaginationItem key={page}>
                        <PaginationLink
                          isActive={currentPage === page}
                          onClick={() => setCurrentPage(page)}
                        >
                          {page}
                        </PaginationLink>
                      </PaginationItem>
                    )
                  )}

                  <PaginationItem>
                    <PaginationNext
                      onClick={() =>
                        setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                      }
                      className={
                        currentPage === totalPages
                          ? "pointer-events-none opacity-50"
                          : ""
                      }
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
