
"use client"; // Mark as client component due to hooks and state

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import { getPropertyById, addReviewToProperty, type Property, type Review } from '@/lib/data';
import { PropertyImageSlider } from '@/components/property/PropertyImageSlider';
import { StarRating } from '@/components/property/StarRating';
import { ReviewList } from '@/components/property/ReviewList';
import { ReviewForm } from '@/components/property/ReviewForm';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BedDouble, Bath, HomeIcon, MapPin, CheckCircle, CalendarDays, Users, ShieldCheck, Tag, QrCode } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { BookingConfirmationDialog } from '@/components/BookingConfirmationDialog';
import { useToast } from '@/hooks/use-toast';
import { Skeleton } from '@/components/ui/skeleton';
import { Input } from '@/components/ui/input';


export default function PropertyDetailsPage() {
  const params = useParams();
  const id = params.id as string;
  
  const [property, setProperty] = useState<Property | null | undefined>(undefined); // undefined for loading state
  const [isBookingDialogOpen, setIsBookingDialogOpen] = useState(false);
  const [currentUrl, setCurrentUrl] = useState('');
  const { toast } = useToast();

  useEffect(() => {
    if (id) {
      const fetchedProperty = getPropertyById(id);
      setProperty(fetchedProperty);
    }
    if (typeof window !== 'undefined') {
      setCurrentUrl(window.location.href);
    }
  }, [id]);

  const handleReviewSubmit = (newReviewData: Omit<Review, 'id' | 'propertyId' | 'date'>) => {
    if (property) {
      const newReview = addReviewToProperty(property.id, newReviewData);
      if (newReview && property.reviews) {
        // Update local state to reflect the new review and rating
        setProperty(prev => {
            if (!prev) return null;
            // addReviewToProperty already updates the global mock data.
            // Here we just need to trigger a re-render with the updated property object from mock.
            return {...getPropertyById(prev.id)};
        });
      }
    }
  };
  
  const handleBookNow = () => {
    // Mock booking logic
    console.log(`Booking property: ${property?.title}`);
    setIsBookingDialogOpen(true);
    // Simulate automated notification (email)
    toast({
      title: "Booking Initiated",
      description: `A confirmation email for ${property?.title} will be sent shortly.`,
    });
  };

  if (property === undefined) { // Loading state
    return <PropertyDetailsSkeleton />;
  }

  if (!property) {
    return (
        <div className="text-center py-10">
          <h1 className="text-2xl font-semibold">Property Not Found</h1>
          <p className="text-muted-foreground">The property you are looking for does not exist or has been removed.</p>
        </div>
    );
  }
  
  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Search', href: '/search' },
    { label: property.title, href: `/properties/${property.id}` },
  ];

  return (
    <div className="space-y-8">
      <Breadcrumbs items={breadcrumbItems} />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Image Slider and Booking */}
        <div className="lg:col-span-2 space-y-6">
          <PropertyImageSlider images={property.images} altText={property.title} />
          <Card className="lg:hidden shadow-md"> {/* Booking card for mobile */}
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-primary">
                ${property.price.toLocaleString()}<span className="text-base font-normal text-muted-foreground">/month</span>
              </CardTitle>
              <Badge variant={property.availability === 'Available Now' ? "default" : "secondary"} className="w-fit">
                <CalendarDays className="mr-1.5 h-4 w-4" /> {property.availability}
              </Badge>
            </CardHeader>
            <CardContent>
              <Button size="lg" className="w-full text-lg" onClick={handleBookNow}>Book Now</Button>
            </CardContent>
          </Card>
        </div>

        {/* Right Column: Details and Booking (Desktop) */}
        <div className="lg:col-span-1 space-y-6">
          <Card className="shadow-md sticky top-24"> {/* Sticky booking card for desktop */}
             <CardHeader>
                <h1 className="text-3xl font-bold leading-tight">{property.title}</h1>
                <div className="flex items-center space-x-2 text-muted-foreground">
                    <MapPin className="h-5 w-5" /> 
                    <span>{property.location}</span>
                </div>
                <div className="flex items-center mt-1">
                    <StarRating rating={property.rating} size={20} showText/>
                    <span className="ml-2 text-sm text-muted-foreground">({property.reviews.length} reviews)</span>
                </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-3xl font-bold text-primary">
                ${property.price.toLocaleString()}<span className="text-lg font-normal text-muted-foreground">/month</span>
              </div>
              <Badge variant={property.availability === 'Available Now' ? "default" : "outline"} className="text-sm py-1 px-3">
                <CalendarDays className="mr-2 h-4 w-4" /> {property.availability}
              </Badge>
              <Button size="lg" className="w-full text-lg mt-2" onClick={handleBookNow}>Book Now</Button>
              <p className="text-xs text-muted-foreground text-center">Contact us for more details or to schedule a viewing.</p>
            </CardContent>
          </Card>
        </div>
      </div>
      
      {/* Property Info Sections - Full Width below columns */}
      <div className="space-y-8 mt-8">
        <Card className="shadow-md">
          <CardHeader>
            <CardTitle className="text-2xl">Property Overview</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-base">
              <div className="flex items-center"><BedDouble className="h-5 w-5 mr-2 text-primary" /> {property.bedrooms} Bedroom{property.bedrooms !== 1 ? 's' : ''}</div>
              <div className="flex items-center"><Bath className="h-5 w-5 mr-2 text-primary" /> {property.bathrooms} Bathroom{property.bathrooms !== 1 ? 's' : ''}</div>
              <div className="flex items-center"><HomeIcon className="h-5 w-5 mr-2 text-primary" /> {property.squareFeet} sqft</div>
              <div className="flex items-center col-span-2 md:col-span-1"><Tag className="h-5 w-5 mr-2 text-primary" /> {property.type}</div>
            </div>
             <Separator className="my-6" />
            <p className="text-foreground leading-relaxed">{property.description}</p>
          </CardContent>
        </Card>

        <Accordion type="single" collapsible defaultValue="item-1" className="w-full bg-card p-4 rounded-lg shadow-md">
          <AccordionItem value="item-1">
            <AccordionTrigger className="text-xl font-semibold hover:no-underline">
              <ShieldCheck className="h-6 w-6 mr-2 text-primary" /> Amenities
            </AccordionTrigger>
            <AccordionContent>
              <ul className="list-disc list-inside grid grid-cols-1 sm:grid-cols-2 gap-2 pl-2 text-foreground">
                {property.amenities.map((amenity, index) => (
                  <li key={index} className="flex items-center">
                    <CheckCircle className="h-4 w-4 mr-2 text-green-500 flex-shrink-0" /> {amenity}
                  </li>
                ))}
              </ul>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger className="text-xl font-semibold hover:no-underline">
              <Users className="h-6 w-6 mr-2 text-primary" /> User Reviews & Ratings ({property.reviews.length})
            </AccordionTrigger>
            <AccordionContent className="space-y-6">
              <ReviewList reviews={property.reviews} />
              <Separator />
              <div>
                <h3 className="text-lg font-semibold mb-3">Leave a Review</h3>
                <ReviewForm propertyId={property.id} onReviewSubmit={handleReviewSubmit} />
              </div>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger className="text-xl font-semibold hover:no-underline">
               <MapPin className="h-6 w-6 mr-2 text-primary" /> Location & Neighborhood
            </AccordionTrigger>
            <AccordionContent className="space-y-3">
              <p><strong>Address:</strong> {property.address}</p>
              <p><strong>Neighborhood:</strong> {property.location}</p>
              <p className="text-muted-foreground">Explore the surroundings using the map below (map integration coming soon).</p>
              <div className="aspect-video bg-muted rounded-md flex items-center justify-center">
                <MapPin className="h-12 w-12 text-muted-foreground/50" /> 
                <span className="ml-2 text-muted-foreground/70">Map Placeholder</span>
              </div>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-4">
            <AccordionTrigger className="text-xl font-semibold hover:no-underline">
               <QrCode className="h-6 w-6 mr-2 text-primary" /> Share / View on Device
            </AccordionTrigger>
            <AccordionContent className="space-y-4 text-center">
                <div className="flex justify-center">
                    <Image
                        src="https://placehold.co/150x150.png"
                        alt="QR code for property details"
                        width={150}
                        height={150}
                        className="rounded-md shadow-md"
                        data-ai-hint="qr code"
                    />
                </div>
              <p className="text-sm text-muted-foreground">
                Scan this QR code with your phone to quickly open these property details or share them with someone.
              </p>
              {currentUrl && (
                <div className="mt-3">
                  <Label htmlFor="propertyUrl" className="text-xs text-muted-foreground">Or copy this link:</Label>
                  <Input 
                    id="propertyUrl" 
                    readOnly 
                    value={currentUrl} 
                    className="mt-1 text-center text-sm" 
                    onClick={(e) => (e.target as HTMLInputElement).select()} 
                  />
                </div>
              )}
              <p className="text-xs text-muted-foreground mt-2">
                For a real application, this QR code would be dynamically generated.
              </p>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>

      <BookingConfirmationDialog 
        isOpen={isBookingDialogOpen} 
        onClose={() => setIsBookingDialogOpen(false)}
        propertyName={property.title}
      />
    </div>
  );
}


function PropertyDetailsSkeleton() {
  return (
    <div className="space-y-8">
      <Skeleton className="h-6 w-1/3 mb-6" /> {/* Breadcrumbs */}
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <Skeleton className="aspect-video w-full rounded-lg" />
        </div>
        <div className="lg:col-span-1 space-y-6">
          <div className="p-6 border rounded-lg space-y-4">
            <Skeleton className="h-8 w-3/4" />
            <Skeleton className="h-5 w-1/2" />
            <Skeleton className="h-5 w-1/3" />
            <Skeleton className="h-10 w-full mt-4" />
            <Skeleton className="h-12 w-full mt-2" />
          </div>
        </div>
      </div>
      
      <div className="space-y-8 mt-8">
        <div className="p-6 border rounded-lg space-y-4">
          <Skeleton className="h-7 w-1/4 mb-4" />
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-6 w-full" />
          </div>
          <Skeleton className="h-4 w-full mt-2" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
        </div>

        <div className="p-4 border rounded-lg space-y-4">
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
        </div>
      </div>
    </div>
  );
}

