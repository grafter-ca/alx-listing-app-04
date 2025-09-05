// pages/api/properties/[id]/reviews.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { mockReviews } from '@/lib/mockData';
import { Review } from '@/types/api';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;
  const { method } = req;

  // GET - Fetch reviews for a property
  if (method === 'GET') {
    try {
      if (!id) {
        return res.status(400).json({
          success: false,
          error: 'Property ID is required'
        });
      }

      const propertyReviews = mockReviews.filter(review => review.propertyId === id);

      if (propertyReviews.length === 0) {
        return res.status(200).json({
          success: true,
          reviews: [],
          total: 0,
          averageRating: 0,
          message: 'No reviews found for this property'
        });
      }

      const averageRating = calculateAverageRating(propertyReviews);

      return res.status(200).json({
        success: true,
        reviews: propertyReviews,
        total: propertyReviews.length,
        averageRating
      });

    } catch (error) {
      console.error('Reviews API Error:', error);
      return res.status(500).json({
        success: false,
        error: 'Failed to fetch reviews'
      });
    }
  }

  // POST - Submit a new review
  if (method === 'POST') {
    try {
      if (!id) {
        return res.status(400).json({
          success: false,
          error: 'Property ID is required'
        });
      }

      const { rating, comment, userName = 'Anonymous' } = req.body;

      // Validate input
      if (!rating || !comment) {
        return res.status(400).json({
          success: false,
          error: 'Rating and comment are required'
        });
      }

      if (rating < 1 || rating > 5) {
        return res.status(400).json({
          success: false,
          error: 'Rating must be between 1 and 5'
        });
      }

      // Create new review
      const newReview = {
        id: `review_${Date.now()}`,
        propertyId: id as string,
        userId: `user_${Date.now()}`,
        userName,
        userAvatar: '',
        rating: Number(rating),
        comment: comment.trim(),
        date: new Date(),
      };

      // Add to mock data
      mockReviews.push(newReview);

      return res.status(201).json({
        success: true,
        review: newReview,
        message: 'Review submitted successfully'
      });

    } catch (error) {
      console.error('Submit Review Error:', error);
      return res.status(500).json({
        success: false,
        error: 'Failed to submit review'
      });
    }
  }

  // Handle other HTTP methods
  res.setHeader('Allow', ['GET', 'POST']);
  return res.status(405).json({
    success: false,
    error: `Method ${method} Not Allowed`
  });
}

// Helper function to calculate average rating
function calculateAverageRating(reviews: Review[]) {
  if (reviews.length === 0) return 0;
  const total = reviews.reduce((sum, review) => sum + review.rating, 0);
  return Math.round((total / reviews.length) * 10) / 10;
}