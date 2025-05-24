
import { Button } from '@/components/ui/button';
import { PropertyCard } from '@/components/property/PropertyCard';
import { properties } from '@/lib/data';
import Link from 'next/link';
import { Input } from '@/components/ui/input';
import { Search, Sparkles, ArrowRight } from 'lucide-react';
import Image from 'next/image';

export default function HomePage() {
  const featuredProperties = properties.slice(0, 3); // Show first 3 properties as featured

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-primary/10 to-accent/10 py-16 md:py-24 rounded-lg overflow-hidden shadow-sm">
        <div className="container mx-auto px-4 text-center relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-primary-foreground bg-clip-text text-transparent bg-gradient-to-r from-gray-700 via-gray-900 to-black dark:from-gray-200 dark:via-gray-50 dark:to-white">
            Find Your <span className="text-primary">Perfect Haven</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Discover a wide range of properties tailored to your lifestyle. Start your search today!
          </p>
          <form className="max-w-xl mx-auto flex gap-2 items-center bg-background p-2 rounded-lg shadow-md">
            <Input
              type="text"
              placeholder="Enter location, property type, etc."
              className="flex-grow text-base"
              aria-label="Search properties"
            />
            <Button type="submit" size="lg" className="bg-accent hover:bg-accent/90">
              <Search className="mr-2 h-5 w-5" />
              Search
            </Button>
          </form>
        </div>
         <Image
          src="https://placehold.co/1200x400.png" // Replace with an actual hero image
          alt="Modern house"
          layout="fill"
          objectFit="cover"
          className="absolute inset-0 z-0 opacity-25"
          data-ai-hint="modern house exterior"
        />
      </section>

      {/* Featured Properties Section */}
      <section>
        <h2 className="text-3xl font-semibold mb-8 text-center">Featured Properties</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredProperties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
        <div className="text-center mt-8">
          <Link href="/search">
            <Button variant="outline" size="lg">
              View All Properties <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Neighborhood Recommendation Section */}
      <section className="bg-card p-8 rounded-lg shadow-md text-center">
        <Sparkles className="h-12 w-12 text-accent mx-auto mb-4" />
        <h2 className="text-2xl font-semibold mb-4">Find Your Ideal Neighborhood</h2>
        <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
          Let our AI-powered tool help you discover neighborhoods that match your lifestyle and preferences.
        </p>
        <Link href="/recommendations">
          <Button size="lg" variant="default">
            Get Recommendations <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </Link>
      </section>
    </div>
  );
}
