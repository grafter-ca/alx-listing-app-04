// types/api.ts or modals/api.ts
// Define TypeScript interfaces for Property, Booking, and Review
export interface Property {
  id: string;
  title: string;
  description: string;
  image: string;
  price: number;
  rating: number;
  name: string;
  address: {
    state: string;
    city: string;
    country: string;
  };
  category: string[];
  offers: {
    bed: string;
    shower: string;
    occupants: string;
  };
  discount?: string;
}

export interface Booking {
  id: string;
  propertyId: string;
  checkIn: Date;
  checkOut: Date;
  guests: number;
  totalPrice: number;
  user: {
    name: string;
    email: string;
    phone: string;
  };
  status: 'pending' | 'confirmed' | 'cancelled';
}

export interface Review {
  id: string;
  propertyId: string;
  userId: string;
  userName: string;
  userAvatar: string;
  rating: number;
  comment: string;
  date: Date;
}