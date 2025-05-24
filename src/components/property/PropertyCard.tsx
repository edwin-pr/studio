
"use client";

import Image from 'next/image';
import Link from 'next/link';
import { Heart, MapPin, BedDouble, Bath, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import type { Property } from '@/lib/data';
import { useFavorites } from '@/contexts/FavoritesContext';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';

interface PropertyCardProps {
  property: Property;
}

export function PropertyCard({ property }: PropertyCardProps) {
  const { toggleFavorite, isFavorite } = useFavorites();
  const favorite = isFavorite(property.id);

  return (
    <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col h-full">
      <CardHeader className="p-0 relative">
        <Link href={`/properties/${property.id}`} className="block">
          <Image
            src={property.images[0]}
            alt={property.title}
            width={400}
            height={250}
            className="w-full h-48 object-cover"
            data-ai-hint="apartment exterior building"
          />
        </Link>
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-2 right-2 bg-background/70 hover:bg-background"
          onClick={() => toggleFavorite(property)}
          aria-label={favorite ? 'Remove from favorites' : 'Add to favorites'}
        >
          <Heart className={cn("h-5 w-5", favorite ? "fill-red-500 text-red-500" : "text-muted-foreground")} />
        </Button>
      </CardHeader>
      <CardContent className="p-4 flex-grow">
        <Link href={`/properties/${property.id}`}>
          <CardTitle className="text-lg font-semibold mb-1 hover:text-primary transition-colors truncate">{property.title}</CardTitle>
        </Link>
        <CardDescription className="text-sm text-muted-foreground mb-2 h-10 overflow-hidden">
          {property.briefDescription}
        </CardDescription>
        <div className="flex items-center text-sm text-muted-foreground mb-1">
          <MapPin className="h-4 w-4 mr-1.5 flex-shrink-0" />
          <span className="truncate">{property.location}</span>
        </div>
        <div className="flex items-center space-x-3 text-sm text-muted-foreground mb-3">
          <span className="flex items-center">
            <BedDouble className="h-4 w-4 mr-1.5 flex-shrink-0" /> {property.bedrooms} Bed{property.bedrooms !== 1 ? 's' : ''}
          </span>
          <span className="flex items-center">
            <Bath className="h-4 w-4 mr-1.5 flex-shrink-0" /> {property.bathrooms} Bath{property.bathrooms !== 1 ? 's' : ''}
          </span>
           <span className="flex items-center">
            <Home className="h-4 w-4 mr-1.5 flex-shrink-0" /> {property.squareFeet} sqft
          </span>
        </div>
         <Badge variant="secondary" className="text-xs">{property.type}</Badge>
      </CardContent>
      <CardFooter className="p-4 flex justify-between items-center border-t">
        <p className="text-xl font-bold text-primary">
          ${property.price.toLocaleString()}<span className="text-sm font-normal text-muted-foreground">/month</span>
        </p>
        <Link href={`/properties/${property.id}`}>
          <Button variant="default" size="sm">View Details</Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
