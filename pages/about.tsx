import React from 'react'

import Card from '../components/common/Card';
import Button from '../components/common/Button';

const about = () => {
  return (
     <section className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
     <article className="bg-white rounded-lg shadow-md hover:shadow-xl transition flex flex-col items-center">
      <Card
        title="Cozy Apartment"
        description="A beautiful apartment in the city center."
        imageUrl="/assets/image 1.jpg"
        price={120}
      />
      <Button
        label="Book Now"
        onClick={() => alert("Booked!")}
        variant="primary"
      />
     </article>
     <article className="bg-white rounded-lg shadow-md hover:shadow-xl transition flex flex-col items-center">
      <Card
        title="Cozy Apartment"
        description="A beautiful apartment in the city center."
        imageUrl="/assets/image 1.jpg"
        price={120}
      />
      <Button
        label="Book Now"
        onClick={() => alert("Booked!")}
        variant="primary"
      />
     </article>
     <article className="bg-white rounded-lg shadow-md hover:shadow-xl transition flex flex-col items-center">
      <Card
        title="Cozy Apartment"
        description="A beautiful apartment in the city center."
        imageUrl="/assets/image 1.jpg"
        price={120}
      />
      <Button
        label="Book Now"
        onClick={() => alert("Booked!")}
        variant="primary"
      />
     </article>
    </section>
  )
}

export default about
