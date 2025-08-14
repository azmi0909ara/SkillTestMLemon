import { motion } from "framer-motion";
import { Mail, Package, Zap, Smartphone } from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function About() {
  const features = [
    {
      icon: <Package className="text-[#FF6200]" size={28} />,
      title: "Wide Product Range",
      desc: "Explore a variety of products from different categories with ease.",
    },
    {
      icon: <Zap className="text-[#FF6200]" size={28} />,
      title: "Fast & Responsive",
      desc: "Optimized for speed and works perfectly across all devices.",
    },
    {
      icon: <Smartphone className="text-[#FF6200]" size={28} />,
      title: "Mobile Friendly",
      desc: "A seamless experience on mobile, tablet, and desktop.",
    },
    {
      icon: <Mail className="text-[#FF6200]" size={28} />,
      title: "Customer Support",
      desc: "Dedicated support team ready to assist you with any inquiries.",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen font-sans bg-white text-black">
      <Header />

      {/* Hero Banner */}
      <section className="relative w-full h-48 sm:h-56 mt-14 overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1522199710521-72d69614c702?auto=format&fit=crop&w=1400&q=80"
          alt="About Banner"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
          <motion.h1
            className="text-white text-3xl sm:text-4xl font-bold text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            About This Web App
          </motion.h1>
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-10 flex-grow text-center">
        <motion.p
          className="text-gray-700 text-base sm:text-lg mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          This web application showcases products and ideas in a modern, responsive layout with smooth navigation.
          Built with a focus on speed, accessibility, and design consistency.
        </motion.p>

        {/* Features Section */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mt-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          {features.map((feature, idx) => (
            <motion.div
              key={idx}
              className="p-6 bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-lg transition-shadow"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + idx * 0.1, duration: 0.6 }}
            >
              <div className="mb-3 flex justify-center">{feature.icon}</div>
              <h3 className="text-lg font-semibold text-gray-900">{feature.title}</h3>
              <p className="text-sm text-gray-600 mt-2">{feature.desc}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Contact Card */}
        <motion.div
          className="bg-orange-50 border border-orange-200 rounded-xl p-6 shadow-sm max-w-md mx-auto mt-12"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <h2 className="text-lg font-semibold text-gray-900 mb-3">Customer Service</h2>
          <p className="text-gray-700 mb-4">
            For inquiries or support, feel free to contact our customer service team.
          </p>
          <a
            href="https://mail.google.com/mail/?view=cm&fs=1&to=cs@minilemon.com&su=Customer%20Support%20Request&body=Hello%20Customer%20Service%2C%0A%0AI%20would%20like%20to%20inquire%20about..."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 bg-[#FF6200] text-white rounded-lg hover:bg-orange-600 transition-colors"
          >
            <Mail size={18} /> cs@minilemon.com
          </a>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
}
