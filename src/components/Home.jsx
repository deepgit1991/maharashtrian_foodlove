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
      <div className="pt-36 md:pt-44 lg:pt-40">

  <div className="max-w-3xl">

    <h1
      className="
      text-5xl
      sm:text-6xl
      lg:text-7xl
      font-extrabold
      leading-tight
      text-white
    "
    >
      Royal
      <br />
      Maharashtrian
      <br />
      Experiences
    </h1>

    <p
      className="
      mt-6
      text-lg
      md:text-xl
      text-white
      max-w-2xl
      leading-relaxed
    "
    >
      Discover the rich flavors of traditional cuisine,
      from spicy curries to delicious sweets.
      Experience taste like never before.
    </p>

  </div>
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