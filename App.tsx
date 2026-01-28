
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  Sparkles,
  ChevronRight,
  Bell,
  Filter,
  BrainCircuit,
  Radio,
  ChevronDown,
  Check,
  Moon,
  Sun
} from 'lucide-react';
import ParticleBackground from './Components/ParticleBackground';
import Sidebar from './Components/Sidebar';
import IdeaCard from './Components/IdeaCard';
import AILab from './Components/AiLab';
import LiveAssistant from './Components/LiveAssistant';
import Chatbot from './Components/Chatbot';
import { MOCK_IDEAS, SEARCH_SUGGESTIONS } from './Data';
import { Category, IdeaItem, User, Popularity, SortOption } from './types';

type PageState = 'landing' | 'login' | 'dashboard';

// Premium transition configuration - Fluid and Elegant
const pageTransition = {
  type: "tween",
  ease: [0.2, 0.8, 0.2, 1],
  duration: 0.5
};

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<PageState>('landing');
  const [activeCategory, setActiveCategory] = useState<Category>('Trending');
  const [searchQuery, setSearchQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [sortBy, setSortBy] = useState<SortOption>('views');
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const popularityScore: Record<Popularity, number> = {
    [Popularity.High]: 3,
    [Popularity.Medium]: 2,
    [Popularity.Low]: 1
  };

  const filteredIdeas = MOCK_IDEAS.filter(idea => {
    const matchesCategory = (['Trending', 'AI Lab', 'Live Assistant'] as Category[]).includes(activeCategory) ? true : idea.category === activeCategory;
    const matchesSearch = idea.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      idea.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  }).sort((a, b) => {
    if (sortBy === 'views') return b.views - a.views;
    if (sortBy === 'popularity') return popularityScore[b.popularity] - popularityScore[a.popularity];
    if (sortBy === 'new') return b.id.localeCompare(a.id);
    if (sortBy === 'trending') return b.views * (popularityScore[b.popularity] / 2) - a.views * (popularityScore[a.popularity] / 2);
    return 0;
  });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentUser({ name: 'Guest Explorer', email: 'guest@khojverse.io', avatar: 'https://picsum.photos/seed/user/100/100' });
    setCurrentPage('dashboard');
  };

  const handleSearchSuggestionClick = (suggestion: string) => {
    setSearchQuery(suggestion);
    setShowSuggestions(false);
    setCurrentPage('dashboard');
    setActiveCategory('Trending');
  };

  const sortOptions: { value: SortOption, label: string }[] = [
    { value: 'views', label: 'Most Viewed' },
    { value: 'popularity', label: 'Popularity (Level)' },
    { value: 'trending', label: 'Trending Today' },
    { value: 'new', label: 'New Ideas' }
  ];

  return (
    <div className={`${isDarkMode ? 'dark' : ''} transition-colors duration-500`}>
      <div className="relative min-h-screen bg-[#f7f9fb] dark:bg-[#0a0b1e] selection:bg-teal-200 dark:selection:bg-teal-900 selection:text-teal-900 dark:selection:text-teal-100 transition-colors duration-500">
        <ParticleBackground isDarkMode={isDarkMode} />
        <Chatbot />

        <AnimatePresence mode="wait">
          {currentPage === 'landing' && (
            <motion.div
              key="landing"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.02, filter: "blur(8px)" }}
              transition={pageTransition}
              className="flex flex-col items-center justify-center min-h-screen p-4"
            >
              <div className="absolute top-8 right-8">
                <button
                  onClick={() => setIsDarkMode(!isDarkMode)}
                  className="p-3 rounded-full glass border border-white/20 dark:border-white/10 text-gray-600 dark:text-gray-300 hover:scale-110 transition-all"
                >
                  {isDarkMode ? <Sun size={24} /> : <Moon size={24} />}
                </button>
              </div>

              <motion.div
                initial={{ y: 15, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ ...pageTransition, delay: 0.1 }}
                className="text-center mb-12"
              >
                <h1 className="text-7xl font-bold tracking-tighter text-gray-900 dark:text-white mb-4 select-none">
                  Khoj<span className="text-teal-500">Verse</span>
                </h1>
                <p className="text-xl text-gray-500 dark:text-gray-400 font-light flex items-center justify-center gap-2">
                  Explore the Multiverse of Ideas <Sparkles size={20} className="text-teal-400" />
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ ...pageTransition, delay: 0.2 }}
                className="relative w-full max-w-2xl"
              >
                <div className="glass rounded-full px-8 py-5 flex items-center gap-4 shadow-xl shadow-teal-100/20 dark:shadow-teal-900/10 group focus-within:ring-2 ring-teal-200 dark:ring-teal-700 transition-all duration-500">
                  <Search className="text-gray-400 group-focus-within:text-teal-500" size={24} />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => {
                      setSearchQuery(e.target.value);
                      setShowSuggestions(e.target.value.length > 0);
                    }}
                    onFocus={() => searchQuery.length > 0 && setShowSuggestions(true)}
                    placeholder="What do you want to explore?"
                    className="bg-transparent border-none outline-none w-full text-lg placeholder:text-gray-300 dark:placeholder:text-gray-600 text-gray-700 dark:text-gray-200 font-medium"
                  />
                </div>

                <AnimatePresence>
                  {showSuggestions && (
                    <motion.div
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -5 }}
                      transition={pageTransition}
                      className="absolute top-full left-0 right-0 mt-4 glass rounded-3xl p-4 z-50 shadow-2xl overflow-hidden border border-white/60 dark:border-white/10"
                    >
                      <p className="text-xs font-semibold text-gray-400 dark:text-gray-500 mb-3 ml-4 uppercase tracking-wider">Suggestions</p>
                      {SEARCH_SUGGESTIONS.map((s, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleSearchSuggestionClick(s)}
                          className="w-full text-left px-4 py-3 rounded-2xl hover:bg-teal-50 dark:hover:bg-teal-900/30 text-gray-600 dark:text-gray-300 hover:text-teal-600 dark:hover:text-teal-400 flex items-center justify-between group transition-all"
                        >
                          {s}
                          <ChevronRight size={16} className="opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" />
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ ...pageTransition, delay: 0.3 }}
                className="mt-12 flex gap-4"
              >
                <button
                  onClick={() => { setCurrentPage('dashboard'); setActiveCategory('Trending'); }}
                  className="px-8 py-3 bg-teal-500 text-white rounded-full font-semibold hover:bg-teal-600 transition-all shadow-lg shadow-teal-200 dark:shadow-teal-900/50 hover:shadow-teal-300 hover:scale-105 active:scale-95"
                >
                  Explore Trending
                </button>
                <button
                  onClick={() => setCurrentPage('login')}
                  className="px-8 py-3 glass text-gray-600 dark:text-gray-300 rounded-full font-semibold hover:bg-white/80 dark:hover:bg-white/10 transition-all hover:scale-105 border border-white dark:border-white/10 active:scale-95"
                >
                  Login
                </button>
              </motion.div>
            </motion.div>
          )}

          {currentPage === 'login' && (
            <motion.div
              key="login"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={pageTransition}
              className="flex items-center justify-center min-h-screen p-4"
            >
              <div className="glass w-full max-w-md p-10 rounded-[40px] shadow-2xl border border-white/60 dark:border-white/10">
                <div className="text-center mb-10">
                  <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">Welcome Back</h2>
                  <p className="text-gray-500 dark:text-gray-400">Sign in to the Universe of Ideas</p>
                </div>

                <form onSubmit={handleLogin} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-2 ml-1">Email Address</label>
                    <input
                      type="email"
                      required
                      placeholder="explorer@khojverse.io"
                      className="w-full px-6 py-4 rounded-2xl border-none ring-1 ring-gray-100 dark:ring-gray-800 focus:ring-2 focus:ring-teal-400 outline-none glass dark:text-white transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-2 ml-1">Password</label>
                    <input
                      type="password"
                      required
                      placeholder="••••••••"
                      className="w-full px-6 py-4 rounded-2xl border-none ring-1 ring-gray-100 dark:ring-gray-800 focus:ring-2 focus:ring-teal-400 outline-none glass dark:text-white transition-all"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-teal-500 text-white py-4 rounded-2xl font-bold hover:bg-teal-600 transition-all shadow-xl shadow-teal-100 dark:shadow-teal-900/40 active:scale-[0.98]"
                  >
                    Log In
                  </button>
                </form>

                <div className="mt-8 pt-8 border-t border-gray-100 dark:border-gray-800">
                  <button
                    onClick={() => {
                      setCurrentUser({ name: 'Guest Explorer', email: 'guest@khojverse.io', avatar: 'https://picsum.photos/seed/guest/100/100' });
                      setCurrentPage('dashboard');
                    }}
                    className="w-full text-teal-600 dark:text-teal-400 font-medium hover:text-teal-700 dark:hover:text-teal-300 transition-colors"
                  >
                    Continue as Guest
                  </button>
                </div>

                <div className="mt-4 text-center">
                  <button
                    onClick={() => setCurrentPage('landing')}
                    className="text-gray-400 dark:text-gray-500 text-sm hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                  >
                    Go Back to Landing
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {currentPage === 'dashboard' && (
            <motion.div
              key="dashboard"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={pageTransition}
              className="flex flex-col min-h-screen"
            >
              {/* Header */}
              <header className="glass sticky top-0 z-[60] px-8 py-4 flex items-center justify-between border-b border-white/50 dark:border-white/5 backdrop-blur-md">
                <div
                  className="flex items-center gap-2 cursor-pointer group"
                  onClick={() => setCurrentPage('landing')}
                >
                  <div className="w-10 h-10 rounded-xl bg-teal-500 flex items-center justify-center text-white shadow-lg shadow-teal-200 dark:shadow-teal-900/50 group-hover:rotate-12 transition-transform">
                    <Sparkles size={20} />
                  </div>
                  <h1 className="text-2xl font-extrabold text-gray-900 dark:text-white tracking-tight">KhojVerse</h1>
                </div>

                <div className="flex-grow max-w-xl mx-12 hidden md:block">
                  <div className="glass rounded-2xl px-5 py-2.5 flex items-center gap-3 border-none ring-1 ring-gray-100 dark:ring-white/10 focus-within:ring-2 ring-teal-200 dark:ring-teal-800 transition-all">
                    <Search className="text-gray-400" size={18} />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search ideas, topics, researchers..."
                      className="bg-transparent border-none outline-none w-full text-sm text-gray-700 dark:text-gray-200"
                    />
                  </div>
                </div>

                <div className="flex items-center gap-4 lg:gap-6">
                  <button
                    onClick={() => setIsDarkMode(!isDarkMode)}
                    className="p-2.5 rounded-xl glass border border-white/20 dark:border-white/10 text-gray-600 dark:text-gray-300 hover:bg-white/40 dark:hover:bg-white/10 transition-all"
                  >
                    {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
                  </button>
                  <button className="text-gray-400 dark:text-gray-500 hover:text-teal-500 dark:hover:text-teal-400 relative transition-colors">
                    <Bell size={22} />
                    <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-400 rounded-full border-2 border-white dark:border-slate-900"></span>
                  </button>
                  <div className="flex items-center gap-3 pl-6 border-l border-gray-200 dark:border-gray-800">
                    <div className="text-right hidden sm:block">
                      <p className="text-sm font-bold text-gray-800 dark:text-white">{currentUser?.name || 'Explorer'}</p>
                      <p className="text-[10px] text-gray-400 uppercase tracking-widest font-semibold">Pro Plan</p>
                    </div>
                    <div className="w-10 h-10 rounded-full border-2 border-teal-200 dark:border-teal-800 p-0.5 overflow-hidden">
                      <img
                        src={currentUser?.avatar || 'https://picsum.photos/seed/anon/100/100'}
                        alt="avatar"
                        className="w-full h-full rounded-full object-cover"
                      />
                    </div>
                  </div>
                </div>
              </header>

              <main className="flex flex-grow p-4 lg:p-8 gap-8 container mx-auto relative">
                {/* Sidebar */}
                <aside className="hidden lg:block w-64 shrink-0">
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ ...pageTransition, delay: 0.1 }}
                    className="flex flex-col h-[calc(100vh-120px)] glass rounded-3xl p-4 sticky top-24 border border-white/50 dark:border-white/5"
                  >
                    <Sidebar
                      activeCategory={activeCategory}
                      setActiveCategory={(cat) => { setActiveCategory(cat); setIsSortOpen(false); }}
                      onLogout={() => setCurrentPage('landing')}
                    />
                    <div className="mt-4 pt-4 border-t border-teal-50/50 dark:border-teal-900/30">
                      <button
                        onClick={() => setActiveCategory('AI Lab')}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl transition-all duration-300 ${activeCategory === 'AI Lab' ? 'bg-teal-500 text-white shadow-lg shadow-teal-200 dark:shadow-teal-900/50' : 'text-gray-500 dark:text-gray-400 hover:bg-teal-50 dark:hover:bg-teal-900/20 hover:text-teal-600 dark:hover:text-teal-400'}`}
                      >
                        <BrainCircuit size={20} />
                        <span className="font-medium">AI Lab</span>
                      </button>
                      <button
                        onClick={() => setActiveCategory('Live Assistant')}
                        className={`w-full flex items-center gap-3 px-4 py-3 mt-2 rounded-2xl transition-all duration-300 ${activeCategory === 'Live Assistant' ? 'bg-teal-500 text-white shadow-lg shadow-teal-200 dark:shadow-teal-900/50' : 'text-gray-500 dark:text-gray-400 hover:bg-teal-50 dark:hover:bg-teal-900/20 hover:text-teal-600 dark:hover:text-teal-400'}`}
                      >
                        <Radio size={20} />
                        <span className="font-medium">Live Sync</span>
                      </button>
                    </div>
                  </motion.div>
                </aside>

                {/* Content area */}
                <div className="flex-grow space-y-8 min-w-0">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeCategory}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0, filter: "blur(4px)" }}
                      transition={{ ...pageTransition, duration: 0.3 }}
                      className="w-full"
                    >
                      {activeCategory === 'AI Lab' ? (
                        <AILab />
                      ) : activeCategory === 'Live Assistant' ? (
                        <LiveAssistant />
                      ) : (
                        <div className="space-y-8">
                          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                            <motion.div
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={{ ...pageTransition, delay: 0.05 }}
                            >
                              <h2 className="text-3xl font-extrabold text-gray-800 dark:text-white flex items-center gap-3">
                                {activeCategory} {activeCategory === 'Trending' && <span className="px-3 py-1 bg-red-50 dark:bg-red-900/20 text-red-500 text-xs rounded-full border border-red-100 dark:border-red-900/30 animate-pulse font-bold tracking-tight">HOT</span>}
                              </h2>
                              <p className="text-gray-500 dark:text-gray-400 font-medium">Discovering the next big thing in {activeCategory.toLowerCase()}</p>
                            </motion.div>

                            <motion.div
                              className="relative"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={{ ...pageTransition, delay: 0.1 }}
                            >
                              <div className="flex items-center gap-3">
                                <span className="text-sm text-gray-400 dark:text-gray-500 font-medium flex items-center gap-1">
                                  <Filter size={16} /> Sort by:
                                </span>

                                <button
                                  onClick={() => setIsSortOpen(!isSortOpen)}
                                  className="glass border border-white/50 dark:border-white/5 rounded-2xl px-5 py-2.5 text-sm text-teal-600 dark:text-teal-400 font-semibold flex items-center gap-3 min-w-[180px] justify-between shadow-sm hover:shadow-md transition-all active:scale-95"
                                >
                                  {sortOptions.find(o => o.value === sortBy)?.label}
                                  <ChevronDown size={16} className={`transition-transform duration-500 ease-out ${isSortOpen ? 'rotate-180' : ''}`} />
                                </button>
                              </div>

                              <AnimatePresence>
                                {isSortOpen && (
                                  <motion.div
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    transition={{ ...pageTransition, duration: 0.2 }}
                                    className="absolute top-full right-0 mt-2 glass border border-white/60 dark:border-white/10 rounded-2xl p-2 z-[70] shadow-2xl min-w-[200px] overflow-hidden backdrop-blur-xl"
                                  >
                                    {sortOptions.map((option) => (
                                      <button
                                        key={option.value}
                                        onClick={() => {
                                          setSortBy(option.value);
                                          setIsSortOpen(false);
                                        }}
                                        className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm transition-all ${sortBy === option.value
                                          ? 'bg-teal-500 text-white shadow-lg shadow-teal-100 dark:shadow-teal-900/40'
                                          : 'text-gray-600 dark:text-gray-300 hover:bg-teal-50 dark:hover:bg-teal-900/30 hover:text-teal-600 dark:hover:text-teal-400'
                                          }`}
                                      >
                                        {option.label}
                                        {sortBy === option.value && <Check size={14} />}
                                      </button>
                                    ))}
                                  </motion.div>
                                )}
                              </AnimatePresence>
                            </motion.div>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                            {filteredIdeas.length > 0 ? (
                              filteredIdeas.map((idea, index) => (
                                <motion.div
                                  key={idea.id}
                                  initial={{ opacity: 0, y: 8 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  transition={{
                                    ...pageTransition,
                                    delay: Math.min(index * 0.03, 0.3)
                                  }}
                                >
                                  <IdeaCard idea={idea} />
                                </motion.div>
                              ))
                            ) : (
                              <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="col-span-full py-20 text-center glass rounded-[40px] border border-white/40 dark:border-white/10"
                              >
                                <div className="flex justify-center mb-4">
                                  <div className="w-16 h-16 rounded-full bg-teal-50 dark:bg-teal-900/20 flex items-center justify-center text-teal-500 opacity-50">
                                    <Search size={32} />
                                  </div>
                                </div>
                                <p className="text-gray-400 dark:text-gray-500 font-medium">No ideas found matching your search.</p>
                                <button
                                  onClick={() => setSearchQuery('')}
                                  className="mt-4 text-teal-500 dark:text-teal-400 font-semibold hover:underline"
                                >
                                  Clear Search
                                </button>
                              </motion.div>
                            )}
                          </div>
                        </div>
                      )}
                    </motion.div>
                  </AnimatePresence>
                </div>
              </main>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default App;
