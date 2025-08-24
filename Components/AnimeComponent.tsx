import React, { useEffect, useRef, useState } from "react";
import { Scrollbars } from "react-custom-scrollbars";
import { animedata } from "../Components/JSON/animedata";
import { useMediaQuery } from "react-responsive";
import { motion } from "framer-motion";
import { FaPlay, FaPause } from "react-icons/fa";

const AnimeComponent: React.FC = () => {
  const [play, setPlay] = useState<any>(true);
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 943px)" });

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
      style={{ 
        background: 'linear-gradient(135deg, #dee2e6 0%, #adb5bd 100%)',
        fontFamily: '"Noto Sans JP", "M PLUS 1p", sans-serif',
        color: '#1a1a1a'
      }}
    >
      <div className="relative min-h-screen overflow-hidden">
        {/* Modern Manga Background */}
        <div className="absolute inset-0 bg-gray-200">
          <div 
            className="absolute inset-0 opacity-30"
            style={{
              backgroundImage: "url('https://www.transparenttextures.com/patterns/rice-paper-3.png')",
              backgroundSize: 'cover',
              mixBlendMode: 'multiply'
            }}
          ></div>
          <div className="absolute inset-0 bg-gradient-to-br from-gray-300 via-gray-200 to-gray-400/90"></div>
        </div>

        <article className="relative z-10 min-h-screen p-4 md:p-8">
          {/* Header Section */}
          <motion.header 
            className="relative overflow-hidden flex flex-col md:flex-row items-center justify-between mb-12 p-8 md:p-12 rounded-2xl bg-gray-100/95 backdrop-blur-sm border border-gray-400/50 shadow-[0_8px_32px_rgba(0,0,0,0.12)] hover:shadow-[0_12px_40px_rgba(0,0,0,0.18)] transition-all duration-300"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Decorative elements */}
            <div 
              className="absolute inset-0 opacity-5"
              style={{
                backgroundImage: "url('/🎈.jpeg')",
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                filter: 'grayscale(100%) contrast(1.5)',
                mixBlendMode: 'multiply'
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
                <h1 className="text-5xl md:text-7xl font-black bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-700 tracking-tight">
                  アニメ
                </h1>
              </motion.div>
              <motion.div
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <p className="text-gray-800 mt-3 text-xl tracking-wide">
                  ようこそ、新世紀エヴァンゲリオンの世界へ
                </p>
                <p className="text-gray-600 text-base mt-1 font-medium">
                  Welcome to the World of Neon Genesis Evangelion
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
                className="group relative overflow-hidden bg-gray-100/95 hover:bg-gray-200/80 transition-all duration-300 hover:-translate-y-1.5 rounded-xl border border-gray-400/60 hover:border-gray-500/70 shadow-sm hover:shadow-lg backdrop-blur-sm"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + index * 0.1, duration: 0.5 }}
                whileHover={{ scale: 1.03, boxShadow: '0 10px 25px -5px rgba(239, 68, 68, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.4)' }}
              >
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/black-linen-2.png')] opacity-20"></div>
                <div className="p-6 flex flex-col items-center relative z-10">
                  <div className="relative mb-6 group-hover:scale-105 transition-transform duration-300">
                    <div className="relative z-10 p-0.5 bg-gray-100 rounded-lg overflow-hidden border border-gray-500/30 group-hover:border-gray-600/40 transition-all duration-300">
                      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-black/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <img
                        className="object-cover h-32 w-32 transition-transform duration-500 group-hover:scale-105"
                        src={anime.img}
                        alt={anime.title}
                      />
                    </div>
                  </div>
                  <div className="text-center">
                    <h3 className="text-xl font-bold text-gray-700 mb-1.5 group-hover:text-gray-900 transition-colors tracking-wide">
                      {anime.title}
                    </h3>
                    {anime.subtitle && (
                      <p className="text-gray-600 text-sm group-hover:text-gray-800 transition-colors">{anime.subtitle}</p>
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
