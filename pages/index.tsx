import Filters from "@/components/common/Filters";
import Hero from "@/components/common/Hero";
import PropertyCard from "@/components/common/PropertyCard";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Property } from "@/types/api";

export default function Home() {
     const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProperties = async (limit=8,offset=0) => {
      try {
        const response = await axios.get(`/api/properties?limit=${limit}&offset=${offset}`);
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
 // declare userouter
  const route =  require('next/router').useRouter();

  return (
    <>
    <Hero />
    <Filters />

    <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 min-h-screen p-12 gap-4">
                {properties.map((property) => (
        <PropertyCard key={property.id} property={property} />
      ))}
    </section>


    <section className="flex flex-col items-center space-y-3 p-12">
      <button onClick={()=> route.push('/properties')} arial-label = "button" type="button" className="px-6 py-2 rounded-full bg-gray-600 text-white font-semibold hover:bg-gray-700 mx-auto block mb-4">
        Show more
      </button>
      <p className="text-gray-400">Click to see more listings</p>
    </section>
    </>
  );
}