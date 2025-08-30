import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import Image from 'next/image';
import { FaStar, FaBed, FaBath, FaUserFriends, FaMapMarkerAlt, FaHeart, FaShare, FaCalendarAlt, FaUser } from 'react-icons/fa';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import ErrorMessage from '@/components/common/ErrorMessage';
import BookingForm from '@/components/booking/BookingForm';
import { Property, Review } from '@/types/api';


const PropertyDetail = () => {
  const router = useRouter();
  const { id } = router.query;
  
  const [property, setProperty] = useState<Property[] | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeImage, setActiveImage] = useState(0);
  const [showAllDescription, setShowAllDescription] = useState(false);

  useEffect(() => {
    const fetchPropertyData = async () => {
      if (!id) return;
      
      try {
        setLoading(true);
        setError(null);
        
        // Fetch property details
        const propertyResponse = await axios.get(`/api/properties/${id}`);
        
        setProperty(propertyResponse.data);
        console.log('propertiy detal',propertyResponse.data)
        // Fetch reviews
        const reviewsResponse = await axios.get(`/api/properties/${id}/reviews`);
        setReviews(reviewsResponse.data.reviews || []);
        
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
    return <LoadingSpinner />;
  }

  if (error || !property) {
    return <ErrorMessage message={error || 'Property not found'} onRetry={() => window.location.reload()} />;
  }

  const displayImages = property.images && property.images.length > 0 
    ? property.images 
    : [property.image];

  const truncatedDescription = property.description.length > 200 && !showAllDescription
    ? `${property.description.substring(0, 200)}...`
    : property.description;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header with title and actions */}
      <div className="flex justify-between items-start mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{property.title}</h1>
          <div className="flex items-center mt-2 text-gray-600">
            <FaMapMarkerAlt className="mr-2" />
            <span>{property.address.city}, {property.address.state}, {property.address.country}</span>
          </div>
        </div>
        <div className="flex space-x-4">
          <button className="p-2 rounded-full hover:bg-gray-100">
            <FaShare className="text-gray-600" />
          </button>
          <button className="p-2 rounded-full hover:bg-gray-100">
            <FaHeart className="text-gray-600" />
          </button>
        </div>
      </div>

      {/* Image Gallery */}
      <div className="relative h-96 w-full mb-8 rounded-xl overflow-hidden">
        <Image
          src={displayImages[activeImage]}
          alt={property.title}
          fill
          className="object-cover"
        />
        {displayImages.length > 1 && (
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
            {displayImages.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveImage(index)}
                className={`w-3 h-3 rounded-full ${
                  index === activeImage ? 'bg-white' : 'bg-white bg-opacity-50'
                }`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Thumbnail images if multiple images exist */}
      {displayImages.length > 1 && (
        <div className="flex space-x-2 mb-8 overflow-x-auto pb-4">
          {displayImages.map((image, index) => (
            <button
              key={index}
              onClick={() => setActiveImage(index)}
              className={`flex-shrink-0 w-24 h-20 rounded-lg overflow-hidden ${
                index === activeImage ? 'ring-2 ring-blue-500' : ''
              }`}
            >
              <Image
                src={image}
                alt={`${property.title} ${index + 1}`}
                width={96}
                height={80}
                className="object-cover w-full h-full"
              />
            </button>
          ))}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Property Details */}
        <div className="lg:col-span-2">
          {/* Property Header */}
          <div className="border-b pb-6 mb-6">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-2xl font-semibold">{property.name}</h2>
                <div className="flex items-center mt-2">
                  <div className="flex items-center text-yellow-500">
                    <FaStar className="mr-1" />
                    <span className="font-semibold">{property.rating}</span>
                  </div>
                  <span className="mx-2">·</span>
                  <span className="text-gray-600">{property.reviewCount} reviews</span>
                </div>
              </div>
              {property.discount && (
                <div className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-medium">
                  {property.discount}
                </div>
              )}
            </div>
          </div>

          {/* Host Information */}
          {property.host && (
            <div className="border-b pb-6 mb-6">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-full overflow-hidden">
                  <Image
                    src={property.host.avatar}
                    alt={property.host.name}
                    width={48}
                    height={48}
                    className="object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-semibold">Hosted by {property.host.name}</h3>
                  <p className="text-gray-600 text-sm">
                    Joined {new Date(property.host.joined).getFullYear()} · 
                    {property.host.responseRate}% response rate
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Property Description */}
          <div className="border-b pb-6 mb-6">
            <h3 className="text-xl font-semibold mb-4">About this property</h3>
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

          {/* Amenities */}
          <div className="border-b pb-6 mb-6">
            <h3 className="text-xl font-semibold mb-4">What this place offers</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center">
                <FaBed className="text-gray-600 mr-3" />
                <span>{property.offers.bed}</span>
              </div>
              <div className="flex items-center">
                <FaBath className="text-gray-600 mr-3" />
                <span>{property.offers.shower}</span>
              </div>
              <div className="flex items-center">
                <FaUserFriends className="text-gray-600 mr-3" />
                <span>Sleeps {property.offers.occupants}</span>
              </div>
              {property.category.map((cat, index) => (
                <div key={index} className="flex items-center">
                  <div className="w-5 h-5 bg-gray-200 rounded mr-3"></div>
                  <span>{cat}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Reviews Section */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-6">
              Reviews ({reviews.length})
            </h3>
            {reviews.length > 0 ? (
              <div className="space-y-6">
                {reviews.map((review) => (
                  <div key={review.id} className="border-b pb-6 last:border-b-0">
                    <div className="flex items-center mb-3">
                      <div className="w-10 h-10 rounded-full overflow-hidden mr-3">
                        <Image
                          src={review.userAvatar}
                          alt={review.userName}
                          width={40}
                          height={40}
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <h4 className="font-semibold">{review.userName}</h4>
                        <div className="flex items-center text-sm text-gray-600">
                          <span>{new Date(review.date).toLocaleDateString()}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center mb-2">
                      <div className="flex text-yellow-500">
                        {[...Array(5)].map((_, i) => (
                          <FaStar
                            key={i}
                            className={i < review.rating ? 'fill-current' : 'text-gray-300'}
                          />
                        ))}
                      </div>
                    </div>
                    <p className="text-gray-700">{review.comment}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-600">No reviews yet.</p>
            )}
          </div>
        </div>

        {/* Right Column - Booking Widget */}
        <div className="lg:col-span-1">
          <div className="sticky top-6">
            <BookingForm property={property} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetail;