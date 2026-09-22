export interface Host {
  name: string;
  avatar?: string;
  yearsHosting: number;
  reviews: number;
  rating: number;
  responseRate: string;
  responseTime: string;
  coHosts: { name: string; avatar?: string; initial?: string; avatarColor?: string; textColor?: string }[];
  bio?: string[];
}

export interface Amenity {
  id: string;
  label: string;
  icon: string;
  available: boolean;
  category?: string;
}

export interface Review {
  id: string;
  author: string;
  avatar?: string;
  yearsOnAirbnb: string;
  date: string;
  rating: number;
  text: string;
}

export interface SleepingArrangement {
  name: string;
  detail: string;
  image: string;
}

export interface Highlight {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface CategoryRatings {
  overall: number;
  cleanliness: number;
  accuracy: number;
  checkin: number;
  communication: number;
  location: number;
  value: number;
}

export interface NearbyStay {
  id: string;
  title: string;
  image: string;
  price: number;
  rating: number;
}

export interface Listing {
  id: string;
  title: string;
  location: string;
  fullLocation: string;
  type: string;
  guests: number;
  bedrooms: number;
  beds: number;
  bathrooms: number;
  rating: number;
  reviewCount: number;
  isGuestFavourite: boolean;
  host: Host;
  priceTotal: number;
  nights: number;
  currency: string;
  checkIn: string;
  checkOut: string;
  cancellationNote: string;
  highlights: Highlight[];
  description: string;
  sleepingArrangements: SleepingArrangement[];
  amenities: Amenity[];
  totalAmenities: number;
  reviews: Review[];
  categoryRatings: CategoryRatings;
  images: { id: string; src: string; alt: string; caption?: string; category?: string }[];
  neighbourhood: string;
  houseRules: {
    checkIn: string;
    checkOut: string;
    maxGuests: number;
  };
  safety: string[];
  nearbyStays: NearbyStay[];
}
