import { FaEnvelope, FaPhoneAlt, FaMapMarkerAlt } from "react-icons/fa";
const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 px-6 py-10">
      <div className="max-w-7xl mx-auto grid gap-8 sm:grid-cols-2 md:grid-cols-4">
        
        {/* Column 1 */}
        <div className="md:border-r md:border-gray-700 md:pr-6 last:border-r-0">
          <img 
              src="/assets/logo.png"   // replace with your logo path
              alt="Food Godava Logo"
              className="w-40 h-40 object-contain" 
            />
        </div>

        {/* Column 2 */}
        <div className="md:border-r md:border-gray-700 md:px-6 last:border-r-0">
          <h3 className="text-lg font-semibold text-white mb-3">Quick Links</h3>
          <ul className="space-y-2">
            <li><a href="/" className="hover:text-white">Home</a></li>
            <li><a href="/about" className="hover:text-white">About</a></li>
            <li><a href="/services" className="hover:text-white">Services</a></li>
            <li><a href="/contact" className="hover:text-white">Contact</a></li>
          </ul>
        </div>

        {/* Column 3 */}
        <div className="md:border-r md:border-gray-700 md:px-6 last:border-r-0">
          <h3 className="text-lg font-semibold text-white mb-3">Categories</h3>
          <ul className="space-y-2">
            <li><a href="/web" className="hover:text-white">Web Development</a></li>
            <li><a href="/design" className="hover:text-white">UI/UX Design</a></li>
            <li><a href="/marketing" className="hover:text-white">Marketing</a></li>
            <li><a href="/seo" className="hover:text-white">SEO</a></li>
          </ul>
        </div>

        {/* Column 4 */}
        <div className="md:pl-6">
          <h3 className="text-lg font-semibold text-white mb-3">Contact Us</h3>

          <p className="text-sm flex items-center gap-2">
            <FaEnvelope className="text-orange-400" />
            support@mybrand.com
          </p>

          <p className="text-sm flex items-center gap-2 mt-2">
            <FaPhoneAlt className="text-orange-400" />
            +91 98765 43210
          </p>

          <p className="text-sm flex items-center gap-2 mt-2">
            <FaMapMarkerAlt className="text-orange-400" />
            Mumbai, India
  </p>
</div>

      </div>

      {/* Bottom */}
      <div className="border-t border-gray-700 mt-8 pt-4 text-center text-sm">
        © 2026 MyBrand. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;