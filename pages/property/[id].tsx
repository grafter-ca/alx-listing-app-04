// pages/property/[id].tsx
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

import { PropertyProps } from '@/interfaces';
import PropertyDetail from '@/components/property/PropertyDetail';


const PropertyDetailPage = () => {
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

  return (
    <div className="min-h-screen bg-white">
        <div>
           <PropertyDetail />
        </div>
          </div>
  );
};

export default PropertyDetailPage;