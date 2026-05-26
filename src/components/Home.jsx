export default function Home() {
  return (
    <div className="relative w-full max-w-7xl mx-auto px-6 flex justify-start">

      {/* LEFT CONTENT */}
      <div className="max-w-xl text-left">
        <h1 className="text-4xl md:text-6xl font-extrabold leading-tight text-white">
          Royal Maharashtrian Experiencess
        </h1>

        <p className="mt-6 text-lg text-white">
          Discover the rich flavors of traditional cuisine, from spicy curries
          to delicious sweets. Experience taste like never before.
        </p>

        <button className="mt-8 bg-yellow-400 text-black font-semibold px-6 py-3 rounded-md hover:bg-yellow-500 transition">
          BOOK A TABLE
        </button>
      </div>

     
    </div>
  );
}