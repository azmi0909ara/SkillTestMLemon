import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function Product() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");

  const API_URL = "https://fakestoreapi.com/products";
  const CATEGORY_URL = "https://fakestoreapi.com/products/categories";

  // Fetch products
  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error(err));
  }, []);

  // Fetch categories
  useEffect(() => {
    fetch(CATEGORY_URL)
      .then((res) => res.json())
      .then((data) => setCategories(["All", ...data]))
      .catch((err) => console.error(err));
  }, []);

  // Filtered products
  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.title
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="flex flex-col min-h-screen font-sans bg-white text-black">
      <Header />
<section className="relative w-full h-64 sm:h-72 md:h-80 mt-14 overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1522199710521-72d69614c702?auto=format&fit=crop&w=1400&q=80"
          alt="Products hero"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col justify-center items-center text-center px-4">
          <h1 className="text-white text-3xl sm:text-4xl font-semibold">Our Products</h1>
          <p className="text-white text-xs sm:text-sm mt-1">
            Browse our latest items and find what suits you best
          </p>
        </div>
      </section>
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-24 mb-10 flex-grow">
        {/* Judul Halaman */}
        <motion.h1
          className="text-3xl sm:text-4xl font-bold mb-6 text-gray-900 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Product List
        </motion.h1>

        {/* Search & Filter */}
        <motion.div
          className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full sm:w-1/2 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
          />

          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full sm:w-1/3 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </motion.div>

        {/* Grid Produk */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: {
              transition: { staggerChildren: 0.15 },
            },
          }}
        >
          {filteredProducts.map((product) => (
            <motion.div
              key={product.id}
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.6 }}
            >
              <Link
                to={`/product/${product.id}`}
                className="border rounded-lg shadow-sm overflow-hidden bg-white hover:shadow-lg hover:scale-[1.02] transition-all duration-300 flex flex-col"
              >
                <div className="w-full h-48 bg-gray-100 flex items-center justify-center overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="max-h-full object-contain p-4"
                  />
                </div>
                <div className="p-4 flex flex-col flex-grow">
                  <h2 className="text-sm font-semibold mb-2 line-clamp-2">
                    {product.title}
                  </h2>
                  <p className="text-orange-500 font-bold mb-2">
                    ${product.price}
                  </p>
                  <p className="text-gray-500 text-xs line-clamp-3 flex-grow">
                    {product.description}
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* Pesan jika kosong */}
        {filteredProducts.length === 0 && (
          <motion.p
            className="text-gray-500 mt-6 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            No products found.
          </motion.p>
        )}
      </main>

      <Footer />
    </div>
  );
}
