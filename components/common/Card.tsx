import React from "react";
import { CardProps } from "../../interfaces";

const Card: React.FC<CardProps> = ({ title, description, imageUrl, price }) => {
  return (
    <div className="w-full rounded overflow-hidden shadow-lg hover:shadow-xl transition">
      <img
        className="w-full h-48 object-cover"
        src={imageUrl}
        alt={title}
      />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{title}</div>
        <p className="text-gray-700 text-base">{description}</p>
        <p className="text-gray-900 font-semibold mt-2">${price} / night</p>
      </div>
    </div>
  );
};

export default Card;
