const Ourstory = () => {
  return (
    <div className="min-h-screen flex items-center">
      <div className="container mx-auto px-6">
        
        <div className="grid md:grid-cols-2 gap-10 items-center">
          
          {/* LEFT - IMAGE */}
          <div>
            <img
              src="/assets/our-story-begins-here_448-430-min.png" // replace with your image
              alt="Founders"
              className="rounded-2xl shadow-lg w-full"
            />
          </div>

          {/* RIGHT - TEXT */}
          <div className="max-w-xl">
            <h2 className="text-3xl md:text-4xl font-bold text-brown-800">
              Meet the Founders
            </h2>

            <p className="mt-4 text-gray-700 leading-relaxed">
              The passionate duo behind this venture are
              <span className="font-semibold text-orange-700">
                {" "}Mrs. Jyoti and Mr. Nikhil Palve
              </span>, a husband and wife team who are entrepreneurs,
              food-enthusiasts, and innovators.
            </p>

            <p className="mt-4 text-gray-700 leading-relaxed">
              Their shared belief is that every meal should tell a story —
              about culture, craftsmanship, and care.
            </p>

            <div className="mt-6 border-l-4 border-yellow-600 pl-4 italic text-gray-600">
              “Food is life. When we treat it with respect — in sourcing,
              preparation, and serving — it nurtures body and soul.”
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};

export default Ourstory;