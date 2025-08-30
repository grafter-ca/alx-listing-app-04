import React from "react";

interface PillProps {
    label: string;
    isActive: boolean;
    onClick: () => void;
}

const Pill: React.FC<PillProps> = ({ label, isActive, onClick }) => {
    return (
        <button
            onClick={onClick}
            className={`px-4 py-2 rounded-full border transition 
            ${isActive
                ? "bg-gray-800 text-white border-gray-800"
                : "bg-white text-gray-800 border-gray-300 hover:bg-gray-100"}`}
        >
            {label}
        </button>
    );
};

export default Pill;
