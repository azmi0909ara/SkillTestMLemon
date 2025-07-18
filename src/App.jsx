import { useEffect, useState, useRef } from 'react';
import './index.css';

const API_BASE = 'https://suitmedia-backend.suitdev.com/api/ideas';

function App() {
  const [ideas, setIdeas] = useState([]);
  console.log('App component rendered',ideas);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [sort, setSort] = useState('-published_at');
  const [totalItems, setTotalItems] = useState(0);
  const [isScrollingUp, setIsScrollingUp] = useState(true);

  const lastScrollY = useRef(0);

  // Fetch data
  const fetchIdeas = async () => {
  const res = await fetch(
    `${API_BASE}?page[number]=${page}&page[size]=${pageSize}&append[]=small_image&append[]=medium_image&sort=${sort}`,
    {
      headers: {
        'Accept': 'application/json',
      },
    }
  );
  const data = await res.json();
  setIdeas(data.data);
  setTotalItems(data.meta.total);
};


  // Sticky hide-on-scroll header
  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      setIsScrollingUp(currentY < lastScrollY.current);
      lastScrollY.current = currentY;
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="bg-white text-black">
      {/* Header */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 px-6 py-3 bg-[#FF6200]/90 backdrop-blur-sm transition-transform duration-300 ${
          isScrollingUp ? 'translate-y-0' : '-translate-y-full'
        } flex items-center justify-between`}
      >
        <img
          src="https://storage.googleapis.com/a1aa/image/1d64e16c-c1b4-477c-3d3f-715f6ffff615.jpg"
          alt="SuitMedia logo"
          className="h-7 w-auto"
        />
        <ul className="hidden md:flex space-x-6 text-white text-sm font-semibold">
          {['Work', 'About', 'Services', 'Ideas', 'Careers', 'Contact'].map((item) => (
            <li key={item}>
              <a
                href="#"
                className={`${
                  item === 'Ideas'
                    ? 'underline decoration-white decoration-2 underline-offset-4'
                    : 'hover:underline'
                }`}
              >
                {item}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {/* Hero Banner */}
      <div className="relative w-full h-64 sm:h-72 md:h-80 mt-14 overflow-hidden">
        <img
          src="https://storage.googleapis.com/a1aa/image/da49eafa-5818-4ceb-6f15-285d754ff0ff.jpg"
          alt="Hero background"
          className="w-full h-full object-cover object-center transform scale-105"
          style={{ transform: 'translateY(-10%)' }}
        />
        <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col justify-center items-center text-center px-4">
          <h1 className="text-white text-3xl sm:text-4xl font-semibold">Ideas</h1>
          <p className="text-white text-xs sm:text-sm mt-1">Where all our great things begin</p>
        </div>
        <div className="absolute bottom-0 w-full h-10 bg-white rotate-[3deg] origin-bottom" />
      </div>

      {/* Controls */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
        <div className="flex flex-col sm:flex-row justify-between items-center text-xs text-gray-700 font-semibold mb-6 space-y-3 sm:space-y-0">
          <div>Showing {(page - 1) * pageSize + 1} - {Math.min(page * pageSize, totalItems)} of {totalItems}</div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <label htmlFor="showPerPage">Show per page:</label>
              <select
                id="showPerPage"
                value={pageSize}
                onChange={(e) => setPageSize(Number(e.target.value))}
                className="border border-gray-300 rounded-md text-xs py-1 px-2 focus:outline-none focus:ring-2 focus:ring-[#FF6200]"
              >
                {[10, 20, 50].map((v) => (
                  <option key={v} value={v}>{v}</option>
                ))}
              </select>
            </div>
            <div className="flex items-center space-x-2">
              <label htmlFor="sortBy">Sort by:</label>
              <select
                id="sortBy"
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="border border-gray-300 rounded-md text-xs py-1 px-2 focus:outline-none focus:ring-2 focus:ring-[#FF6200]"
              >
                <option value="-published_at">Newest</option>
                <option value="published_at">Oldest</option>
              </select>
            </div>
          </div>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {ideas.map((idea) => (
            <article key={idea.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <img
                loading="lazy"
                src={idea.medium_image}
                alt="Idea"
                className="w-full h-44 object-cover"
              />
              <div className="p-3">
                <time className="block text-[9px] text-gray-400 font-semibold mb-1">
                  {new Date(idea.published_at).toLocaleDateString('en-GB', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                  }).toUpperCase()}
                </time>
                <h2 className="text-[10px] font-semibold leading-snug text-gray-900 line-clamp-3">
                  {idea.title}
                </h2>
              </div>
            </article>
          ))}
        </div>

        {/* Pagination */}
        <nav className="flex justify-center items-center space-x-2 mt-8 text-xs font-semibold text-gray-700 select-none">
          {Array.from({ length: Math.ceil(totalItems / pageSize) }, (_, i) => (
            <button
              key={i}
              onClick={() => setPage(i + 1)}
              className={`w-6 h-6 rounded-full flex items-center justify-center ${
                page === i + 1
                  ? 'bg-[#FF6200] text-white'
                  : 'hover:bg-[#FF6200] hover:text-white transition-colors'
              }`}
            >
              {i + 1}
            </button>
          ))}
        </nav>
      </main>
    </div>
  );
}

export default App;
