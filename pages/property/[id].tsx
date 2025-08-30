// pages/property/[id].tsx
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';
import { 
  FaStar, 
  FaBed, 
  FaBath, 
  FaUserFriends, 
  FaMapMarkerAlt, 
  FaHeart, 
  FaShare, 
  FaHome,
  FaArrowLeft
} from 'react-icons/fa';

interface Property {
  id: string;
  title: string;
  description: string;
  image: string;
  price: number;
  rating: number;
  name: string;
  address?: {
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

const PropertyDetail = () => {
  const router = useRouter();
  const { id } = router.query;
  
  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showAllDescription, setShowAllDescription] = useState(false);

  useEffect(() => {
    const fetchPropertyData = async () => {
      if (!id) return;
      
      try {
        setLoading(true);
        setError(null);
        
        // Fetch property details
        const response = await axios.get(`/api/properties/${id}`);
        
        // Handle different response formats
        const propertyData = response.data.data || response.data;
        
        if (!propertyData) {
          throw new Error('Invalid property data received');
        }
        
        setProperty(propertyData);
        
      } catch (err) {
        console.error('Error fetching property data:', err);
        setError('Failed to load property details. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchPropertyData();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error || !property) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 text-lg mb-4">{error || 'Property not found'}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  // Safe property access with fallbacks
  const truncatedDescription = property.description && property.description.length > 200 && !showAllDescription
    ? `${property.description.substring(0, 200)}...`
    : property.description;

  const displayName = property.name || property.title || 'Unnamed Property';
  const displayImage = property.image || '/assets/images/fallback-property.jpg';
  const displayPrice = property.price || 0;
  const displayRating = property.rating || 0;
  const displayCategory = property.category || [];
  const displayOffers = property.offers || { bed: 'Not specified', shower: 'Not specified', occupants: 'Not specified' };

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb Navigation */}
      <div className="border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center space-x-2 text-sm">
            <Link href="/" className="text-gray-500 hover:text-gray-700 flex items-center">
              <FaHome className="mr-1" />
              <span>Home</span>
            </Link>
            <span className="text-gray-400">/</span>
            <Link href="/property" className="text-gray-500 hover:text-gray-700">
              Properties
            </Link>
            <span className="text-gray-400">/</span>
            <span className="text-gray-800 font-medium truncate">{displayName}</span>
          </div>
        </div>
      </div>

      {/* Back Button */}
      <div className="max-w-7xl mx-auto px-4 py-4">
        <button 
          onClick={() => router.back()}
          className="flex items-center text-gray-600 hover:text-gray-800 mb-4"
        >
          <FaArrowLeft className="mr-2" />
          Back to Properties
        </button>
      </div>

      <div className="max-w-7xl mx-auto px-4 pb-12">
        {/* Property Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{displayName}</h1>
          <div className="flex items-center text-gray-600">
            <FaMapMarkerAlt className="mr-2" />
            <span>
              {property.address?.city || 'City not specified'}, 
              {property.address?.state || 'State not specified'}, 
              {property.address?.country || 'Country not specified'}
            </span>
            <span className="mx-2">•</span>
            <div className="flex items-center text-yellow-500">
              <FaStar className="mr-1" />
              <span className="font-semibold">{displayRating}</span>
            </div>
          </div>
        </div>

        {/* Main Image */}
        <div className="relative h-80 md:h-96 w-full mb-6 rounded-xl overflow-hidden">
          <Image
            src={displayImage}
            alt={displayName}
            fill
            className="object-cover"
            priority
            onError={(e) => {
              // Fallback if image fails to load
              e.currentTarget.src = '/assets/images/fallback-property.jpg';
            }}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Property Details */}
          <div className="lg:col-span-2">
            {/* Property Info Card */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
              <h2 className="text-2xl font-semibold mb-4">About this property</h2>
              
              {property.description && (
                <div className="mb-6">
                  <p className="text-gray-700 leading-relaxed">
                    {truncatedDescription}
                  </p>
                  {property.description.length > 200 && (
                    <button
                      onClick={() => setShowAllDescription(!showAllDescription)}
                      className="text-blue-600 font-medium mt-2"
                    >
                      {showAllDescription ? 'Show less' : 'Read more'}
                    </button>
                  )}
                </div>
              )}

              {/* Category Tags */}
              {displayCategory.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-6">
                  {displayCategory.map((cat, index) => (
                    <span
                      key={index}
                      className="bg-gray-100 text-gray-700 text-sm px-3 py-1 rounded-full"
                    >
                      {cat}
                    </span>
                  ))}
                </div>
              )}

              {/* Amenities */}
              <div className="border-t pt-6">
                <h3 className="text-xl font-semibold mb-4">What this place offers</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center">
                    <FaBed className="text-gray-600 mr-3 w-5" />
                    <span>{displayOffers.bed}</span>
                  </div>
                  <div className="flex items-center">
                    <FaBath className="text-gray-600 mr-3 w-5" />
                    <span>{displayOffers.shower}</span>
                  </div>
                  <div className="flex items-center">
                    <FaUserFriends className="text-gray-600 mr-3 w-5" />
                    <span>Sleeps {displayOffers.occupants}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Booking Widget */}
          <div className="lg:col-span-1">
            <div className="sticky top-6">
              <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <span className="text-2xl font-bold">${displayPrice}</span>
                    <span className="text-gray-600"> / night</span>
                  </div>
                  <div className="flex items-center text-yellow-500">
                    <FaStar className="mr-1" />
                    <span className="font-semibold">{displayRating}</span>
                  </div>
                </div>

                {property.discount && (
                  <div className="bg-red-100 text-red-800 px-3 py-2 rounded-lg mb-4 text-center">
                    <span className="font-semibold">{property.discount}</span>
                  </div>
                )}

                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 border rounded-lg p-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Check-in</label>
                      <input
                        type="date"
                        className="w-full outline-none bg-transparent text-sm"
                        placeholder="Add date"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Check-out</label>
                      <input
                        type="date"
                        className="w-full outline-none bg-transparent text-sm"
                        placeholder="Add date"
                      />
                    </div>
                  </div>

                  <div className="border rounded-lg p-3">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Guests</label>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">1 guest</span>
                      <div className="flex items-center space-x-2">
                        <button className="w-6 h-6 rounded-full border flex items-center justify-center hover:bg-gray-50 text-sm">
                          -
                        </button>
                        <span className="text-sm">1</span>
                        <button className="w-6 h-6 rounded-full border flex items-center justify-center hover:bg-gray-50 text-sm">
                          +
                        </button>
                      </div>
                    </div>
                  </div>

                  <button className="w-full bg-red-500 text-white py-3 rounded-lg font-semibold hover:bg-red-600 transition-colors">
                    Check availability
                  </button>

                  <div className="space-y-2 pt-4 border-t">
                    <div className="flex justify-between text-sm">
                      <span>${displayPrice} × 3 nights</span>
                      <span>${displayPrice * 3}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Cleaning fee</span>
                      <span>$50</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Service fee</span>
                      <span>$30</span>
                    </div>
                    <div className="flex justify-between font-semibold text-lg pt-2 border-t">
                      <span>Total</span>
                      <span>${displayPrice * 3 + 80}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetail;