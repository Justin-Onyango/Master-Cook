import React from "react";
import { useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Homepage.css";

const HomePage = () => {
  const images = [
    "/images/img3.jpg",
    "/images/image10.jpg",
    "/images/img6.jpg",
    "/images/image11.jpg",
    "/images/image7.jpg",
    "/images/image9.jpg",
    "/images/image12.jpg",
    "/images/image13.jpg",
    "/images/image4.jpg",
    "/images/img5.jpg",
  ];

  const slideRef = useRef(null);
  const slideIndexRef = useRef(0); 

  useEffect(() => {
    const interval = setInterval(() => {
      if (slideRef.current) {
        slideIndexRef.current = (slideIndexRef.current + 1) % images.length;
        slideRef.current.style.transform = translateX(-${slideIndexRef.current * 100}%);
      }
    }, 2000);
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="col typography">
          <h1 className="text-4xl font-bold mb-4">What We Are About</h1>
          <p className="text-lg mb-6">
            Master Cook is a place where you can please your soul and tummy with delicious food recipes of all cuisines. And our service is absolutely free. So start exploring now.
          </p>
          <Link to="/popular">
            <button className="btn bg-orange-500 text-white py-2 px-4 rounded">Explore Now</button>
          </Link>
        </div>

    <div className="col gallery w-full overflow-hidden relative">
      <div ref={slideRef} className="slides flex transition-transform duration-1000">
        {images.map((src, index) => (
          <div key={index} className="slide w-full h-full">
            <img src={src} alt={`Slide ${index + 1}`} className="w-full h-full object-cover" />
          </div>
        ))}
      </div>
    </div>
  </div>

  {/* Client Testimonials Section */}
  <section className="container mx-auto px-6 py-10">
    <h2 className="text-3xl font-bold text-center text-orange-500 mb-6">What Our Users Say</h2>
    <div className="flex items-center overflow-x-auto">
      {[
        {
          name: "Victor Laina, Food Enthusiast",
          image: "/images/victor.jpg",
          rating: 5,
          comment: "Master Cook is my go-to app for all my culinary adventures. The recipes are fantastic and easy to follow!",
        },
        {
          name: "Anita Barasa, Home Chef",
          image: "https://img.freepik.com/free-photo/3d-illustration-cute-cartoon-girl-blue-jacket-glasses_1142-41044.jpg?t=st=1715085692~exp=1715089292~hmac=73e84550b758cca45db7f64be3b1ec75248f69b75e6dac38fdc0bc0cb47b941a&w=740",
          rating: 4,
          comment: "I've tried so many new dishes thanks to Master Cook. The step-by-step instructions make cooking a breeze!",
        },
        {
          name: "Eve Akoko, Food Blogger",
          image: "/images/eve.jpg",
          rating: 5,
          comment: "Master Cook has revolutionized my kitchen. The variety of recipes and the quality of the instructions are top-notch.",
        },
        {
          name: "Ian Kinyua, Culinary Student",
          image: "/images/ian.jpg",
          rating: 5,
          comment: "As a culinary student, I find Master Cook to be an invaluable resource. The recipes are diverse and the app is user-friendly.",
        },
        {
          name: "Sarah Abdullahi, Busy Mom",
          image: "/images/busymom.jpg",
          rating: 5,
          comment: "Master Cook has saved me so much time in the kitchen. The recipes are quick, easy, and delicious!",
        },
        {
          name: "David Kamau, Chef",
          image: "https://img.freepik.com/free-photo/3d-illustration-cute-cartoon-boy-green-jacket_1142-40882.jpg?t=st=1715085692~exp=1715089292~hmac=bc2d7244daa8e0c1f4f1c4c39ea315c8a7c28e34d03f0a6e4b8ba0a5a4a7bca6&w=740",
          rating: 5,
          comment: "Master Cook is a game-changer. The recipes are well-curated and the app design is superb!",
        }
      ].map((testimonial, index) => (
        <div key={index} className="testimonial bg-orange-500  text-white rounded-lg p-6 shadow-lg mx-4 max-w-xs flex-shrink-0">
          <img src={testimonial.image} alt={testimonial.name} className="w-24 h-24 rounded-full mx-auto mb-4" />
          <p className="text-gray-100 mt-4">{testimonial.comment}</p>
          <footer className="mt-4 font-bold">{testimonial.name}</footer>
          <div className="flex justify-center mt-2">
            {Array.from({ length: testimonial.rating }, (_, i) => (
              <span key={i} className="text-yellow-300">★</span>
            ))}
          </div>
        </div>
      ))}
    </div>
  </section>

  {/* Team Section */}
  <section className="team mt-12">
    <h2 className="text-3xl font-bold text-orange-500 mb-6">Meet the Team</h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      <div className="team-member bg-orange-400 text-white p-6 rounded-lg shadow-lg">
        <img src="/images/teammember5.jpg" alt="Team Member 1" className="h-32 w-32 rounded-full mx-auto mb-4" />
        <h3 className="text-xl font-bold text-center">Fardosa Gedi</h3>
        <p className="text-center">Frontend Developer</p>
      </div>
      <div className="team-member bg-orange-400 text-white p-6 rounded-lg shadow-lg">
        <img src="/images/teammember2.jpg" alt="Team Member 2" className="h-32 w-32 rounded-full mx-auto mb-4" />
        <h3 className="text-xl font-bold text-center">Jan Mwadime</h3>
        <p className="text-center">Backend Developer</p>
      </div>
      <div className="team-member bg-orange-400 text-white p-6 rounded-lg shadow-lg">
        <img src="/images/teammember3.jpg" alt="Team Member 3" className="h-32 w-32 rounded-full mx-auto mb-4" />
        <h3 className="text-xl font-bold text-center">Japheth Karani</h3>
        <p className="text-center">Frontend Developer</p>
      </div>
      <div className="team-member bg-orange-400 text-white p-6 rounded-lg shadow-lg">
        <img src="/images/justin.jpg" alt="Team Member 4" className="h-32 w-32 rounded-full mx-auto mb-4" />
        <h3 className="text-xl font-bold text-center">Justin Onyango</h3>
        <p className="text-center">Frontend Developer</p>
      </div>
      {/* <div className="team-member bg-orange-400 text-white p-6 rounded-lg shadow-lg">
        <img src="/images/brian.jpg" alt="Team Member 5" className="h-32 w-32 rounded-full mx-auto mb-4" />
        <h3 className="text-xl font-bold text-center">Brian Onchwari</h3>
        <p className="text-center">Backend Developer</p>
      </div> */}
    </div>
  </section>

  {/* Newsletter Section */}
  <section id="newsletter" className="mt-4">
    <div className="bg-white py-10">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold text-orange-500">Stay Updated</h2>
        <p className="text-gray-600 mt-2">Subscribe to our newsletter for the latest recipes and updates.</p>
        <form className="mt-4">
          <input type="email" placeholder="Enter your email" className="mt-1 p-2 border-2 border-gray-300 rounded-md" />
          <button type="submit" className="ml-4 bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded">
            Subscribe
          </button>
        </form>
      </div>
    </div>
  </section>
</div>
  );
};

export default HomePage;