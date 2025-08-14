import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

export default function Header() {
  const [isScrollingUp, setIsScrollingUp] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      setIsScrollingUp(currentY < lastScrollY.current);
      lastScrollY.current = currentY;
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuItems = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Product', path: '/product' },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 px-6 py-3 bg-[#FF6200]/90 backdrop-blur-sm transition-transform duration-300 ${
        isScrollingUp ? 'translate-y-0' : '-translate-y-full'
      } flex items-center justify-between`}
    >
      <Link to="/" className="flex items-center space-x-2">
  <img
    src="/Lemon.png"
    alt="MiniLemon"
    className="h-7 w-auto"
  />
  <span className="text-white text-lg font-bold tracking-wide">
    Skill Test MiniLemon
  </span>
</Link>

      {/* Desktop Menu */}
      <ul className="hidden md:flex space-x-6 text-white text-sm font-semibold">
        {menuItems.map((item) => (
          <li key={item.name}>
            <Link to={item.path} className="hover:underline">
              {item.name}
            </Link>
          </li>
        ))}
      </ul>

      {/* Mobile Hamburger */}
      <div className="md:hidden">
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="focus:outline-none text-white"
        >
          {isMobileMenuOpen ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <ul className="absolute top-full left-0 right-0 bg-[#FF6200]/95 backdrop-blur-sm flex flex-col items-center space-y-3 py-4 md:hidden text-white text-sm font-semibold">
          {menuItems.map((item) => (
            <li key={item.name}>
              <Link
                to={item.path}
                className="hover:underline"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </nav>
  );
}
