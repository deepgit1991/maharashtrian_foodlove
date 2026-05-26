export default function ContactUI() {
  return (
    <div className="w-full">
      
      {/* SAME container as branches */}
      <div className="max-w-7xl mx-auto px-6 md:px-10">

        {/* Heading */}
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
          Get In Touch
        </h2>

        {/* Grid Layout */}
        <div className="grid md:grid-cols-2 gap-10 items-start">
          
          {/* Left Content */}
          <div>
            <h3 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Let's Connect With Us
            </h3>
            <p className="text-gray-600 text-lg">
              Have questions or want to work together? We’d love to hear from you.
              Reach out and let’s create something amazing!
            </p>
            
          </div>

          {/* Right Form */}
          <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            <input
              type="text"
              placeholder="Your Name"
              className="border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
            />

            <input
              type="email"
              placeholder="Your Email"
              className="border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
            />

            <input
              type="text"
              placeholder="Subject"
              className="border p-3 rounded-lg md:col-span-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
            />

            <textarea
              rows="4"
              placeholder="Your Message"
              className="border p-3 rounded-lg md:col-span-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
            ></textarea>

            <button
              type="submit"
              className="md:col-span-2 bg-orange-500 text-white py-3 rounded-lg hover:bg-orange-600 transition"
            >
              Send Message
            </button>
          </form>

        </div>
      </div>
    </div>
  );
}