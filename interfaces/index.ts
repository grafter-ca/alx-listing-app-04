
// interfaces/index.ts
export interface CardProps {
  id?: string;
  title: string;
  description: string;
  image: string;
  price: number;
}
export interface ButtonProps {
  label: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  variant?: "primary" | "secondary";
}

export interface PROPERTYLISTINGSAMPLEProps {
  image: string;
  rating:number;
  name:string;
  price:number;
}

export interface PropertyProps {
  id?: string;
  name: string;
  address: {
    state: string;
    city: string;
    country: string;
  };
  rating: number;
  category: string[];
  price: number;
  offers: {
    bed: string;
    shower: string;
    occupants: string;
  };
  image: string;
  discount?: string;
  description?: string;
}

export interface PropertyListingProps {
  id: string;
  name: string;
  image: string;
  price: number;
  rating: number;
  address?: {
    state: string;
    city: string;
    country: string;
  };
  category?: string[];
  offers?: {
    bed: string;
    shower: string;
    occupants: string;
  };
  discount?: string;
}

export interface BookingDetails {
  propertyName?: string;
  checkin: string;
  checkout: string;
  totalNights: number;
  pricePerNight: number;
  bookingFee: number;
  customer: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address: {
      street: string;
      city: string;
      state: string;
      zip: string;
      country: string;
    };
  };
  payment: {
    cardNumber: string;
    expiry: string;
    cvv: string;
  };
}

export interface BookingDetailsProps {
  bookingDetails: BookingDetails;
}

