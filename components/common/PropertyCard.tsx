import React from "react";
import { PropertyProps } from "@/interfaces";
import Image from "next/image";
import { FaStar, FaBed, FaBath, FaUserFriends } from "react-icons/fa";
import { FILTERS } from "@/constants";

interface PropertyCardProps {
    property: PropertyProps;
    key: string | number;
}

const PropertyCard: React.FC<PropertyCardProps> = ({property,key}) => {
    return (
        
        <div className="w-full max-w-[360px] rounded-2xl shadow hover:shadow-xl transition duration-300 bg-white">
            {/* Image */}
            <div className="relative">
                <Image
                    src={property.image}
                    alt={property.name}
                    width={400}
                    height={250}
                    key={key}
                    className="rounded-2xl object-cover"
                />
            </div>
            <div className="px-4 pt-4 pb-2 flex items-center space-x-3">
                {FILTERS.slice(0,3).map((filter) => (
                    <span
                        key={filter}
                        className="bg-gray-100 text-gray-700 text-[10px] px-2 py-1 rounded-full"
                    >
                        {filter}
                    </span>
                ))}
            </div>
            {/* Info */}
            <div className="px-4 py-3">
                <div className="flex justify-between items-center mb-1">
                    <h2 className="text-lg font-semibold">{property.name}</h2>
                    <div className="flex items-center gap-1 text-yellow-500">
                        <FaStar size={14} />
                        <span className="text-sm font-medium">{property.rating}</span>
                    </div>
                </div>
                <p className="text-gray-500 text-sm mb-3">Location Unknown</p>

                <div className="flex items-center justify-between mb-3">
                {/* Amenities (static for now) */}
                <div className="flex items-center text-gray-600 text-sm gap-4 ml-3">
                    <div className="flex items-center gap-1">
                        <FaBed /> <span>1</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <FaBath /> <span>1</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <FaUserFriends /> <span>3</span>
                    </div>
                </div>
                {/* Price */}
                <p className="text-lg font-bold text-gray-900">
                    ${property.price}<span className="text-sm font-medium text-gray-500">/n</span>
                </p>
                </div>
            </div>
        </div>
    );
};

export default PropertyCard;
