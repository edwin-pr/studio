
"use client";

import { PropertyCard } from '@/components/property/PropertyCard';
import { useFavorites } from '@/contexts/FavoritesContext';
import { HeartCrack } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

export default function FavoritesPage() {
  const { favorites } = useFavorites();

  return (
    <div>
      <h1 className="text-3xl font-semibold mb-8">Your Favorite Properties</h1>
      {favorites.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {favorites.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      ) : (
        <Alert variant="default" className="max-w-lg mx-auto">
            <HeartCrack className="h-5 w-5" />
            <AlertTitle>No Favorites Yet</AlertTitle>
            <AlertDescription>
              You haven&apos;t added any properties to your favorites. 
              <Link href="/search" className="ml-1">
                <Button variant="link" className="p-0 h-auto text-accent hover:text-accent/80">Start exploring</Button>
              </Link>
               and click the heart icon to save properties you like!
            </AlertDescription>
          </Alert>
      )}
    </div>
  );
}
