import BookingForm from "@/components/booking/BookingForm";
import CancellationPolicy from "@/components/booking/CancellationPolicy";
import OrderSummary from "@/components/booking/OrderSummary";

export default function BookingPage() {
  const bookingDetails = {
    propertyName: "Villa Arrecife Beach House",
    price: 7500,
    bookingFee: 65,
    totalNights: 3,
    startDate: "24 August 2024",
  };

  return (
    <div className="container mx-auto p-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pt-10">
        <BookingForm />
        <OrderSummary bookingDetails={bookingDetails} />

      </div>
        <div className="col-span-2 py-10">
          <CancellationPolicy />
          <div className="mt-6">
            <h2 className="text-xl font-semibold">Contact Host</h2>
            <p className="mt-2 text-gray-600">
              If you have any questions or special requests, feel free to contact the host.
            </p>
          </div>
        </div>
    </div>
  );
}
