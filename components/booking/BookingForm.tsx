import React, { useState } from "react";
import { PropertyProps, BookingDetails } from "@/interfaces";
import OrderSummary from "./OrderSummary";
import axios from "axios";

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
  const [loading,setLoading]=useState(false)
  const [error,setError] = useState("")

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    const nights = formData.totalNights || 1;
    const pricePerNight = property.price || 0;
    const bookingFee = pricePerNight * nights;
    const propertyName = property.name;
  
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
    setLoading(true);
    setError("");
  
    try {
      const response = await axios.post("/api/bookings", formData);
      alert("Booking confirmed!");
      console.log(response.data)
    } catch (error) {
      setError("Failed to submit booking.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="block lg:flex items-center justify-between gap-8 p-4">
  {/* Booking Form */}
  <article className="bg-white  flex-1 p-6 shadow-lg rounded-2xl">
    <h2 className="text-2xl font-bold mb-4 text-gray-800">Booking Details</h2>
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Contact Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">First Name</label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            className="mt-1 block w-full rounded-lg border border-gray-300 p-2 focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Last Name</label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            className="mt-1 block w-full rounded-lg border border-gray-300 p-2 focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="mt-1 block w-full rounded-lg border border-gray-300 p-2 focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Phone</label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="mt-1 block w-full rounded-lg border border-gray-300 p-2 focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
            required
          />
        </div>
      </div>

      {/* Payment Info */}
      <h3 className="text-lg font-semibold text-gray-800">Payment Information</h3>
      <div>
        <label className="block text-sm font-medium text-gray-700">Card Number</label>
        <input
          type="text"
          name="cardNumber"
          value={formData.cardNumber}
          onChange={handleChange}
          className="mt-1 block w-full rounded-lg border border-gray-300 p-2 focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
          required
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Expiry</label>
          <input
            type="text"
            name="expiry"
            value={formData.expiry}
            onChange={handleChange}
            className="mt-1 block w-full rounded-lg border border-gray-300 p-2 focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">CVV</label>
          <input
            type="text"
            name="cvv"
            value={formData.cvv}
            onChange={handleChange}
            className="mt-1 block w-full rounded-lg border border-gray-300 p-2 focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
            required
          />
        </div>
      </div>

      {/* Dates */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Check-in</label>
          <input
            type="date"
            name="checkin"
            value={formData.checkin}
            onChange={handleChange}
            className="mt-1 block w-full rounded-lg border border-gray-300 p-2 focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Check-out</label>
          <input
            type="date"
            name="checkout"
            value={formData.checkout}
            onChange={handleChange}
            className="mt-1 block w-full rounded-lg border border-gray-300 p-2 focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
            required
          />
        </div>
      </div>

      {/* Total Nights */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Total Nights</label>
        <input
          type="text"
          name="totalNights"
          value={`${formData.totalNights} night(s)`}
          readOnly
          className="mt-1 block w-full rounded-lg border border-gray-200 bg-gray-100 p-2 text-gray-700"
        />
      </div>
      <p className="text-gray-700">
        Price per night: <strong>${property.price}</strong>
      </p>
      <p className="text-gray-900 font-semibold">
        Total: ${(property.price || 0) * (formData.totalNights || 0)}
      </p>

      {/* Billing */}
      <h3 className="text-lg font-semibold text-gray-800">Billing Address</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          type="text"
          name="street"
          placeholder="Street Address"
          value={formData.street}
          onChange={handleChange}
          className="col-span-2 mt-1 block w-full rounded-lg border border-gray-300 p-2 focus:ring-2 focus:ring-teal-500"
          required
        />
        <input
          type="text"
          name="city"
          placeholder="City"
          value={formData.city}
          onChange={handleChange}
          className="mt-1 block w-full rounded-lg border border-gray-300 p-2 focus:ring-2 focus:ring-teal-500"
          required
        />
        <input
          type="text"
          name="state"
          placeholder="State"
          value={formData.state}
          onChange={handleChange}
          className="mt-1 block w-full rounded-lg border border-gray-300 p-2 focus:ring-2 focus:ring-teal-500"
          required
        />
        <input
          type="text"
          name="zip"
          placeholder="Zip"
          value={formData.zip}
          onChange={handleChange}
          className="mt-1 block w-full rounded-lg border border-gray-300 p-2 focus:ring-2 focus:ring-teal-500"
          required
        />
        <input
          type="text"
          name="country"
          placeholder="Country"
          value={formData.country}
          onChange={handleChange}
          className="mt-1 block w-full rounded-lg border border-gray-300 p-2 focus:ring-2 focus:ring-teal-500"
          required
        />
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={loading}
        className="w-full mt-6 rounded-lg bg-teal-600 py-3 px-4 font-semibold text-white shadow-md hover:bg-teal-700 focus:ring-2 focus:ring-teal-500 focus:ring-offset-1"
      >
        {loading ? "Processing..." : "Confirm & Pay"}
      </button>
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </form>
  </article>

  {/* Order Summary */}
  {bookingDetails && (
    <article className="bg-gray-50 p-6 shadow-lg rounded-2xl">
      <OrderSummary bookingDetails={bookingDetails} />
    </article>
  )}
</section>

  );
};

export default BookingForm;
