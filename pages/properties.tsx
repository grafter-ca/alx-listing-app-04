
import PropertyCard from "@/components/common/PropertyCard";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Property } from "@/types/api";

export default function Home() {
     const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await axios.get('/api/properties');
        setProperties(response.data.properties);
      } catch (error) {
        console.error("Error fetching properties:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  //animate spinner loading 

  if (loading) {
    return (<div className="flex justify-center items-center min-h-screen opacity-50">
      <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
    </div>
  );
  }
  return (
    <article>
   <header>
        <div className="bg-gray-100 p-6 text-center">
            <h1 className="text-3xl font-bold text-gray-800">All Properties</h1>
            <p className="text-gray-600 mt-2">Explore our extensive list of properties available for booking.</p>
        </div>
   </header>
    <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 min-h-screen p-12 gap-4">

                {properties.map((property) => (
        <PropertyCard key={property.id} property={property} />
      ))}
    </section>
    </article>
  );
}