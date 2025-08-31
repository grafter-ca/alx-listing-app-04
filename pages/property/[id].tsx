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
import { PropertyProps } from '@/interfaces';
import PropertyDetail from '@/components/property/PropertyDetail';


const PropertyDetailPage = () => {
  const router = useRouter();
  const { id } = router.query;
  
  const [property, setProperty] = useState<PropertyProps | null>(null);
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

  const displayName = property.name || 'Unnamed Property';
  const displayImage = property.image || '/assets/images/fallback-property.jpg';
  const displayPrice = property.price || 0;
  const displayRating = property.rating || 0;
  const displayCategory = property.category || [];
  const displayOffers = property.offers || { bed: 'Not specified', shower: 'Not specified', occupants: 'Not specified' };

  return (
    <div className="min-h-screen bg-white">
        <div>
           <PropertyDetail />
        </div>
          </div>
  );
};

export default PropertyDetailPage;