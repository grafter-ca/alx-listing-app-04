import React, { useState } from "react";
import { PropertyProps, BookingDetails } from "@/interfaces";
import OrderSummary from "./OrderSummary";

interface BookingFormProps {
  property: PropertyProps;
}

const BookingForm: React.FC<BookingFormProps> = ({ property }) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    cardNumber: "",
    expiry: "",
    cvv: "",
    street: "",
    city: "",
    state: "",
    zip: "",
    country: "",
    checkin: "",
    checkout: "",
    totalNights: 0,
  });

  const [bookingDetails, setBookingDetails] = useState<BookingDetails | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => {
      let updated = { ...prev, [name]: value };

      // calculate nights automatically
      if (name === "checkin" || name === "checkout") {
        const checkinDate = new Date(updated.checkin);
        const checkoutDate = new Date(updated.checkout);

        if (checkinDate && checkoutDate && checkoutDate > checkinDate) {
          const diffTime = Math.abs(checkoutDate.getTime() - checkinDate.getTime());
          const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
          updated.totalNights = diffDays;
        } else {
          updated.totalNights = 0;
        }
      }

      return updated;
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const nights = formData.totalNights || 1;
    const pricePerNight = property.price || 0;
    const bookingFee = pricePerNight * nights;
    const propertyName=  property.name;


    const details: BookingDetails = {
      propertyName,
      checkin: formData.checkin,
      checkout: formData.checkout,
      totalNights: nights,
      pricePerNight,
      bookingFee,
      customer: {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        address: {
          street: formData.street,
          city: formData.city,
          state: formData.state,
          zip: formData.zip,
          country: formData.country,
        },
      },
      payment: {
        cardNumber: formData.cardNumber,
        expiry: formData.expiry,
        cvv: formData.cvv,
      },
    };

    setBookingDetails(details); // store in state
  };

  return (
    <section className="flex">
      <article className="bg-white p-6 shadow-md rounded-lg">
        <h2 className="text-xl font-semibold">Booking Detail</h2>
        <form onSubmit={handleSubmit}>
          {/* Contact Information */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label>First Name</label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className="border p-2 w-full mt-2"
                required
              />
            </div>
            <div>
              <label>Last Name</label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className="border p-2 w-full mt-2"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mt-4">
            <div>
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="border p-2 w-full mt-2"
                required
              />
            </div>
            <div>
              <label>Phone Number</label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="border p-2 w-full mt-2"
                required
              />
            </div>
          </div>

          {/* Payment Information */}
          <h2 className="text-xl font-semibold mt-6">Pay with</h2>
          <div className="mt-4">
            <label>Card Number</label>
            <input
              type="text"
              name="cardNumber"
              value={formData.cardNumber}
              onChange={handleChange}
              className="border p-2 w-full mt-2"
              required
            />
          </div>
          <div className="grid grid-cols-2 gap-4 mt-4">
            <div>
              <label>Expiration Date</label>
              <input
                type="text"
                name="expiry"
                value={formData.expiry}
                onChange={handleChange}
                className="border p-2 w-full mt-2"
                required
              />
            </div>
            <div>
              <label>CVV</label>
              <input
                type="text"
                name="cvv"
                value={formData.cvv}
                onChange={handleChange}
                className="border p-2 w-full mt-2"
                required
              />
            </div>
          </div>

          {/* Dates */}
          <div className="grid grid-cols-2 gap-4 mt-4">
            <div>
              <label>Check-in Date</label>
              <input
                type="date"
                name="checkin"
                value={formData.checkin}
                onChange={handleChange}
                className="border p-2 w-full mt-2"
                required
              />
            </div>
            <div>
              <label>Check-out Date</label>
              <input
                type="date"
                name="checkout"
                value={formData.checkout}
                onChange={handleChange}
                className="border p-2 w-full mt-2"
                required
              />
            </div>
          </div>

          {/* Nights + Summary */}
          <div className="mt-4">
            <label>Total Nights</label>
            <input
              type="text"
              name="totalNights"
              value={`${formData.totalNights} night(s)`}
              className="border p-2 w-full mt-2 bg-gray-100"
              readOnly
            />
          </div>
          <div className="mt-2 text-gray-700">
            <p>
              Price per night: <strong>${property.price}</strong>
            </p>
            <p>
              Total: <strong>${(property.price || 0) * (formData.totalNights || 0)}</strong>
            </p>
          </div>

          {/* Billing Address */}
          <h2 className="text-xl font-semibold mt-6">Billing Address</h2>
          <div className="mt-4">
            <label>Street Address</label>
            <input
              type="text"
              name="street"
              value={formData.street}
              onChange={handleChange}
              className="border p-2 w-full mt-2"
              required
            />
          </div>
          <div className="grid grid-cols-2 gap-4 mt-4">
            <div>
              <label>City</label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                className="border p-2 w-full mt-2"
                required
              />
            </div>
            <div>
              <label>State</label>
              <input
                type="text"
                name="state"
                value={formData.state}
                onChange={handleChange}
                className="border p-2 w-full mt-2"
                required
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 mt-4">
            <div>
              <label>Zip Code</label>
              <input
                type="text"
                name="zip"
                value={formData.zip}
                onChange={handleChange}
                className="border p-2 w-full mt-2"
                required
              />
            </div>
            <div>
              <label>Country</label>
              <input
                type="text"
                name="country"
                value={formData.country}
                onChange={handleChange}
                className="border p-2 w-full mt-2"
                required
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="mt-6 bg-teal-600 hover:bg-teal-700 text-white py-2 px-4 rounded-md w-full"
          >
            Confirm & Pay
          </button>
        </form>
      </article>

      {/* Order Summary shows after form submission */}
      {bookingDetails && (
        <article className="py-6 px-4">
          <OrderSummary bookingDetails={bookingDetails} />
        </article>
      )}
    </section>
  );
};

export default BookingForm;
