// components/reviews/ReviewSection.tsx
import React, { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import { FaStar, FaUser, FaRegSmile, FaRegFrown, FaRegMeh } from 'react-icons/fa';
import ReviewForm from '../common/ReviewForm';
import Image from 'next/image';

interface Review {
  id: string;
  propertyId: string;
  userId: string;
  userName: string;
  userAvatar: string;
  rating: number;
  comment: string;
  date: string;
}

interface ReviewSectionProps {
  propertyId: string;
}

const ReviewSection: React.FC<ReviewSectionProps> = ({ propertyId }) => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [averageRating, setAverageRating] = useState(0);
  const [totalReviews, setTotalReviews] = useState(0);
  const [showReviewForm, setShowReviewForm] = useState(false);

const fetchReviews = useCallback(async () => {
  if (!propertyId) return;

  try {
    setLoading(true);
    setError(null);

    const response = await axios.get(`/api/properties/${propertyId}/reviews`);

    if (response.data.success) {
      setReviews(response.data.reviews || []);
      setAverageRating(response.data.averageRating || 0);
      setTotalReviews(response.data.total || 0);
    } else {
      throw new Error(response.data.error || 'Failed to load reviews');
    }
  } catch (err) {
    console.error('Error fetching reviews:', err);
    setError('Failed to load reviews. Please try again.');
  } finally {
    setLoading(false);
  }
}, [propertyId]); //dependency

useEffect(() => {
  fetchReviews();
}, [fetchReviews]); //call our function here


  const handleSubmitReview = async (reviewData: { rating: number; comment: string }) => {
    try {
      const response = await axios.post(`/api/properties/${propertyId}/reviews`, reviewData);
      
      if (response.data.success) {
        // Refresh reviews
        await fetchReviews();
        setShowReviewForm(false);
      } else {
        throw new Error(response.data.error || 'Failed to submit review');
      }
    } catch (err) {
      console.error('Error submitting review:', err);
      setError('Failed to submit review. Please try again.');
    }
  };

  // Group reviews by rating
  const ratingDistribution = [0, 0, 0, 0, 0]; // 1-5 stars
  reviews.forEach(review => {
    if (review.rating >= 1 && review.rating <= 5) {
      ratingDistribution[5 - review.rating]++;
    }
  });

  const getRatingIcon = (rating: number) => {
    if (rating >= 4) return <FaRegSmile className="text-green-500" />;
    if (rating >= 3) return <FaRegMeh className="text-yellow-500" />;
    return <FaRegFrown className="text-red-500" />;
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h2 className="text-2xl font-semibold mb-6">Guest Reviews</h2>

      {/* Rating Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="text-center">
          <div className="text-4xl font-bold text-gray-900">{averageRating}</div>
          <div className="flex justify-center items-center mt-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <FaStar
                key={star}
                className={`w-5 h-5 ${
                  star <= Math.round(averageRating)
                    ? 'text-yellow-400 fill-current'
                    : 'text-gray-300'
                }`}
              />
            ))}
          </div>
          <p className="text-gray-600 mt-2">{totalReviews} review{totalReviews !== 1 ? 's' : ''}</p>
        </div>

        <div className="md:col-span-2">
          {[5, 4, 3, 2, 1].map((rating) => (
            <div key={rating} className="flex items-center mb-2">
              <span className="w-16 text-sm text-gray-600">{rating} star{rating !== 1 ? 's' : ''}</span>
              <div className="flex-1 bg-gray-200 rounded-full h-2 mx-2">
                <div
                  className="bg-yellow-400 h-2 rounded-full"
                  style={{
                    width: `${totalReviews > 0 ? (ratingDistribution[5 - rating] / totalReviews) * 100 : 0}%`
                  }}
                ></div>
              </div>
              <span className="w-16 text-sm text-gray-600 text-right">
                {totalReviews > 0 ? Math.round((ratingDistribution[5 - rating] / totalReviews) * 100) : 0}%
              </span>
            </div>
          ))}
        </div>
      </div>

      {error && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4 mb-6">
          <p className="text-yellow-800">{error}</p>
        </div>
      )}

      {/* Write Review Button */}
      {!showReviewForm && (
        <div className="mb-6">
          <button
            onClick={() => setShowReviewForm(true)}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >
            Write a Review
          </button>
        </div>
      )}

      {/* Review Form */}
      {showReviewForm && (
        <ReviewForm
          propertyId={propertyId}
          onSubmit={handleSubmitReview}
          onCancel={() => setShowReviewForm(false)}
        />
      )}

      {/* Reviews List */}
      {reviews.length > 0 ? (
        <div className="space-y-6">
          {reviews.map((review) => (
            <div key={review.id} className="border-b border-gray-100 pb-6 last:border-b-0 last:pb-0">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center mr-3">
                    {review.userAvatar ? (
                      <Image
                        src={review.userAvatar}
                        alt={review.userName}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                    ) : (
                      <FaUser className="text-gray-400" />
                    )}
                  </div>
                  <div>
                    <h4 className="font-semibold">{review.userName}</h4>
                    <div className="flex items-center text-sm text-gray-600">
                      <span>{new Date(review.date).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center">
                  {getRatingIcon(review.rating)}
                </div>
              </div>
              
              <div className="flex items-center mb-3">
                <div className="flex text-yellow-500">
                  {[...Array(5)].map((_, i) => (
                    <FaStar
                      key={i}
                      className={`w-4 h-4 ${i < review.rating ? 'fill-current' : 'text-gray-300'}`}
                    />
                  ))}
                </div>
              </div>
              
              <p className="text-gray-700 leading-relaxed">{review.comment}</p>
            </div>
          ))}
        </div>
      ) : (
        !showReviewForm && (
          <div className="text-center py-8">
            <div className="text-gray-400 mb-4">
              <FaUser className="w-12 h-12 mx-auto" />
            </div>
            <p className="text-gray-500">No reviews yet for this property.</p>
            <p className="text-gray-400 text-sm mt-1">Be the first to leave a review!</p>
          </div>
        )
      )}
    </div>
  );
};

export default ReviewSection;