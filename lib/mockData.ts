// lib/mockData.ts
import { Property, Booking, Review } from '@/types/api';

const getPropertyImage = (imageId: number) =>{
   const imageNumber = (imageId % 12) + 1; // Ensure imageNumber is between 1 and 12
    return `/assets/images/image-${imageNumber}.png`;
}

export const mockProperties: Property[] = [
  {
    id: '1',
    title: 'Modern Apartment in Downtown',
    description: 'A beautiful modern apartment located in the heart of downtown with amazing city views.',
    image: getPropertyImage(1),
    price: 120,
    rating: 4.89,
    name: 'Luxury Downtown Apartment',
    address: {
      state: 'NY',
      city: 'New York',
      country: 'USA'
    },
    category: ['Apartment', 'Luxury'],
    offers: {
      bed: '1 Queen',
      shower: '1',
      occupants: '2'
    },
    discount: '10% off weekly stay'
  },
  {
    id: '2',
    title: 'Cozy Beach House',
    description: 'Relax in this beautiful beachfront property with private access to the beach.',
    image: getPropertyImage(2),
    price: 210,
    rating: 4.95,
    name: 'Beachfront Paradise',
    address: {
      state: 'FL',
      city: 'Miami',
      country: 'USA'
    },
    category: ['House', 'Beach'],
    offers: {
      bed: '2 Queens',
      shower: '2',
      occupants: '4'
    }
  },
  {
    id: '3',
    title: 'Mountain Cabin Retreat',
    description: 'Escape to this cozy cabin nestled in the mountains with stunning views.',
    image: getPropertyImage(3),
    price: 150,
    rating: 4.7,
    name: 'Mountain Escape',
    address: {
      state: 'CO',
      city: 'Aspen',
      country: 'USA'
    },
    category: ['Cabin', 'Mountain'],
    offers: {
      bed: '1 King',
      shower: '1',
      occupants: '2'
    },
    discount: '15% off monthly stay'
  },
  {
    id: '4',
    title: 'Urban Loft Studio',
    description: 'Stylish loft studio in the arts district with exposed brick walls.',
    image: getPropertyImage(4),
    price: 95,
    rating: 4.6,
    name: 'Arts District Loft',
    address: {
      state: 'CA',
      city: 'Los Angeles',
      country: 'USA'
    },
    category: ['Studio', 'Urban'],
    offers: {
      bed: '1 Queen',
      shower: '1',
      occupants: '2'
    }
  },
  {
    id: '5',
    title: 'Lakeside Cottage',
    description: 'Charming cottage right on the lake with private dock and fishing access.',
    image: getPropertyImage(5),
    price: 180,
    rating: 4.8,
    name: 'Lakeside Retreat',
    address: {
      state: 'MN',
      city: 'Duluth',
      country: 'USA'
    },
    category: ['Cottage', 'Lake'],
    offers: {
      bed: '2 Queens',
      shower: '1',
      occupants: '4'
    },
    discount: 'Free boat rental included'
  },
  {
    id: '6',
    title: 'City Center Penthouse',
    description: 'Luxurious penthouse with panoramic city views and rooftop access.',
    image: getPropertyImage(6),
    price: 350,
    rating: 4.9,
    name: 'Skyline Penthouse',
    address: {
      state: 'IL',
      city: 'Chicago',
      country: 'USA'
    },
    category: ['Penthouse', 'Luxury'],
    offers: {
      bed: '1 King',
      shower: '2',
      occupants: '2'
    }
  },
  {
    id: '7',
    title: 'Desert Oasis Villa',
    description: 'Private villa with pool in the desert, perfect for stargazing.',
    image: getPropertyImage(7),
    price: 275,
    rating: 4.85,
    name: 'Desert Paradise',
    address: {
      state: 'AZ',
      city: 'Sedona',
      country: 'USA'
    },
    category: ['Villa', 'Desert'],
    offers: {
      bed: '3 Kings',
      shower: '3',
      occupants: '6'
    },
    discount: 'Complimentary breakfast'
  },
  {
    id: '8',
    title: 'Historic Townhouse',
    description: 'Beautifully restored historic townhouse with original architectural details.',
    image: getPropertyImage(8),
    price: 190,
    rating: 4.75,
    name: 'Heritage Townhouse',
    address: {
      state: 'MA',
      city: 'Boston',
      country: 'USA'
    },
    category: ['Townhouse', 'Historic'],
    offers: {
      bed: '2 Queens',
      shower: '2',
      occupants: '4'
    }
  },
  {
    id: '9',
    title: 'Wine Country Estate',
    description: 'Spacious estate in wine country with vineyard views and tasting room access.',
    image: getPropertyImage(9),
    price: 420,
    rating: 4.92,
    name: 'Vineyard Estate',
    address: {
      state: 'CA',
      city: 'Napa',
      country: 'USA'
    },
    category: ['Estate', 'Wine Country'],
    offers: {
      bed: '4 Kings',
      shower: '4',
      occupants: '8'
    },
    discount: 'Wine tasting package included'
  },
  {
    id: '10',
    title: 'Ski-In/Ski-Out Chalet',
    description: 'Direct slope access from this cozy alpine chalet with fireplace.',
    image: getPropertyImage(10),
    price: 310,
    rating: 4.88,
    name: 'Alpine Chalet',
    address: {
      state: 'UT',
      city: 'Park City',
      country: 'USA'
    },
    category: ['Chalet', 'Ski'],
    offers: {
      bed: '2 Queens, 1 Bunk',
      shower: '2',
      occupants: '6'
    }
  },
  {
    id: '11',
    title: 'Tropical Treehouse',
    description: 'Unique treehouse experience in the rainforest with ocean views.',
    image: getPropertyImage(11),
    price: 165,
    rating: 4.8,
    name: 'Rainforest Treehouse',
    address: {
      state: 'HI',
      city: 'Hilo',
      country: 'USA'
    },
    category: ['Treehouse', 'Tropical'],
    offers: {
      bed: '1 Queen',
      shower: '1',
      occupants: '2'
    },
    discount: 'Early bird special'
  },
  {
    id: '12',
    title: 'Modern Farmhouse',
    description: 'Newly built farmhouse with modern amenities and countryside charm.',
    image: getPropertyImage(12),
    price: 230,
    rating: 4.85,
    name: 'Country Farmhouse',
    address: {
      state: 'TX',
      city: 'Austin',
      country: 'USA'
    },
    category: ['Farmhouse', 'Country'],
    offers: {
      bed: '3 Queens',
      shower: '2',
      occupants: '6'
    }
  }
];

export const mockBookings: Booking[] = [
  {
    id: '1',
    propertyId: mockProperties[0].id,
    checkIn: new Date('2023-11-15'),
    checkOut: new Date('2023-11-20'),
    guests: 2,
    totalPrice: 600,
    user: {
      name: 'John Doe',
      email: 'john@example.com',
      phone: '+1234567890'
    },
    status: 'confirmed'
  },
  {
    id: '2',
    propertyId: mockProperties[1].id,
    checkIn: new Date('2023-12-01'),
    checkOut: new Date('2023-12-07'),
    guests: 2,
    totalPrice: 900,
    user: {
      name: 'Sarah Wilson',
      email: 'sarah@example.com',
      phone: '+1987654321'
    },
    status: 'confirmed'
  }
];

export const mockReviews: Review[] = [
  {
    id: '1',
    propertyId: mockProperties[0].id,
    userId: '101',
    userName: 'Michael Smith',
    userAvatar: '/avatars/user1.jpg',
    rating: 5,
    comment: 'Amazing place! The location was perfect and the apartment had everything we needed.',
    date: new Date('2023-10-15')
  },
  {
    id: '2',
    propertyId: mockProperties[1].id,
    userId: '102',
    userName: 'Emily Johnson',
    userAvatar: '/avatars/user2.jpg',
    rating: 4,
    comment: 'Great stay overall. The host was very responsive and the apartment was clean.',
    date: new Date('2023-09-22')
  },
  {
    id: '3',
    propertyId: mockProperties[2].id,
    userId: '103',
    userName: 'David Brown',
    userAvatar: '/avatars/user3.jpg',
    rating: 5,
    comment: 'Paradise found! The beach access was incredible and the house was even better than photos.',
    date: new Date('2023-11-05')
  },
  {
    id: '4',
    propertyId: mockProperties[2].id,
    userId: '104',
    userName: 'Jessica Taylor',
    userAvatar: '/avatars/user4.jpg',
    rating: 4,
    comment: 'Perfect mountain getaway. The views were breathtaking and the cabin was so cozy.',
    date: new Date('2023-10-28')
  }
];