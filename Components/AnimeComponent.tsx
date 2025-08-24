import React, { useEffect, useRef, useState } from "react";
import { Scrollbars } from "react-custom-scrollbars";
import { animedata } from "../Components/JSON/animedata";
import { useMediaQuery } from "react-responsive";
import { motion } from "framer-motion";
import { FaPlay, FaPause, FaTv, FaBookOpen } from "react-icons/fa";

const AnimeComponent: React.FC = () => {
  const [play, setPlay] = useState<any>(true);
  const [darkMode, setDarkMode] = useState(false);
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 943px)" });

  // Toggle dark/light mode
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  // Apply dark/light mode classes to the root element
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const player: any = React.createRef();

  useEffect(() => {
    if (player.current) {
      player.current.play();
    }
  }, []);

  const managePlayer = (play: any) => {
    if (player.current) {
      if (play) {
        player.current.play();
      } else {
        player.current.pause();
      }
    }
    setPlay(play);
  };

  return (
    <Scrollbars
      autoHide
      autoHideTimeout={1000}
      autoHideDuration={200}
      universal={true}
      className={`transition-colors duration-300 ${darkMode ? 'bg-gray-900 text-gray-100' : 'bg-gradient-to-br from-gray-100 to-gray-300 text-gray-900'}`}
      style={{ 
        fontFamily: '"Noto Sans JP", "M PLUS 1p", sans-serif',
      }}
    >
      <div className={`relative min-h-screen overflow-hidden transition-colors duration-300 ${darkMode ? 'dark' : ''}`}>
        {/* Dark/Light Mode Toggle */}
        <motion.button
          onClick={toggleDarkMode}
          className="fixed bottom-6 left-6 z-50 p-4 rounded-full bg-black/90 text-white dark:bg-white/20 backdrop-blur-md shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center justify-center"
          aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
          whileHover={{ scale: 1.1, rotate: 10 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5, type: 'spring', stiffness: 300 }}
        >
          {darkMode ? (
            <>
              <FaBookOpen className="w-7 h-7 text-yellow-300" />
              <span className="ml-2 text-sm font-medium">Manga Mode</span>
            </>
          ) : (
            <>
              <FaTv className="w-7 h-7 text-blue-400" />
              <span className="ml-2 text-sm font-medium text-gray-900">Anime Mode</span>
            </>
          )}
        </motion.button>
        {/* Modern Manga Background */}
        <div className={`absolute inset-0 transition-colors duration-700 ${darkMode ? 'bg-gray-900' : 'bg-gray-200'}`}>
          <div 
            className="absolute inset-0 opacity-30"
            style={{
              backgroundImage: "url('https://www.transparenttextures.com/patterns/rice-paper-3.png')",
              backgroundSize: 'cover',
              mixBlendMode: darkMode ? 'overlay' : 'multiply',
              filter: darkMode ? 'brightness(0.7)' : 'none'
            }}
          ></div>
          <div className={`absolute inset-0 transition-colors duration-700 ${
            darkMode 
              ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900/90' 
              : 'bg-gradient-to-br from-gray-300 via-gray-200 to-gray-400/90'
          }`}></div>
        </div>

        <article className="relative z-10 min-h-screen p-4 md:p-8">
          {/* Header Section */}
          <motion.header 
            className={`relative overflow-hidden flex flex-col md:flex-row items-center justify-between mb-12 p-8 md:p-12 rounded-2xl ${
              darkMode 
                ? 'bg-gray-800/80 backdrop-blur-sm border-gray-600/50 shadow-[0_8px_32px_rgba(0,0,0,0.3)] hover:shadow-[0_12px_40px_rgba(0,0,0,0.4)]' 
                : 'bg-gray-100/95 backdrop-blur-sm border-gray-400/50 shadow-[0_8px_32px_rgba(0,0,0,0.12)] hover:shadow-[0_12px_40px_rgba(0,0,0,0.18)]'
            } border transition-all duration-300`}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Decorative elements */}
            <div 
              className={`absolute inset-0 transition-opacity duration-700 ${
                darkMode ? 'opacity-30' : 'opacity-20'
              }`}
              style={{
                backgroundImage: darkMode 
                  ? "url('/best-anime-articles-anime-recommendations-banner.webp')" 
                  : "url('/🎈.jpeg')",
                backgroundSize: darkMode ? '60% auto' : '50% auto',
                backgroundPosition: darkMode ? '70% 15%' : 'center 15%',
                backgroundRepeat: 'no-repeat',
                filter: darkMode 
                  ? 'brightness(0.9) contrast(1.05)' 
                  : 'grayscale(80%) contrast(1.1)',
                mixBlendMode: darkMode ? 'overlay' : 'multiply',
                backgroundAttachment: 'fixed',
                backgroundColor: darkMode ? 'rgba(17, 24, 39, 0.9)' : 'rgba(243, 244, 246, 0.98)'
              }}
            ></div>
            <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-black/20 to-transparent"></div>
            <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-black/10 to-transparent"></div>
            <div className="relative z-10 text-center md:text-left mb-6 md:mb-0">
              <motion.div
                className="inline-block mb-2"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <h1 className="text-5xl md:text-7xl font-black tracking-tight bg-clip-text text-transparent" style={{
                  backgroundImage: darkMode 
                    ? 'linear-gradient(to right, #3b82f6, #8b5cf6)' 
                    : 'linear-gradient(to right, #1f2937, #374151)'
                }}>
                  {darkMode ? '物語の世界へ' : '漫画の魂'}
                </h1>
              </motion.div>
              <motion.div
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <p className={`mt-3 text-2xl font-medium tracking-wide ${
                  darkMode 
                    ? 'text-gray-200 drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)]' 
                    : 'text-gray-600 drop-shadow-[0_1px_2px_rgba(255,255,255,0.9)]'
                }`}>
                  {darkMode ? 'Step Into the World of Stories' : 'The Soul of Manga'}
                </p>
                <p className="text-gray-600 dark:text-gray-400 text-base mt-1 font-medium">
                  {darkMode ? 'Discover the magic of Japanese storytelling' : 'Exploring the art of Japanese comics'}
                </p>
              </motion.div>
            </div>
            
            <button
              onClick={() => managePlayer(!play)}
              className="p-3.5 bg-black text-white hover:bg-gray-800 transition-all transform hover:scale-105 border-2 border-black/90 hover:border-black rounded-lg shadow-sm hover:shadow-md"
              aria-label={play ? 'Pause music' : 'Play music'}
            >
              {play ? <FaPause className="text-white" /> : <FaPlay className="text-white" />}
            </button>
            <audio autoPlay loop ref={player}>
              <source src="/Neon_Genesis_Evangelion_-_Fly_me_to_the_moon_KLICKAUD.mp3" type="audio/mp3" />
              Your browser does not support the audio element.
            </audio>
          </motion.header>

          {/* Anime Grid */}
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            {animedata()?.map((anime, index) => (
              <motion.div
                key={anime.title}
                className={`group relative overflow-hidden ${
                  darkMode 
                    ? 'bg-gray-800/80 hover:bg-gray-700/80 border-gray-600/60 hover:border-gray-500/70' 
                    : 'bg-gray-100/95 hover:bg-gray-200/80 border-gray-400/60 hover:border-gray-500/70'
                } transition-all duration-300 hover:-translate-y-1.5 rounded-xl border shadow-sm hover:shadow-lg backdrop-blur-sm`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + index * 0.1, duration: 0.5 }}
                whileHover={{ 
                  scale: 1.03,
                  filter: 'drop-shadow(0 10px 25px rgba(239, 68, 68, 0.1))',
                  transition: { duration: 0.3 }
                }}
              >
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/black-linen-2.png')] opacity-20"></div>
                <div className="p-6 flex flex-col items-center relative z-10">
                  <div className="relative mb-6 group-hover:scale-105 transition-transform duration-300">
                    <div className={`relative z-10 p-0.5 ${
                      darkMode ? 'bg-gray-700/50 border-gray-600/40' : 'bg-gray-100 border-gray-500/30'
                    } rounded-lg overflow-hidden border group-hover:border-gray-600/40 transition-all duration-300`}>
                      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-black/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <img
                        className="object-cover h-32 w-32 transition-transform duration-500 group-hover:scale-105"
                        src={anime.img}
                        alt={anime.title}
                      />
                    </div>
                  </div>
                  <div className="text-center">
                    <h3 className={`text-xl font-bold ${
                      darkMode 
                        ? 'text-gray-100 group-hover:text-white' 
                        : 'text-gray-700 group-hover:text-gray-900'
                    } mb-1.5 transition-colors tracking-wide`}>
                      {anime.title}
                    </h3>
                    {anime.subtitle && (
                      <p className={`${
                        darkMode 
                          ? 'text-gray-300 group-hover:text-gray-100' 
                          : 'text-gray-600 group-hover:text-gray-800'
                      } text-sm transition-colors`}>{anime.subtitle}</p>
                    )}
                  </div>
                </div>
                <div className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-black group-hover:w-full group-hover:left-0 transition-all duration-300"></div>
              </motion.div>
            ))}
          </motion.div>
        </article>
      </div>
    </Scrollbars>
  );
};

export default AnimeComponent;
