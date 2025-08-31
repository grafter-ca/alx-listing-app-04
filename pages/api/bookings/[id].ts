// pages/api/bookings.ts
import { NextApiRequest, NextApiResponse } from "next";
import { mockBookings } from "@/lib/mockData";

export const getBookingById = (req: NextApiRequest, res: NextApiResponse,{params}:{params:{id:string}}) =>{
  try {
    // Check if property exists
    
    const Bookings = mockBookings.find(b=> b.id === params.id);
    if (!Bookings) {
      return res.status(404).json({ error: 'Property not found' });
    }
    return res.status(201).json({
      success: true,
      booking: Bookings,
      message: 'Booking fetched successfully',
    });

  } catch (error) {
    console.error('Booking API Error:', error);
    return res.status(500).json({ error: 'Failed to get booking' });
  }
}