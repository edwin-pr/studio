
export interface Review {
  id: string;
  propertyId: string;
  userName: string;
  avatar?: string;
  rating: number; // 1-5
  comment: string;
  date: string; // ISO date string
}

export interface Property {
  id: string;
  title: string;
  description: string;
  briefDescription: string;
  price: number;
  bedrooms: number;
  location: string;
  address: string;
  images: string[]; // URLs to placeholder images
  amenities: string[];
  availability: string; // e.g., "Available Now", "Available from YYYY-MM-DD"
  rating: number; // Average rating, can be calculated or stored
  reviews: Review[];
  type: 'Apartment' | 'House' | 'Condo';
  squareFeet: number;
  bathrooms: number;
}

const defaultReviews: Review[] = [
  {
    id: 'review1',
    propertyId: 'prop1',
    userName: 'Alice Wonderland',
    avatar: 'https://placehold.co/40x40.png',
    rating: 5,
    comment: 'Absolutely loved this place! Spacious and clean.',
    date: new Date('2023-05-15T10:00:00Z').toISOString(),
  },
  {
    id: 'review2',
    propertyId: 'prop1',
    userName: 'Bob The Builder',
    avatar: 'https://placehold.co/40x40.png',
    rating: 4,
    comment: 'Great location, a bit noisy on weekends though.',
    date: new Date('2023-06-01T14:30:00Z').toISOString(),
  },
];

export const properties: Property[] = [
  {
    id: 'prop1',
    title: 'Sunny 2-Bedroom Apartment with City',
    description: 'A bright and spacious 2-bedroom apartment located in the heart of downtown. Features modern amenities, a fully equipped kitchen, and stunning city views from the balcony. Close to public transport, shops, and restaurants.',
    briefDescription: 'Bright 2-bed in downtown with city views & modern amenities.',
    price: 2500,
    bedrooms: 2,
    location: 'Downtown Metropolis',
    address: '123 Main St, Downtown Metropolis, CA 90210',
    images: [
      'https://placehold.co/600x400.png',
      'https://placehold.co/600x350.png',
      'https://placehold.co/580x420.png',
    ],
    amenities: ['Air Conditioning', 'Balcony', 'Dishwasher', 'Gym Access', 'Parking'],
    availability: 'Available Now',
    rating: 4.5,
    reviews: defaultReviews,
    type: 'Apartment',
    squareFeet: 1200,
    bathrooms: 2,
  },
  {
    id: 'prop2',
    title: 'Cozy Suburban House with Garden',
    description: 'Charming 3-bedroom suburban house with a beautiful private garden. Perfect for families. Includes a large living room, updated kitchen, and a two-car garage. Located in a quiet, friendly neighborhood with good schools.',
    briefDescription: 'Charming 3-bed suburban house with a beautiful garden.',
    price: 3200,
    bedrooms: 3,
    location: 'Greenwood Suburbia',
    address: '456 Oak Ave, Greenwood Suburbia, TX 78701',
    images: [
      'https://placehold.co/600x400.png',
      'https://placehold.co/610x390.png',
      'https://placehold.co/590x410.png',
    ],
    amenities: ['Private Garden', 'Garage', 'Pet Friendly', 'Fireplace', 'Hardwood Floors'],
    availability: 'Available from 2024-08-01',
    rating: 4.8,
    reviews: [
       { id: 'review3', propertyId: 'prop2', userName: 'Charlie Brown', rating: 5, comment: 'Perfect family home!', date: new Date().toISOString(), avatar: 'https://placehold.co/40x40.png' }
    ],
    type: 'House',
    squareFeet: 1800,
    bathrooms: 2.5,
  },
  {
    id: 'prop3',
    title: 'Modern Studio in Tech Hub',
    description: 'Sleek and modern studio apartment in the vibrant tech hub. Ideal for professionals. Features smart home technology, high-speed internet, and access to co-working spaces. Walking distance to major tech companies and cafes.',
    briefDescription: 'Modern studio in tech hub, ideal for professionals.',
    price: 1800,
    bedrooms: 0, // Studio
    location: 'Silicon Valley',
    address: '789 Tech Rd, Silicon Valley, CA 94043',
    images: [
      'https://placehold.co/600x400.png',
      'https://placehold.co/550x450.png',
    ],
    amenities: ['Smart Home', 'High-Speed Internet', 'Co-working Space', 'Rooftop Deck', 'Fitness Center'],
    availability: 'Available Now',
    rating: 4.2,
    reviews: [],
    type: 'Condo',
    squareFeet: 600,
    bathrooms: 1,
  },
    {
    id: 'prop4',
    title: 'Luxury Penthouse with Panoramic Ocean Views',
    description: 'Experience ultimate luxury in this stunning penthouse apartment. Floor-to-ceiling windows offer breathtaking panoramic views of the ocean. Features a private elevator, gourmet kitchen, expansive terrace, and top-tier building amenities including a spa and concierge service.',
    briefDescription: 'Luxury penthouse with panoramic ocean views & private elevator.',
    price: 12000,
    bedrooms: 4,
    location: 'Oceanfront Towers',
    address: '1 Ocean Drive, Oceanfront Towers, FL 33139',
    images: [
      'https://placehold.co/600x400.png',
      'https://placehold.co/620x380.png',
      'https://placehold.co/580x420.png',
      'https://placehold.co/600x410.png',
    ],
    amenities: ['Ocean View', 'Private Elevator', 'Gourmet Kitchen', 'Terrace', 'Spa Access', 'Concierge', 'Infinity Pool'],
    availability: 'Available Now',
    rating: 4.9,
    reviews: [
      { id: 'review-p4-1', propertyId: 'prop4', userName: 'Diana Prince', avatar: 'https://placehold.co/40x40.png', rating: 5, comment: 'Absolutely breathtaking views and impeccable service. Worth every penny!', date: new Date('2023-10-10T12:00:00Z').toISOString() },
      { id: 'review-p4-2', propertyId: 'prop4', userName: 'Bruce Wayne', avatar: 'https://placehold.co/40x40.png', rating: 5, comment: 'A truly exceptional property. The amenities are world-class.', date: new Date('2023-11-05T09:30:00Z').toISOString() },
    ],
    type: 'Apartment',
    squareFeet: 4500,
    bathrooms: 4.5,
  },
  {
    id: 'prop5',
    title: 'Chic Downtown Loft with Industrial Design',
    description: 'Stylish loft apartment in a converted warehouse, featuring an industrial-chic design with exposed brick, high ceilings, and large factory windows. Open-plan living space, modern kitchen, and a mezzanine bedroom. Located in a trendy arts district.',
    briefDescription: 'Chic downtown loft with industrial design & mezzanine bedroom.',
    price: 2800,
    bedrooms: 1,
    location: 'Arts District',
    address: '101 Factory Lane, Arts District, NY 10013',
    images: [
      'https://placehold.co/600x400.png',
      'https://placehold.co/610x390.png',
    ],
    amenities: ['Exposed Brick', 'High Ceilings', 'Polished Concrete Floors', 'Art Studio Access', 'Rooftop Garden'],
    availability: 'Available from 2024-09-15',
    rating: 4.6,
    reviews: [
      { id: 'review-p5-1', propertyId: 'prop5', userName: 'Edward Nigma', avatar: 'https://placehold.co/40x40.png', rating: 4, comment: 'Very cool vibe and great location. A bit drafty in winter.', date: new Date('2023-12-01T18:00:00Z').toISOString() },
    ],
    type: 'Apartment',
    squareFeet: 1500,
    bathrooms: 1.5,
  },
];

export const getPropertyById = (id: string): Property | undefined => {
  return properties.find(p => p.id === id);
};

// Function to add a review (client-side mock)
export const addReviewToProperty = (propertyId: string, review: Omit<Review, 'id' | 'propertyId' | 'date'>): Review | null => {
  const property = properties.find(p => p.id === propertyId);
  if (property) {
    const newReview: Review = {
      ...review,
      id: `review-${Date.now()}`,
      propertyId,
      date: new Date().toISOString(),
    };
    property.reviews.unshift(newReview); // Add to the beginning of the array
    // Recalculate average rating
    const totalRating = property.reviews.reduce((sum, r) => sum + r.rating, 0);
    property.rating = property.reviews.length > 0 ? parseFloat((totalRating / property.reviews.length).toFixed(1)) : 0;
    return newReview;
  }
  return null;
};

