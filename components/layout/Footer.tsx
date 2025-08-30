import React from 'react';
import Image from 'next/image';

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#232323] text-[#e0e0e0] pt-12 pb-4 px-4">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Logo and Description */}
        <div className="md:col-span-1 flex flex-col">
          <div className="mb-4">
            <Image
              src="/assets/Logp Showcase.png"
              alt="ALX Logo"
              width={60}
              height={60}
              className="mb-2"
            />
          </div>
          <p className="text-base leading-relaxed">
            ALX is a platform where travelers can discover and book unique, comfortable, and affordable lodging options worldwide. From cozy city apartments and tranquil countryside retreats to exotic beachside villas, ALX connects you with the perfect place to stay for any trip.
          </p>
        </div>
        {/* Explore */}
        <div>
          <h3 className="text-lg font-normal mb-3 text-white">Explore</h3>
          <ul className="space-y-2">
            <li>Apartments in Dubai</li>
            <li>Hotels in New York</li>
            <li>Villa in Spain</li>
            <li>Mansion in Indonesia</li>
          </ul>
        </div>
        {/* Company */}
        <div>
          <h3 className="text-lg font-normal mb-3 text-white">Company</h3>
          <ul className="space-y-2">
            <li>About us</li>
            <li>Blog</li>
            <li>Career</li>
            <li>Customers</li>
            <li>Brand</li>
          </ul>
        </div>
        {/* Help */}
        <div>
          <h3 className="text-lg font-normal mb-3 text-white">Help</h3>
          <ul className="space-y-2">
            <li>Support</li>
            <li>Cancel booking</li>
            <li>Refunds Process</li>
          </ul>
        </div>
      </div>
      {/* Notice */}
      <div className="max-w-7xl mx-auto mt-10 border-t border-[#444] pt-6 flex flex-col md:flex-row md:items-center md:justify-between text-sm">
        <div className="mb-4 md:mb-0 text-[#e0e0e0]">
          Some hotel requires you to cancel more than 24 hours before check-in. Details{' '}
          <a href="#" className="text-[#2ec4b6] underline hover:text-[#20b2aa]">here</a>
        </div>
        <div className="flex flex-wrap gap-x-8 gap-y-2 text-[#e0e0e0]">
          <a href="#" className="hover:underline">Terms of Service</a>
          <a href="#" className="hover:underline">Policy service</a>
          <a href="#" className="hover:underline">Cookies Policy</a>
          <a href="#" className="hover:underline">Partners</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;