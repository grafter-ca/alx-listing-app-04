// pages/api/properties.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { mockProperties } from '@/lib/mockData';
import { PROPERTYLISTINGSAMPLE } from '@/constants';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { method } = req;
    
    if (method === 'GET') {
      // Handle query parameters
      const { limit, offset } = req.query;
      const limitNum = parseInt(limit as string) || 10;
      const offsetNum = parseInt(offset as string) || 0;
      
      // Get paginated properties
      const paginatedProperties = mockProperties.slice(offsetNum, offsetNum + limitNum);
      
      return res.status(200).json({
        properties: paginatedProperties,
        total: mockProperties.length,
        limit: limitNum,
        offset: offsetNum
      });
    }
    
    // Handle other HTTP methods
    res.setHeader('Allow', ['GET']);
    return res.status(405).end(`Method ${method} Not Allowed`);
    
  } catch (error) {
    console.error('API Error:', error);
    return res.status(500).json({ 
      error: 'Failed to fetch properties',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}
