export default function Home() {
  const services = [
    { title: "Fine Dining", icon: "🍽️" },
    { title: "Family Seating", icon: "👨‍👩‍👧‍👦" },
    { title: "Catering", icon: "🎉" },
    { title: "Home Delivery", icon: "🚚" },
    { title: "Private Events", icon: "🏛️" },
    { title: "Traditional Sweets", icon: "🍮" },
  ];

  return (
    <div className="relative w-full max-w-7xl mx-auto px-6 md:px-12 py-16">
      
      {/* Hero Content */}
      <div className="max-w-xl text-left">
        <h1 className="text-2xl sm:text-4xl md:text-6xl font-extrabold leading-tight text-white">
          Royal Maharashtrian
          <br />
          Experiences
        </h1>

        <p className="mt-4 md:mt-6 text-base sm:text-lg text-white leading-relaxed">
          Discover the rich flavors of traditional cuisine, from spicy curries
          to delicious sweets. Experience taste like never before.
        </p>

        {/* <button className="mt-6 md:mt-8 px-4 py-2 bg-yellow-400 text-black font-semibold sm:px-6 sm:py-3 rounded-md hover:bg-yellow-500 transition">
          BOOK A TABLE
        </button> */}
      </div>

      {/* Services Section */}
      <div className="mt-12 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        {services.map((service, index) => (
          <div
            key={index}
            className="bg-white/10 backdrop-blur-md border border-white/20 rounded-lg p-4 text-center text-white hover:bg-white/20 transition"
          >
            <div className="text-3xl mb-2">{service.icon}</div>
            <h3 className="text-sm md:text-base font-semibold">
              {service.title}
            </h3>
          </div>
        ))}
      </div>

    </div>
  );
}