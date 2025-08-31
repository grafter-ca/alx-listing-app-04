// pages/api/bookings.ts
import { NextApiRequest, NextApiResponse } from "next";
import { mockProperties, mockBookings } from "@/lib/mockData";
import { Booking } from "@/types/api";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    if(req.method === 'GET'){
        return res.json({message: 'Our Booking is working well'})
    }
    return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
  }

  

  try {
    const { propertyId, checkIn, checkOut, guests, user } = req.body;
    // Validate required fields
    if (!propertyId || !checkIn || !checkOut || !guests || !user) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    // Check if property exists
    const property = mockProperties.find(p => p.id === propertyId);
    if (!property) {
      return res.status(404).json({ error: 'Property not found' });
    }
    // Calculate total price
    const nights = Math.ceil(
      (new Date(checkOut).getTime() - new Date(checkIn).getTime()) / 
      (1000 * 60 * 60 * 24)
    );
    const totalPrice = nights * property.price;
    // Create new booking
    const newBooking: Booking = {
      id: (mockBookings.length + 1).toString(),
      propertyId,
      checkIn: new Date(checkIn),
      checkOut: new Date(checkOut),
      guests,
      totalPrice,
      user,
      status: 'confirmed'
    };

    mockBookings.push(newBooking);

    return res.status(201).json({
      success: true,
      bookingId: newBooking.id,
      booking: newBooking,
      message: 'Booking confirmed successfully',
    });

  } catch (error) {
    console.error('Booking API Error:', error);
    return res.status(500).json({ error: 'Failed to create booking' });
  }
}