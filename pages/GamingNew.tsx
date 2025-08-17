import { NextPage } from "next";
import React, { useEffect, useRef } from "react";
import { useState } from "react";
import Head from "next/head";
import { motion } from "framer-motion";
import { FaGamepad, FaHeadset, FaTrophy, FaUsers, FaDiscord, FaSteam } from 'react-icons/fa';
import { GiPistolGun, GiSwordman, GiCarWheel, GiPistolGun as GiPistol } from 'react-icons/gi';

// Game data
const games = [
  {
    id: 1,
    title: 'Sekiro: Shadows Die Twice',
    description: 'Your sword is your tongue — speak only in death.',
    image: '/from software sekiro GIF.gif',
    icon: <GiSwordman className="text-3xl text-red-500" />,
    genre: 'Action RPG',
    platform: 'PC, PS4, Xbox One'
  },
  {
    id: 2,
    title: 'Resident Evil',
    description: 'A city overrun by zombies, a world drowning in fear',
    image: 'C:\Users\arman\VS-Code-Theme-Portfolio\public\Resident Evil GIF by Regal.gif',
    icon: <GiPistolGun className="text-3xl text-green-500" />,
    genre: 'Survival Horror',
    platform: 'PC, PS4, PS5, Xbox'
  },
  {
    id: 3,
    title: 'Forza Horizon 5',
    description: 'Lead breathtaking expeditions across the vibrant and ever-evolving open world landscapes of Mexico',
    image: 'https://i.gifer.com/7VA.gif',
    icon: <GiCarWheel className="text-3xl text-blue-500" />,
    genre: 'Racing',
    platform: 'PC, Xbox Series X/S'
  },
  {
    id: 4,
    title: 'Valorant',
    description: 'A 5v5 character-based tactical FPS where precise gunplay meets unique agent abilities',
    image: 'https://i.gifer.com/7VB.gif',
    icon: <GiPistol className="text-3xl text-red-400" />,
    genre: 'FPS',
    platform: 'PC'
  }
];

// Animation variants
const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { 
    opacity: 1, 
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 10
    }
  }
};

const Gaming: NextPage = () => {
  const [play, setPlay] = useState(true);
  const player = useRef<HTMLAudioElement>(null);

  const managePlayer = (shouldPlay: boolean) => {
    if (player.current) {
      shouldPlay ? player.current.play() : player.current.pause();
      setPlay(shouldPlay);
    }
  };

  useEffect(() => {
    if (player.current) {
      player.current.volume = 0.3;
      player.current.play().catch(e => console.log("Autoplay prevented"));
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900">
      <Head>
        <title>Gaming | Arman Khan</title>
        <meta name="description" content="Explore my gaming profile, favorite games, and connect with me for multiplayer sessions" />
        <link rel="icon" href="/favicon.ico" />
        <meta property="og:title" content="Gaming | Arman Khan" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.armankhan.com/gaming" />
        <meta property="og:image" content="/gaming-og.jpg" />
      </Head>

      <div className="relative overflow-hidden">
        {/* Animated background */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 to-purple-900/80"></div>
          <div className="absolute inset-0 bg-[url('https://i.imgur.com/9Jz9XQh.png')] opacity-10"></div>
        </div>

        {/* Main content */}
        <div className="relative z-10">
          {/* Hero Section */}
          <section className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
            <div className="text-center">
              <motion.h1 
                className="text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                Gaming Hub
              </m.h1>
              
              <motion.p 
                className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                Welcome to my gaming universe! Here you'll find my favorite games, achievements, and gaming setup. 
                Feel free to connect for multiplayer sessions or just to chat about games!
              </motion.p>

              {/* Audio Player */}
              <motion.div 
                className="flex justify-center items-center space-x-4 mb-12"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <button 
                  onClick={() => managePlayer(!play)}
                  className="p-3 rounded-full bg-purple-600 hover:bg-purple-700 transition-all duration-300 transform hover:scale-110"
                  aria-label={play ? 'Pause background music' : 'Play background music'}
                >
                  {play ? (
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                  ) : (
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                    </svg>
                  )}
                </button>
                <audio ref={player} loop>
                  <source src="/valorantring.mp3" type="audio/mp3" />
                  Your browser does not support the audio element.
                </audio>
                <span className="text-sm text-gray-400">Background Music: Valorant Theme</span>
              </motion.div>

              {/* Stats */}
              <motion.div 
                className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto mb-16"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                {[
                  { icon: <FaGamepad className="text-4xl text-purple-400" />, title: 'Games Played', value: '50+' },
                  { icon: <FaTrophy className="text-4xl text-yellow-400" />, title: 'Achievements', value: '120+' },
                  { icon: <FaUsers className="text-4xl text-blue-400" />, title: 'Friends', value: '100+' },
                  { icon: <FaHeadset className="text-4xl text-green-400" />, title: 'Hours Played', value: '2K+' },
                ].map((stat, index) => (
                  <div key={index} className="bg-white/5 backdrop-blur-sm rounded-xl p-6 text-center border border-white/10 hover:border-purple-500/30 transition-all duration-300">
                    <div className="flex justify-center mb-2">{stat.icon}</div>
                    <h3 className="text-3xl font-bold text-white mb-1">{stat.value}</h3>
                    <p className="text-gray-400 text-sm">{stat.title}</p>
                  </div>
                ))}
              </motion.div>
            </div>
          </section>

          {/* Games Grid */}
          <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
            <motion.h2 
              className="text-3xl md:text-4xl font-bold text-center mb-12 text-white"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              My <span className="text-purple-400">Favorite Games</span>
            </motion.h2>
            
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 max-w-6xl mx-auto"
              variants={container}
              initial="hidden"
              animate="show"
            >
              {games.map((game) => (
                <motion.div 
                  key={game.id}
                  className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 hover:border-purple-500/50 transition-all duration-500 shadow-xl hover:shadow-2xl hover:shadow-purple-500/20"
                  variants={item}
                  whileHover={{ y: -10, scale: 1.02 }}
                >
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={game.image} 
                      alt={game.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent"></div>
                    <div className="absolute top-4 right-4 bg-black/70 backdrop-blur-sm rounded-full p-2">
                      {game.icon}
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-xl font-bold text-white">{game.title}</h3>
                      <span className="px-3 py-1 bg-purple-600/30 text-purple-300 text-xs font-medium rounded-full">
                        {game.genre}
                      </span>
                    </div>
                    
                    <p className="text-gray-300 mb-4">{game.description}</p>
                    
                    <div className="flex items-center justify-between pt-4 border-t border-gray-700">
                      <span className="text-sm text-gray-400">{game.platform}</span>
                      <button 
                        className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg text-sm font-medium transition-all duration-300 transform hover:scale-105"
                        onClick={() => window.location.href = '#contact'}
                      >
                        Play Together
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </section>

          {/* CTA Section */}
          <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto text-center">
            <motion.div 
              className="bg-gradient-to-r from-purple-900/50 to-pink-900/50 backdrop-blur-sm rounded-2xl p-8 border border-white/10"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">Ready for a Game?</h3>
              <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
                I'm always looking for new gaming buddies! Whether you want to team up or just chat about games, feel free to reach out.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <button className="flex items-center justify-center gap-2 px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium transition-all duration-300 transform hover:scale-105">
                  <FaDiscord className="text-xl" /> Connect on Discord
                </button>
                <button className="flex items-center justify-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-lg font-medium transition-all duration-300 transform hover:scale-105">
                  <FaSteam className="text-xl" /> View Steam Profile
                </button>
              </div>
            </motion.div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Gaming;
