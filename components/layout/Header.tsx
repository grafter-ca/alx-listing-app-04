import React from "react";
import Image from "next/image";
import { useRouter } from "next/router";


const accommodationTypes = [
  { name: "Rooms", icon: "/assets/icons/barn 1.png" },
  { name: "Mansion", icon: "/assets/icons/barn 1.png" },
  { name: "Countryside", icon: "/assets/icons/barn 1.png" },
  { name: "Villa", icon: "/assets/icons/barn 1.png" },
  { name: "Tropical", icon: "/assets/icons/barn 1.png" },
  { name: "New", icon: "/assets/icons/barn 1.png" },
  { name: "Amazing pool", icon: "/assets/icons/barn 1.png" },
  { name: "Beach house", icon: "/assets/icons/barn 1.png" },
  { name: "Island", icon: "/assets/icons/barn 1.png" },
  { name: "Camping", icon: "/assets/icons/barn 1.png" },
  { name: "Apartment", icon: "/assets/icons/barn 1.png" },
  { name: "House", icon: "/assets/icons/barn 1.png" },
  { name: "Lakefront", icon: "/assets/icons/barn 1.png" },
  { name: "Farm house", icon: "/assets/icons/barn 1.png" },
  { name: "Treehouse", icon: "/assets/icons/barn 1.png" },
  { name: "Cabins", icon: "/assets/icons/barn 1.png" },
  { name: "Castles", icon: "/assets/icons/barn 1.png" },
  { name: "Lakeside", icon: "/assets/icons/barn 1.png", disabled: true },
];

const Header: React.FC = () => {
    const router = useRouter()
  return (
    <header className="w-full bg-white shadow-xs">
      {/* Top info bar */}
      <div className="bg-teal-600 text-white blocklg:flex items-center justify-center py-2 text-sm">
        <span className="mr-2">👜</span>
        Overseas trip? Get the latest information on travel guides
        <button className="ml-4 px-3 py-1 bg-black text-white rounded-full text-xs mt-2 lg:mt-0">
          More Info
        </button>
      </div>

      {/* Main nav */}
      <div className="hidden lg:flex items-center justify-between px-8 py-4">
        {/* Logo */}
        <div className="flex items-center">
          <Image
            src="/assets/Logp Showcase.png"
            alt="Logo"
            width={58.73}
            height={30.6}
            className="mr-2"
          />
        </div>

        {/* Search bar */}
        <form className="flex items-center justify-between bg-white rounded-full shadow-lg px-3 py-2 w-full max-w-4xl mx-auto border border-gray-200">
          <div className="flex flex-col px-3">
            <label
              htmlFor="location"
              className="text-gray-800 font-semibold text-sm mb-1"
            >
              Location
            </label>
            <input
              id="location"
              type="text"
              placeholder="Search destinations"
              className="bg-transparent text-xs text-gray-700 placeholder-gray-300 outline-none"
            />
          </div>
          <div className="flex flex-col px-3">
            <label
              htmlFor="checkin"
              className="text-gray-800 font-semibold text-sm mb-1"
            >
              Check in
            </label>
            <input
              id="checkin"
              type="text"
              placeholder="Add date"
              className="bg-transparent text-xs text-gray-700 placeholder-gray-300 outline-none"
            />
          </div>
          <div className="flex flex-col px-3">
            <label
              htmlFor="checkout"
              className="text-gray-800 font-semibold text-sm mb-1"
            >
              Check out
            </label>
            <input
              id="checkout"
              type="text"
              placeholder="Add date"
              className="bg-transparent text-xs text-gray-700 placeholder-gray-300 outline-none"
            />
          </div>
          <div className="flex flex-col px-3">
            <label
              htmlFor="guests"
              className="text-gray-800 font-semibold text-sm mb-1"
            >
              Guests
            </label>
            <input
              id="guests"
              type="text"
              placeholder="Add guests"
              className="bg-transparent text-xs text-gray-700 placeholder-gray-300 outline-none"
            />
          </div>
          {/* Search button */}
          <button
            type="submit"
            className="ml-3 bg-yellow-400 hover:bg-yellow-500 text-white rounded-full p-3 flex items-center justify-center"
            aria-label="Search"
          >
            <svg
              width="20"
              height="20"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </button>
        </form>

        {/* Auth buttons desktop*/}
        <div className="flex gap-3">
          <button
            type="button"
            className="px-6 py-2 rounded-full bg-teal-600 text-white font-semibold hover:bg-teal-700"
          >
            Sign in
          </button>
          <button
            type="button"
            className="px-6 py-2 rounded-full border border-gray-400 text-gray-800 font-semibold hover:bg-gray-100"
          >
            Sign up
          </button>
        </div>
      </div>
      {/* mobile navigations*/}
      <nav className="flex lg:hidden flex-col space-y-4 py-4 px-2">
        <div className="flex justify-between">
          <div className="flex items-center">
            <Image
              src="/assets/Logp Showcase.png"
              alt="Logo"
              width={58.73}
              height={30.6}
              className="mr-2"
              onClick={()=> router.push('/')}
            />
          </div>
          <div className="flex gap-3">
            <button
              type="button"
              className="px-6 py-2 rounded-full bg-teal-600 text-white font-semibold hover:bg-teal-700"
            >
              Sign in
            </button>
            <button
              type="button"
              className="px-6 py-2 rounded-full border border-gray-400 text-gray-800 font-semibold hover:bg-yellow-400 hover:text-white"
            >
              Sign up
            </button>
          </div>
        </div>

        {/* Search bar */}
        <form className="relative flex flex-col items-center bg-white rounded-md shadow-xs px-3 space-y-4 py-2 w-full max-w-4xl mx-auto border border-gray-100">
          <section className=" px-3 space-y-4">
          <div className="flex items-center justify-center">
          <div className="flex flex-col px-3">
            <label
              htmlFor="location"
              className="text-gray-800 font-semibold text-sm mb-1"
            >
              Location
            </label>
            <input
              id="location"
              type="text"
              placeholder="Search destinations"
              className="bg-transparent text-xs text-gray-700 placeholder-gray-300 outline-none"
            />
          </div>
          <div className="flex flex-col px-3">
            <label
              htmlFor="guests"
              className="text-gray-800 font-semibold text-sm mb-1"
            >
              Guests
            </label>
            <input
              id="guests"
              type="text"
              placeholder="Add guests"
              className="bg-transparent text-xs text-gray-700 placeholder-gray-300 outline-none"
            />
          </div>
          </div>

          <div className="flex items-center justify-center">    
          <div className="flex flex-col px-3">
            <label
              htmlFor="checkin"
              className="text-gray-800 font-semibold text-sm mb-1"
            >
              Check in
            </label>
            <input
              id="checkin"
              type="text"
              placeholder="Add date"
              className="bg-transparent text-xs text-gray-700 placeholder-gray-300 outline-none"
            />
          </div>
          <div className="flex flex-col px-3">
            <label
              htmlFor="checkout"
              className="text-gray-800 font-semibold text-sm mb-1"
            >
              Check out
            </label>
            <input
              id="checkout"
              type="text"
              placeholder="Add date"
              className="bg-transparent text-xs text-gray-700 placeholder-gray-300 outline-none"
            />
          </div>
          </div>
          </section>
          
          {/* Search button */}
          <button
            type="submit"
            className="absolute bottom-4 right-4 bg-yellow-400 hover:bg-yellow-500 text-white rounded-full p-3 flex items-center justify-between max-w-32"
            aria-label="Search"
            title="Submit"
          >
            <svg
              width="20"
              height="20"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </button>
        </form>
      </nav>

      {/* Accommodation types */}
      <nav className="free-animation flex items-center space-x-3 px-2 py-6 overflow-x-auto border-t-2 border-gray-300 mx-auto">
        {accommodationTypes.map((type) => (
          <div
            key={type.name}
            className={`flex flex-col items-center min-w-[70px] ${
              type.disabled
                ? "opacity-30"
                : "hover:text-teal-600 cursor-pointer"
            }`}
            {...(type.disabled ? { "aria-disabled": "true" } : {})}
          >
            <Image
              src={type.icon}
              alt={type.name}
              width={32}
              height={32}
              className="mb-1"
            />
            <span className="text-xs text-center">{type.name}</span>
          </div>
        ))}
      </nav>
    </header>
  );
};

export default Header;
