import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function Home() {
  const [showWelcome, setShowWelcome] = useState(false);
  const [products, setProducts] = useState([]);
  const API_URL = 'https://fakestoreapi.com/products?limit=4';

  // Animasi Welcome hanya muncul sekali per sesi
  useEffect(() => {
    const hasVisited = sessionStorage.getItem('hasVisited');

    if (!hasVisited) {
      setShowWelcome(true);
      sessionStorage.setItem('hasVisited', 'true');

      const timer = setTimeout(() => setShowWelcome(false), 3000);
      return () => clearTimeout(timer);
    }
  }, []);

  // Ambil produk dari API
  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error(err));
  }, []);

  // Variants animasi section muncul 1 per 1
  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.3, duration: 0.8, ease: "easeOut" }
    })
  };

  return (
    <div className="flex flex-col min-h-screen font-sans bg-white text-black relative overflow-hidden">
      <Header />

      {/* Animated Welcome */}
      <AnimatePresence>
        {showWelcome && (
          <motion.div
            className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.8, ease: 'easeInOut' } }}
          >
            <motion.h1
              className="text-white text-4xl sm:text-6xl font-extrabold text-center mb-6"
              initial={{ y: 50, scale: 0.7, opacity: 0 }}
              animate={{ y: 0, scale: 1, opacity: 1 }}
              transition={{ duration: 1.2, type: 'spring', stiffness: 120 }}
            >
              Selamat Datang
            </motion.h1>

            {/* Tombol Skip */}
            <motion.button
              onClick={() => setShowWelcome(false)}
              className="px-5 py-2 bg-white text-purple-600 font-semibold rounded-lg shadow hover:bg-gray-100 transition-colors"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
            >
              Masuk
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <motion.section
        className="relative w-full h-64 sm:h-72 md:h-80 mt-14 overflow-hidden"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        custom={0}
      >
        <img
          src="https://images.unsplash.com/photo-1522199710521-72d69614c702?auto=format&fit=crop&w=1400&q=80"
          alt="Hero background"
          className="w-full h-full object-cover object-center transform scale-105"
          style={{ transform: 'translateY(-10%)' }}
        />
        <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col justify-center items-center text-center px-4">
          <h1 className="text-white text-3xl sm:text-4xl font-semibold">Welcome to Our Web App</h1>
          <p className="text-white text-xs sm:text-sm mt-1">
            Explore amazing features and projects we have built
          </p>
        </div>
        <div className="absolute bottom-0 w-full h-10 bg-white rotate-[3deg] origin-bottom" />
      </motion.section>

      {/* About */}
      <motion.section
        className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-10 text-center"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        custom={1}
      >
        <h2 className="text-2xl sm:text-3xl font-semibold mb-4 text-gray-900">About This Web App</h2>
        <p className="text-gray-700 text-base sm:text-lg mb-6">
          This web application showcases products and ideas in a modern, responsive interface, combining smooth navigation, clean design, and user-friendly experience.
        </p>
      </motion.section>

      {/* Produk Rekomendasi */}
      <motion.section
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        custom={2}
      >
        <h2 className="text-2xl sm:text-3xl font-semibold mb-6 text-gray-900 text-center">Popular Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {products.map((product, idx) => (
            <motion.div
              key={product.id}
              variants={sectionVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={idx * 0.3}
            >
              <Link
                to={`/product/${product.id}`}
                className="border rounded-lg shadow-sm overflow-hidden hover:shadow-lg transition-shadow"
              >
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4 text-center">
                  <h3 className="text-sm font-semibold mb-1 line-clamp-2">{product.title}</h3>
                  <p className="text-gray-600 text-sm">${product.price}</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {products.length === 0 && (
          <p className="text-gray-500 mt-6 text-center">Loading products...</p>
        )}
      </motion.section>

      <Footer />
    </div>
  );
}
