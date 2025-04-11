
import React from "react";
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";
import { Button } from "./button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./select";
import { cn } from "@/lib/utils";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  totalItems?: number;
  pageSize?: number;
  onPageSizeChange?: (pageSize: number) => void;
  pageSizeOptions?: number[];
  showPageSizeChanger?: boolean;
  disabled?: boolean;
  className?: string;
}

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  totalItems,
  pageSize = 10,
  onPageSizeChange,
  pageSizeOptions = [10, 20, 50, 100],
  showPageSizeChanger = false,
  disabled = false,
  className = "",
}: PaginationProps) {
  // Generate array of page numbers to display
  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxPagesToShow = 5;
    
    if (totalPages <= maxPagesToShow) {
      // If total pages is less than max pages to show, display all pages
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      // Always include first page
      pageNumbers.push(1);
      
      // Calculate start and end of page numbers
      let start = Math.max(2, currentPage - 1);
      let end = Math.min(totalPages - 1, currentPage + 1);
      
      // Adjust to show 3 pages
      if (start === 2) end = Math.min(totalPages - 1, start + 2);
      if (end === totalPages - 1) start = Math.max(2, end - 2);
      
      // Add ellipsis if needed
      if (start > 2) {
        pageNumbers.push("ellipsis-start");
      }
      
      // Add pages
      for (let i = start; i <= end; i++) {
        pageNumbers.push(i);
      }
      
      // Add ellipsis if needed
      if (end < totalPages - 1) {
        pageNumbers.push("ellipsis-end");
      }
      
      // Always include last page
      pageNumbers.push(totalPages);
    }
    
    return pageNumbers;
  };

  const pageNumbers = getPageNumbers();
  
  return (
    <div className={`flex flex-col sm:flex-row items-center justify-between space-y-2 sm:space-y-0 ${className}`}>
      {totalItems !== undefined && (
        <div className="text-sm text-muted-foreground">
          {totalItems === 0 ? (
            "No items"
          ) : (
            <>
              Showing{" "}
              <span className="font-medium">
                {Math.min((currentPage - 1) * pageSize + 1, totalItems)}
              </span>{" "}
              to{" "}
              <span className="font-medium">
                {Math.min(currentPage * pageSize, totalItems)}
              </span>{" "}
              of <span className="font-medium">{totalItems}</span> items
            </>
          )}
        </div>
      )}
      
      <div className="flex items-center space-x-2">
        {showPageSizeChanger && onPageSizeChange && (
          <div className="flex items-center space-x-2">
            <span className="text-sm text-muted-foreground">Show</span>
            <Select
              value={pageSize.toString()}
              onValueChange={(value) => onPageSizeChange(Number(value))}
              disabled={disabled}
            >
              <SelectTrigger className="h-8 w-[70px]">
                <SelectValue placeholder={pageSize.toString()} />
              </SelectTrigger>
              <SelectContent>
                {pageSizeOptions.map((option) => (
                  <SelectItem key={option} value={option.toString()}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}
        
        <div className="flex items-center space-x-1">
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8"
            onClick={() => onPageChange(currentPage - 1)}
            disabled={disabled || currentPage === 1}
          >
            <ChevronLeft className="h-4 w-4" />
            <span className="sr-only">Previous page</span>
          </Button>
          
          {pageNumbers.map((page, index) => {
            if (page === "ellipsis-start" || page === "ellipsis-end") {
              return (
                <Button
                  key={`ellipsis-${index}`}
                  variant="outline"
                  size="icon"
                  className="h-8 w-8"
                  disabled={true}
                >
                  <MoreHorizontal className="h-4 w-4" />
                  <span className="sr-only">More pages</span>
                </Button>
              );
            }
            
            return (
              <Button
                key={page}
                variant={currentPage === page ? "default" : "outline"}
                size="icon"
                className="h-8 w-8"
                onClick={() => onPageChange(page as number)}
                disabled={disabled}
              >
                {page}
                <span className="sr-only">Page {page}</span>
              </Button>
            );
          })}
          
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8"
            onClick={() => onPageChange(currentPage + 1)}
            disabled={disabled || currentPage === totalPages}
          >
            <ChevronRight className="h-4 w-4" />
            <span className="sr-only">Next page</span>
          </Button>
        </div>
      </div>
    </div>
  );
}

// Add new pagination components to match the expected exports
export const PaginationContent = ({ 
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("flex flex-row items-center gap-1", className)} {...props}>
    {children}
  </div>
);

export const PaginationItem = ({ 
  className,
  ...props
}: React.HTMLAttributes<HTMLLIElement>) => (
  <li className={cn("", className)} {...props} />
);

export const PaginationLink = ({ 
  className,
  isActive = false,
  ...props
}: React.ComponentProps<typeof Button> & { isActive?: boolean }) => (
  <Button
    aria-current={isActive ? "page" : undefined}
    variant={isActive ? "default" : "outline"}
    size="icon"
    className={cn("h-8 w-8", className)}
    {...props}
  />
);

export const PaginationPrevious = ({ 
  className,
  ...props
}: React.ComponentProps<typeof Button>) => (
  <Button
    variant="outline"
    size="icon" 
    className={cn("h-8 w-8 gap-1", className)}
    {...props}
  >
    <ChevronLeft className="h-4 w-4" />
    <span className="sr-only">Previous page</span>
  </Button>
);

export const PaginationNext = ({ 
  className,
  ...props
}: React.ComponentProps<typeof Button>) => (
  <Button
    variant="outline"
    size="icon"
    className={cn("h-8 w-8 gap-1", className)}
    {...props}
  >
    <ChevronRight className="h-4 w-4" />
    <span className="sr-only">Next page</span>
  </Button>
);
