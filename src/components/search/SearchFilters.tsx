
"use client";

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { X, Filter } from 'lucide-react';

export interface SearchFilterValues {
  location: string;
  priceRange: [number, number];
  bedrooms: number | string; // Can be "any" or a number
  propertyType: string; // Can be "any" or a specific type
}

interface SearchFiltersProps {
  onFilterChange: (filters: SearchFilterValues) => void;
  initialFilters?: Partial<SearchFilterValues>;
}

const defaultPriceRange: [number, number] = [500, 15000];

export function SearchFilters({ onFilterChange, initialFilters }: SearchFiltersProps) {
  const [location, setLocation] = useState(initialFilters?.location || '');
  const [priceRange, setPriceRange] = useState<[number, number]>(initialFilters?.priceRange || defaultPriceRange);
  const [bedrooms, setBedrooms] = useState<string>(initialFilters?.bedrooms?.toString() || 'any');
  const [propertyType, setPropertyType] = useState<string>(initialFilters?.propertyType || 'any');

  const handleApplyFilters = () => {
    onFilterChange({
      location,
      priceRange,
      bedrooms: bedrooms === 'any' ? 'any' : parseInt(bedrooms, 10),
      propertyType,
    });
  };

  const handleResetFilters = () => {
    setLocation('');
    setPriceRange(defaultPriceRange);
    setBedrooms('any');
    setPropertyType('any');
    onFilterChange({
      location: '',
      priceRange: defaultPriceRange,
      bedrooms: 'any',
      propertyType: 'any',
    });
  };

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center text-xl">
          <Filter className="mr-2 h-5 w-5" />
          Filter Properties
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <Label htmlFor="location" className="text-sm font-medium">Location</Label>
          <Input
            id="location"
            type="text"
            placeholder="e.g., Downtown, Suburbia"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="mt-1"
          />
        </div>

        <div>
          <Label className="text-sm font-medium">Price Range (${priceRange[0]} - ${priceRange[1]})</Label>
          <Slider
            min={0}
            max={20000}
            step={100}
            value={priceRange}
            onValueChange={(value) => setPriceRange(value as [number, number])}
            className="mt-2"
          />
           <div className="flex justify-between text-xs text-muted-foreground mt-1">
            <span>$0</span>
            <span>$20,000+</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
            <Label htmlFor="bedrooms" className="text-sm font-medium">Bedrooms</Label>
            <Select value={bedrooms} onValueChange={setBedrooms}>
                <SelectTrigger id="bedrooms" className="mt-1">
                <SelectValue placeholder="Any" />
                </SelectTrigger>
                <SelectContent>
                <SelectItem value="any">Any</SelectItem>
                <SelectItem value="0">Studio</SelectItem>
                <SelectItem value="1">1 Bedroom</SelectItem>
                <SelectItem value="2">2 Bedrooms</SelectItem>
                <SelectItem value="3">3 Bedrooms</SelectItem>
                <SelectItem value="4">4+ Bedrooms</SelectItem>
                </SelectContent>
            </Select>
            </div>
            <div>
            <Label htmlFor="propertyType" className="text-sm font-medium">Property Type</Label>
            <Select value={propertyType} onValueChange={setPropertyType}>
                <SelectTrigger id="propertyType" className="mt-1">
                <SelectValue placeholder="Any" />
                </SelectTrigger>
                <SelectContent>
                <SelectItem value="any">Any Type</SelectItem>
                <SelectItem value="Apartment">Apartment</SelectItem>
                <SelectItem value="House">House</SelectItem>
                <SelectItem value="Condo">Condo</SelectItem>
                <SelectItem value="Townhouse">Townhouse</SelectItem>
                </SelectContent>
            </Select>
            </div>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-2 pt-4">
          <Button onClick={handleApplyFilters} className="flex-grow bg-accent hover:bg-accent/90">
            <Filter className="mr-2 h-4 w-4" /> Apply Filters
          </Button>
          <Button onClick={handleResetFilters} variant="outline" className="flex-grow">
             <X className="mr-2 h-4 w-4" /> Reset Filters
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
