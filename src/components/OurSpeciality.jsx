import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

const specialityData = [
  {
    id: 1,
    name: "Puran Poli",
    image: "/assets/Puran-Poli-2-3.jpg",
    description:
      "Traditional Maharashtrian sweet flatbread stuffed with jaggery and lentils.",
  },
  {
    id: 2,
    name: "Misal Pav",
    image: "/assets/Misal-Pav-Recipe.jpg",
    description:
      "Spicy curry made of sprouts topped with farsan and served with pav.",
  },
  {
    id: 3,
    name: "Chicken Kolhapuri",
    image: "/assets/chicken-kolhapur.jpeg",
    description:
      "Famous spicy Kolhapuri chicken curry with rich masala.",
  },
  {
    id: 4,
    name: "Sabudana Vada",
    image: "/assets/sabudana-wada.jpeg",
    description:
      "Crispy deep-fried snack made from tapioca pearls and peanuts.",
  },
];
const OurSpeciality = () => {
  return (
    <section className="speciality-slider">
      <div className="speciality-header">
       
        <h2 className="text-white-500">Our Speciality</h2>
        <p className="text-3xl">
          Experience the authentic taste of Maharashtra with our signature
          dishes prepared using traditional recipes and fresh ingredients.
        </p>
      </div>

      <Swiper
        modules={[Autoplay, Pagination]}
        slidesPerView={4}
        spaceBetween={30}
        loop={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        pagination={{ clickable: true }}
        breakpoints={{
          320: {
            slidesPerView: 1,
          },
          768: {
            slidesPerView: 2,
          },
          1024: {
            slidesPerView: 3,
          },
        }}
      >
        {specialityData.map((item) => (
          <SwiperSlide key={item.id}>
            <div className="dish-card">
              <img src={item.image} alt={item.name} />
              <div className="dish-content">
                <h3>{item.name}</h3>
                <p>{item.description}</p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default OurSpeciality;