// pages/api/properties/[id].ts
import { NextApiRequest, NextApiResponse } from 'next';
import { mockProperties } from '@/lib/mockData';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  // Check if ID is provided
  if (!id) {
    return res.status(400).json({ 
      success: false, 
      error: 'Property ID is required' 
    });
  }

  try {
    // Find the property by ID
    const property = mockProperties.find(p => p.id === id);
    
    if (!property) {
      return res.status(404).json({ 
        success: false, 
        error: 'Property not found' 
      });
    }
    
    // Return the property data
    return res.status(200).json({
      success: true,
      data: property
    });
    
  } catch (error) {
    console.error('API Error:', error);
    return res.status(500).json({ 
      success: false, 
      error: 'Internal server error' 
    });
  }
}