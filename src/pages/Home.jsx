import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaQuoteLeft } from "react-icons/fa";
import { products, categories } from "../data/products";
import { useState, useEffect } from "react";

function HeroSection() {
  const slides = [
    {
      id: 1,
      image: "/images/2.png",
      title: "Experience Furniture in 3D",
      subtitle: "Visualize your perfect space with our interactive 3D models",
      link: "/category/living-room",
    },
    {
      id: 2,
      image: "/images/3.png",
      title: "Discover Modern Designs",
      subtitle: "Explore our latest furniture collection",
      link: "/category/modern",
    },
    {
      id: 3,
      image: "/images/4.png",
      title: "Create Your Dream Home",
      subtitle: "Personalize and visualize in 3D",
      link: "/category/customize",
    },
  ];
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [slides.length]);

  const prevSlide = () =>
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  const nextSlide = () => setCurrent((prev) => (prev + 1) % slides.length);

  return (
    <div className="relative h-[600px] overflow-hidden">
      {slides.map((slide, index) => (
        <motion.div
          key={slide.id}
          initial={{ opacity: 0 }}
          animate={{
            opacity: index === current ? 1 : 0,
            x: index === current ? 0 : index < current ? "-100%" : "100%",
          }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0"
        >
          <img
            src={slide.image}
            alt={slide.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50 flex flex-col justify-center items-start p-8">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{
                opacity: index === current ? 1 : 0,
                y: index === current ? 0 : 20,
              }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-4xl sm:text-5xl font-display font-bold text-white mb-4"
            >
              {slide.title}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{
                opacity: index === current ? 1 : 0,
                y: index === current ? 0 : 20,
              }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-xl text-primary-100 mb-6 ml-10"
            >
              {slide.subtitle}
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{
                opacity: index === current ? 1 : 0,
                y: index === current ? 0 : 20,
              }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <Link
                to={slide.link}
                className="inline-block bg-accent-600 text-white px-8 py-3 rounded-lg hover:bg-accent-700 transition-colors"
              >
                Shop Now
              </Link>
            </motion.div>
          </div>
        </motion.div>
      ))}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white z-10"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-8 w-8"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white z-10"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-8 w-8"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </button>
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrent(idx)}
            className={`w-3 h-3 rounded-full ${
              idx === current ? "bg-accent-600" : "bg-white/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

function FeaturedProducts() {
  const featuredProducts = products.filter((product) => product.featured);

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-display font-bold text-primary-900 mb-8">
          Featured Collection
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300"
            >
              <Link to={`/product/${product.id}`} className="block">
                <div className="relative aspect-square overflow-hidden">
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-bold text-primary-600 mb-1">
                    {product.name}
                  </h3>
                  <p className="text-sm text-primary-500 mb-2 line-clamp-2">
                    {product.description}
                  </p>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xl font-semibold text-primary-600">
                      ${product.price.toFixed(2)}
                    </span>
                    <span className="text-xs uppercase text-primary-500">
                      {product.category}
                    </span>
                  </div>
                  <dl className="grid grid-cols-2 gap-2 text-xs text-primary-500">
                    <div>
                      <dt className="font-medium">Size</dt>
                      <dd>{product.specs.dimensions}</dd>
                    </div>
                    <div>
                      <dt className="font-medium">Material</dt>
                      <dd>{product.specs.material}</dd>
                    </div>
                  </dl>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CategorySection() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-display font-bold text-primary-900 mb-8 ">
          Shop by Category
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
          {categories.map((category) => {
            const itemCount = products.filter(
              (p) => p.category === category.id
            ).length;
            return (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="group bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300"
              >
                <Link to={`/category/${category.id}`} className="block">
                  <div className="relative aspect-square overflow-hidden">
                    <img
                      src={category.image}
                      alt={category.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-accent-600/80 to-transparent" />
                    <div className="absolute bottom-0 p-4">
                      <h3 className="text-xl font-bold text-white">
                        {category.name}
                      </h3>
                    </div>
                  </div>
                  <div className="p-4">
                    <p className="text-sm text-primary-500 mb-2 line-clamp-3">
                      {category.description}
                    </p>
                    <span className="text-sm font-semibold text-accent-600">
                      Explore {itemCount} items
                    </span>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function TestimonialSection() {
  const testimonials = [
    {
      id: 1,
      text: "The 3D furniture preview transformed how I shop online. It's like having the showroom at home!",
      author: "Olivia Martinez",
      role: "Interior Designer",
    },
    {
      id: 2,
      text: "I love how detailed the product specs are. The visuals made me confident in my purchase.",
      author: "Liam Johnson",
      role: "Homeowner",
    },
    {
      id: 3,
      text: "Finally, a furniture app that offers immersive 3D views. Game-changer for my studio projects.",
      author: "Emma Wilson",
      role: "Architect",
    },
  ];

  return (
    <section className="py-16 bg-primary-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-display font-bold text-primary-900 mb-12 text-center">
          Hear from Our Community
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300 border-l-4 border-accent-600"
            >
              <FaQuoteLeft className="text-accent-600 text-2xl mb-4" />
              <p className="text-primary-600 mb-4">“{t.text}”</p>
              <div>
                <p className="font-semibold text-primary-900">{t.author}</p>
                <p className="text-sm text-primary-500">{t.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <div>
      <HeroSection />
      <FeaturedProducts />
      <CategorySection />
      <TestimonialSection />
    </div>
  );
}
