import React from "react";
const branches = [
  {
    id: 1,
    name: "Mumbai Branch",
    address: "Andheri East, Mumbai, Maharashtra",
    phone: "+91 9876543210",
    mapLink: "https://maps.google.com/?q=Andheri+East+Mumbai",
  },
  {
    id: 2,
    name: "Pune Branch",
    address: "FC Road, Pune, Maharashtra",
    phone: "+91 9123456780",
    mapLink: "https://maps.google.com/?q=FC+Road+Pune",
  },
  {
    id: 3,
    name: "Nagpur Branch",
    address: "Sitabuldi, Nagpur, Maharashtra",
    phone: "+91 9988776655",
    mapLink: "https://maps.google.com/?q=Sitabuldi+Nagpur",
  },
  {
    id: 4,
    name: "Nashik Branch",
    address: "College Road, Nashik, Maharashtra",
    phone: "+91 9090909090",
    mapLink: "https://maps.google.com/?q=Nashik+College+Road",
  },
];
const Branches = () => {
  return (
    <div className="flex items-center">
      <div className="container mx-auto px-6"> 
    

        {/* Heading */}
        <h1 className="text-4xl font-bold text-center mb-10 text-white">
          Our Branches / आमची शाखा 
        </h1>
        <p className="text-center text-gray-500 mt-2 my-5 text-2xl text-red-500">
            “We’re expanding our flavors across Maharashtra—visit your nearest branch and experience food that feels like home.”
        </p>

        <p className="text-center text-gray-500 mt-2 my-10 text-2xl text-orange-500 font-bold ">
            “महाराष्ट्रभर आमच्या शाखांमधून अस्सल चव आणि आपुलकीचा अनुभव घ्या.”
        </p>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {branches.map((branch) => (
            <div
              key={branch.id}
              className="bg-white rounded-xl shadow-md hover:shadow-xl transition duration-300 p-5"
            >
              <h2 className="text-lg font-semibold text-gray-800">
                {branch.name}
              </h2>

              <p className="text-sm text-gray-600 mt-2">
                📍 {branch.address}
              </p>

              <p className="text-sm text-gray-600 mt-1">
                📞 {branch.phone}
              </p>

              <a
                href={branch.mapLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-4 text-orange-500 font-medium hover:underline"
              >
                View Location →
              </a>
            </div>
          ))}
        </div>

      </div>
      </div>
    
  );
};

export default Branches;