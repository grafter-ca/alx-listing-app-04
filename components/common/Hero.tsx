const Hero = () => {
  return (
    <section className="flex flex-col text-center  lg:items-center lg:justify-center rounded-none lg:rounded-2xl w-full lg:w-[1440px] lg:h-[500px] mx-auto mb-4 bg-hero py-4 ">
      <h1 className="font-medium text-6xl text-white">
        Hello! Find your favorite place here!
      </h1>
      <p className="text-xl lg:text-2xl text-white font-extralight mt-1">
        The best prices for over 2 million properties worldwide.
      </p>
    </section>
  )
};

export default Hero;
