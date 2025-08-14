import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data);
        setLoading(false);
      })
      .catch((err) => console.error(err));
  }, [id]);

  if (loading) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow flex items-center justify-center">
          <p className="text-gray-500">Loading product details...</p>
        </main>
        <Footer />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow flex items-center justify-center">
          <p className="text-red-500">Product not found.</p>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen font-sans bg-white text-black">
      <Header />

      {/* Konten utama fleksibel */}
      <main className="flex-grow">
        <motion.section
          className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-20 flex flex-col md:flex-row gap-8"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: {
              transition: { staggerChildren: 0.2 }
            }
          }}
        >
          {/* Gambar Produk */}
          <motion.div
            className="md:w-1/2 flex justify-center"
            variants={{
              hidden: { opacity: 0, x: -50 },
              visible: { opacity: 1, x: 0 }
            }}
            transition={{ duration: 0.6 }}
          >
            <img
              src={product.image}
              alt={product.title}
              className="w-full h-auto max-h-96 object-contain"
            />
          </motion.div>

          {/* Detail Produk */}
          <motion.div
            className="md:w-1/2 flex flex-col justify-center"
            variants={{
              hidden: { opacity: 0, x: 50 },
              visible: { opacity: 1, x: 0 }
            }}
            transition={{ duration: 0.6 }}
          >
            <motion.h1
              className="text-2xl sm:text-3xl font-bold mb-4"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              {product.title}
            </motion.h1>

            <motion.p
              className="text-gray-700 mb-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {product.description}
            </motion.p>

            <motion.p
              className="text-xl font-semibold text-[#FF6200] mb-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              ${product.price}
            </motion.p>

            <motion.p
              className="text-sm text-gray-500 mb-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              Category: {product.category}
            </motion.p>

            {/* Tombol Navigasi */}
            <motion.div
              className="flex flex-wrap gap-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <Link
                to="/"
                className="inline-block bg-[#FF6200] text-white px-6 py-2 rounded hover:bg-orange-600 transition-colors text-sm font-semibold"
              >
                Back to Home
              </Link>
              <Link
                to="/Product"
                className="inline-block bg-gray-200 text-gray-700 px-6 py-2 rounded hover:bg-gray-300 transition-colors text-sm font-semibold"
              >
                Back to Products
              </Link>
            </motion.div>
          </motion.div>
        </motion.section>
      </main>

      <Footer />
    </div>
  );
}
