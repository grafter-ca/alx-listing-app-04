import PropertyCard from "@/components/common/PropertyCard";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Property } from "@/types/api";
import Link from "next/link";
import { FaHome } from "react-icons/fa"; // Added missing import

export default function PropertiesPage() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await axios.get("/api/properties");
        
        // Handle different response formats
        if (response.data.properties && Array.isArray(response.data.properties)) {
          setProperties(response.data.properties);
        } else if (Array.isArray(response.data)) {
          setProperties(response.data);
        } else {
          throw new Error("Invalid response format");
        }
      } catch (error) {
        console.error("Error fetching properties:", error);
        setError("Failed to load properties. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center">
          <p className="text-red-500 text-lg mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <article className="min-h-screen">
      <header>
        {/* Breadcrumb Navigation */}
        <div className="flex items-center space-x-2 mb-6 p-6">
          <Link
            href="/"
            className="text-gray-500 hover:text-gray-800 transition-colors flex items-center"
          >
            <FaHome className="mr-1" />
            <span>Home</span>
          </Link>
          <span className="text-gray-400">/</span>
          <div>
            <span className="text-gray-800 font-semibold">Properties</span>
          </div>
        </div>
      </header>

      {/* Properties Grid */}
      <section className="px-6 pb-12">
        {properties.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No properties found.</p>
          </div>
        ) : (
          <>
            <div className="mb-6">
              <p className="text-gray-600">
                Showing {properties.length} propert{properties.length === 1 ? 'y' : 'ies'}
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {properties.map((property) => (
                <Link
                  href={`/property/${property.id}`}
                  key={property.id}
                  className="block transition-transform hover:scale-105 duration-300 cursor-pointer"
                >
                <PropertyCard property={property} key={property.id} />
                </Link>
              ))}
            </div>
          </>
        )}
      </section>

    </article>
  );
}