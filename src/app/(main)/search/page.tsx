
"use client";

import React, { useState, useEffect, useMemo } from 'react';
import { PropertyCard } from '@/components/property/PropertyCard';
import { SearchFilters, type SearchFilterValues } from '@/components/search/SearchFilters';
import { properties as allProperties, type Property } from '@/lib/data';
import { AlertCircle, SearchX } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Skeleton } from '@/components/ui/skeleton';

const ITEMS_PER_PAGE = 9;

export default function SearchPage() {
  const [filteredProperties, setFilteredProperties] = useState<Property[]>(allProperties);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  // Simulate initial loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500); // Simulate network delay
    return () => clearTimeout(timer);
  }, []);

  const handleFilterChange = (filters: SearchFilterValues) => {
    setIsLoading(true);
    setCurrentPage(1); // Reset to first page on new filter
    // Simulate filtering delay
    setTimeout(() => {
      let result = allProperties;

      if (filters.location) {
        result = result.filter(p => 
          p.location.toLowerCase().includes(filters.location.toLowerCase()) ||
          p.title.toLowerCase().includes(filters.location.toLowerCase()) ||
          p.address.toLowerCase().includes(filters.location.toLowerCase())
        );
      }

      result = result.filter(p => p.price >= filters.priceRange[0] && p.price <= filters.priceRange[1]);

      if (filters.bedrooms !== 'any') {
        const numBedrooms = parseInt(filters.bedrooms as string, 10);
        if (numBedrooms === 0) { // Studio
             result = result.filter(p => p.bedrooms === 0);
        } else if (numBedrooms === 4) { // 4+
             result = result.filter(p => p.bedrooms >= 4);
        }
        else {
            result = result.filter(p => p.bedrooms === numBedrooms);
        }
      }
      
      if (filters.propertyType !== 'any') {
        result = result.filter(p => p.type === filters.propertyType);
      }

      setFilteredProperties(result);
      setIsLoading(false);
    }, 300);
  };
  
  const paginatedProperties = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredProperties.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredProperties, currentPage]);

  const totalPages = Math.ceil(filteredProperties.length / ITEMS_PER_PAGE);

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      <div className="w-full lg:w-1/4">
        <div className="sticky top-20"> {/* Adjust top value based on header height */}
          <SearchFilters onFilterChange={handleFilterChange} />
        </div>
      </div>
      <div className="w-full lg:w-3/4">
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, index) => (
              <CardSkeleton key={index} />
            ))}
          </div>
        ) : paginatedProperties.length > 0 ? (
          <>
            <div className="mb-4 text-sm text-muted-foreground">
              Showing {paginatedProperties.length} of {filteredProperties.length} properties.
              {totalPages > 1 && ` Page ${currentPage} of ${totalPages}.`}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {paginatedProperties.map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>
            {totalPages > 1 && (
              <PaginationControls 
                currentPage={currentPage} 
                totalPages={totalPages} 
                onPageChange={setCurrentPage} 
              />
            )}
          </>
        ) : (
          <Alert variant="default" className="mt-8">
            <SearchX className="h-5 w-5" />
            <AlertTitle>No Properties Found</AlertTitle>
            <AlertDescription>
              No properties match your current filters. Try adjusting your search criteria.
            </AlertDescription>
          </Alert>
        )}
      </div>
    </div>
  );
}


function CardSkeleton() {
  return (
    <div className="border rounded-lg p-4 space-y-3 shadow">
      <Skeleton className="h-40 w-full" />
      <Skeleton className="h-6 w-3/4" />
      <Skeleton className="h-4 w-1/2" />
      <Skeleton className="h-4 w-1/3" />
      <div className="flex justify-between items-center pt-2">
        <Skeleton className="h-8 w-1/3" />
        <Skeleton className="h-8 w-1/4" />
      </div>
    </div>
  );
}

interface PaginationControlsProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

function PaginationControls({ currentPage, totalPages, onPageChange }: PaginationControlsProps) {
  const pageNumbers = [];
  const maxPagesToShow = 5;
  let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
  let endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

  if (endPage - startPage + 1 < maxPagesToShow) {
    startPage = Math.max(1, endPage - maxPagesToShow + 1);
  }
  
  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="mt-8 flex justify-center items-center space-x-2">
      <Button 
        variant="outline" 
        size="sm"
        onClick={() => onPageChange(currentPage - 1)} 
        disabled={currentPage === 1}
      >
        Previous
      </Button>
      {startPage > 1 && (
        <>
          <Button variant="ghost" size="sm" onClick={() => onPageChange(1)}>1</Button>
          {startPage > 2 && <span className="text-muted-foreground">...</span>}
        </>
      )}
      {pageNumbers.map(num => (
        <Button 
          key={num} 
          variant={currentPage === num ? "default" : "ghost"}
          size="sm"
          onClick={() => onPageChange(num)}
        >
          {num}
        </Button>
      ))}
      {endPage < totalPages && (
         <>
          {endPage < totalPages -1 && <span className="text-muted-foreground">...</span>}
          <Button variant="ghost" size="sm" onClick={() => onPageChange(totalPages)}>{totalPages}</Button>
        </>
      )}
      <Button 
        variant="outline" 
        size="sm"
        onClick={() => onPageChange(currentPage + 1)} 
        disabled={currentPage === totalPages}
      >
        Next
      </Button>
    </div>
  );
}
