// pages/property/[id].tsx
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';
import { 
  FaStar,  
  FaMapMarkerAlt, 
  FaHome,
  FaArrowLeft
} from 'react-icons/fa';
import { PropertyProps } from '@/interfaces';
import BookingForm from '@/components/booking/BookingForm';
import CancellationPolicy from '@/components/booking/CancellationPolicy';
import ReviewSection from '@/components/property/ReviewSection';


const PropertyDetail = () => {
  const router = useRouter();
  const { id } = router.query;
  
  const [property, setProperty] = useState<PropertyProps | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPropertyData = async () => {
      if (!id) return;
      
      try {
        setLoading(true);
        setError(null);
        
        // Fetch property details
        const response = await axios.get(`/api/properties/${id}`);
        
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

  const displayName = property.name || 'Unnamed Property';
  const displayImage = property.image || '/assets/images/fallback-property.jpg';
  const displayRating = property.rating || 0;

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

        <div className="py-3">
          <BookingForm property={property}/>
        </div>
        <div>
            <CancellationPolicy />
        </div>
        <div>
            <ReviewSection propertyId={property.id ?? ''}/>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetail;