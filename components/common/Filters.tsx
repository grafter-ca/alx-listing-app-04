"use client";

import { FILTERS ,sortOptions} from "@/constants";
import React, { useState } from "react";
import Pill from "./Pill";
import { Funnel } from "lucide-react";

const Filters: React.FC = () => {
    const [activeFilter, setActiveFilter] = useState<string | null>(null);
    const [sortBy, setSortBy] = useState<string>(sortOptions[0]);
    const [showSortDropdown, setShowSortDropdown] = useState(false);

    return (
        <section className="flex justify-between px-3 lg:px-8">
            {/* Left: Filter Pills */}
            <div className="block w-48 lg:w-fit lg:flex space-x-2 space-y-3 lg:space-y-0  ">
                <button
                    onClick={() => setActiveFilter(null)}
                    className={`px-4 py-2 rounded-full border text-sm whitespace-nowrap transition
                    ${
                        !activeFilter
                            ? "border-green-500 text-green-500"
                            : "border-gray-300 text-gray-700 hover:bg-gray-100"
                    }`}
                >
                    All
                </button>

                {FILTERS.map((filter) => (
                    <Pill
                        key={filter}
                        label={filter}
                        isActive={activeFilter === filter}
                        onClick={() =>
                            setActiveFilter(
                                activeFilter === filter ? null : filter
                            )
                        }
                    />
                ))}
            </div>

            {/* Right: Filter Button & Sort Dropdown */}
            <div className="block lg:flex items-center justify-center  space-y-3 lg:space-y-0 gap-3 relative">
                {/* Filter Button */}
                <button
                    className="flex items-center gap-1 px-4 py-2 rounded-full border border-gray-300 text-gray-700 hover:bg-gray-100 transition"
                >
                    <p className="text-sm">Filter</p>
                    <Funnel size={14} />
                </button>

                {/* Sort Dropdown */}
                <div className="relative">
                    <button
                        onClick={() => setShowSortDropdown(!showSortDropdown)}
                        className="px-2 py-2 rounded-full border border-gray-300 text-gray-700 text-sm flex items-center gap-1 hover:bg-gray-100 transition"
                    >
                        Sort by: {sortBy}
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className={`w-4 h-4 transition-transform ${
                                showSortDropdown ? "rotate-180" : ""
                            }`}
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                            />
                        </svg>
                    </button>

                    {showSortDropdown && (
                        <ul className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-10">
                            {sortOptions.map((option) => (
                                <li
                                    key={option}
                                    onClick={() => {
                                        setSortBy(option);
                                        setShowSortDropdown(false);
                                    }}
                                    className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                                >
                                    {option}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
        </section>
    );
};

export default Filters;
