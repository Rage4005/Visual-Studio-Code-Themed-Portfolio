import { NextPage } from "next";
import React, { useEffect, useRef, useState, ReactElement } from "react";
import Head from "next/head";
import { motion, AnimatePresence, useAnimation } from 'framer-motion';
import { FaGamepad, FaDiscord, FaSteam, FaWindows, FaXbox, FaPlaystation, FaMusic, FaPause } from 'react-icons/fa';
import { GiPistolGun, GiSwordman, GiCarWheel, GiJoystick } from 'react-icons/gi';
import { SiEpicgames, SiNintendoswitch } from 'react-icons/si';

interface Game {
  id: number;
  title: string;
  tagline: string;
  description: string;
  image: string;
  icon: React.ReactNode;
  genre: string;
  rating: number;
  hours: number;
  completion?: number;
  rank?: string;
  platforms: string[];
}

interface Stat {
  value: number;
  label: string;
  max: number;
  suffix: string;
}

// Game data
const games: Game[] = [
  {
    id: 1,
    title: 'Sekiro: Shadows Die Twice',
    tagline: 'Hesitation is defeat',
    description: 'Carve your own clever path to vengeance in this award-winning action-adventure from developer FromSoftware, creators of the Dark Souls series.',
    image: '/222319.gif',
    icon: <GiSwordman className="text-3xl text-red-500" />,
    genre: 'Action RPG',
    rating: 4.8,
    hours: 120,
    completion: 87,
    platforms: ['windows', 'playstation', 'xbox']
  },
  {
    id: 2,
    title: 'Resident Evil ',
    tagline: 'Survival is just the beginning',
    description: 'A modern reimagining of the genre-defining Resident Evil 4, rebuilt from the ground up to deliver state-of-the-art survival horror.',
    image: '/Resident%20Evil%20GIF%20by%20Regal.gif',
    icon: <GiPistolGun className="text-3xl text-green-500" />,
    genre: 'Survival Horror',
    rating: 4.9,
    hours: 65,
    completion: 92,
    platforms: ['windows', 'playstation', 'xbox', 'switch']
  },
  {
    id: 3,
    title: 'Elden Ring',
    tagline: 'Rise, Tarnished',
    description: 'The Golden Order has been broken. Rise, Tarnished, and be guided by grace to brandish the power of the Elden Ring and become an Elden Lord in the Lands Between.',
    image: '215613.gif',
    icon: <GiCarWheel className="text-3xl text-yellow-500" />,
    genre: 'Action RPG',
    rating: 4.9,
    hours: 250,
    completion: 100,
    platforms: ['windows', 'playstation', 'xbox']
  },
  {
    id: 4,
    title: 'Marvel\'s Spider-Man Series',
    tagline: 'With great power comes great responsibility.',
    description: 'Experience the complete Spider-Man story across multiple games, featuring thrilling web-swinging through New York City, intense combat, and an emotional narrative that brings Peter Parker\'s journey to life.',
    image: '/Video%20Game%20Playstation%20GIF%20by%20GIPHY%20Gaming.gif',
    icon: <GiPistolGun className="text-3xl text-red-500" />,
    genre: 'Action-Adventure / Open World',
    rating: 4.9,
    hours: 120,
    completion: 95,
    platforms: ['playstation', 'windows']
  }
];

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  },
  exit: { opacity: 0 }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { 
    opacity: 1, 
    y: 0, 
    transition: { 
      duration: 0.5,
      ease: [0.6, -0.05, 0.01, 0.99]
    } 
  },
  hover: {
    y: -5,
    scale: 1.02,
    transition: {
      duration: 0.2
    },
    boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
  }
};

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.6, -0.05, 0.01, 0.99]
    }
  }
};

const statsContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const statItem = {
  hidden: { opacity: 0, y: 20 },
  show: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.6, -0.05, 0.01, 0.99]
    }
  }
} as const;

const Gaming: NextPage = (): ReactElement => {
  // State
  const [isHovering, setIsHovering] = useState<number | null>(null);
  const [activeGame, setActiveGame] = useState<number | null>(null);
  const [play, setPlay] = useState<boolean>(true);
  const audioRef = useRef<HTMLAudioElement>(null);
  const controls = useAnimation();
  
  // Stats counter animation
  const [stats, setStats] = useState<Stat[]>([
    { value: 0, label: 'Games Played', max: 8, suffix: '+' },
    { value: 0, label: 'Hours Played', max: 100, suffix: '+' },
    { value: 0, label: 'Achievements', max: 6, suffix: '%' },
    { value: 1, label: 'Current Rank', max: 1, suffix: '' }
  ]);

  // Handle audio player
  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.volume = 0.5; // Set volume to 50%
      // Try to autoplay, but don't show errors if it fails
      audio.play().catch(() => setPlay(false));
    }
    
    return () => {
      if (audio) {
        audio.pause();
      }
    };
  }, []);

  // Toggle play/pause
  const togglePlayPause = () => {
    const audio = audioRef.current;
    if (!audio) return;
    
    if (play) {
      audio.pause();
    } else {
      audio.play().catch(console.error);
    }
    setPlay(!play);
  };

  // Get platform icon
  const getPlatformIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
      case 'windows':
        return <FaWindows className="text-blue-400" />;
      case 'xbox':
        return <FaXbox className="text-green-500" />;
      case 'playstation':
        return <FaPlaystation className="text-blue-400" />;
      case 'switch':
        return <SiNintendoswitch className="text-red-500" />;
      case 'epic':
        return <SiEpicgames className="text-white" />;
      default:
        return null;
    }
  };

  // Animate stats counter
  useEffect(() => {
    const timer = setInterval(() => {
      setStats(prevStats => 
        prevStats.map(stat => ({
          ...stat,
          value: stat.value < stat.max ? stat.value + 1 : stat.max
        }))
      );
    }, 100);

    return () => clearInterval(timer);
  }, []);
  
  // Animate hero section
  useEffect(() => {
    controls.start('visible');
  }, [controls]);


  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-950 to-black text-gray-200 overflow-x-hidden w-full">
      {/* Audio Player - Single instance */}
      <audio 
        ref={audioRef}
        loop
        src="/Bad_Parenting_Title_Song_Old_YazooBest_Part_Slowed_KLICKAUD.mp3"
        onPlay={() => setPlay(true)}
        onPause={() => setPlay(false)}
        className="hidden"
      />
      <Head>
        <title>Gaming | Arman Khan</title>
        <meta name="description" content="Explore my gaming profile, favorite games, and connect with me for multiplayer sessions" />
        <link rel="icon" href="/favicon.ico" />
        <meta property="og:title" content="Gaming | Arman Khan" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.armankhan.com/gaming" />
        <meta property="og:image" content="/gaming-og.jpg" />
      </Head>
      
      {/* Animated background */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-950 to-black"></div>
        <div className="absolute inset-0 opacity-10 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
      </div>

      <div className="relative z-10 pt-20 px-4 sm:px-6 lg:px-8 w-full">
        {/* Floating Music Player */}
        <motion.div 
          className="fixed bottom-6 right-6 z-50 flex items-center space-x-3"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <div className="bg-black/60 backdrop-blur-md rounded-full p-3 shadow-lg border border-white/10">
            <button 
              onClick={togglePlayPause}
              className="text-white hover:text-purple-400 transition-colors"
              aria-label={play ? 'Pause music' : 'Play music'}
            >
              {play ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              )}
            </button>
          </div>
        </motion.div>

        {/* Hero Section */}
        <div className="relative overflow-hidden py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-500">
                My Gaming Universe
              </span>
            </h1>
            <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto">
              Exploring immersive worlds, competing in intense battles, and creating unforgettable gaming memories.
            </p>
          </div>
        </div>

        {/* Stats */}
        <motion.div 
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
          variants={statsContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          {stats.map((stat, index) => (
            <motion.div 
              key={index}
              className="bg-white/5 backdrop-blur-sm rounded-xl p-6 text-center border border-white/10"
              variants={statItem}
            >
              <div className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-500">
                {stat.value}{stat.suffix}
              </div>
              <div className="text-gray-400 text-sm mt-1">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Games Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-24 w-full px-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          {games.map((game) => (
            <motion.div 
              key={game.id} 
              className="bg-white/5 backdrop-blur-sm rounded-xl overflow-hidden border border-white/10 hover:border-purple-500/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-purple-500/10 group relative h-80 w-full"
              variants={itemVariants}
              whileHover="hover"
              onMouseEnter={() => setIsHovering(game.id)}
              onMouseLeave={() => setIsHovering(null)}
              onClick={() => setActiveGame(activeGame === game.id ? null : game.id)}
            >
              <div className="absolute inset-0 bg-cover bg-center transition-all duration-500 group-hover:scale-105" 
                   style={{ 
                     backgroundImage: `url(${game.image})`,
                     backgroundPosition: 'center 30%',
                     backgroundSize: 'cover',
                     height: '100%',
                     width: '100%'
                   }}>
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent"></div>
              </div>
              
              <div className="relative h-full flex flex-col justify-between p-6">
                <div>
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-2xl font-bold text-white">{game.title}</h3>
                    <div className="flex space-x-2 bg-black/50 p-1.5 rounded-lg">
                      {game.platforms.map((platform) => (
                        <span key={`${game.id}-${platform}`} className="text-xl">
                          {getPlatformIcon(platform)}
                        </span>
                      ))}
                    </div>
                  </div>
                  <p className="text-purple-300 text-base font-medium mb-4">{game.tagline}</p>
                </div>
                
                <div className="flex justify-between items-center text-base text-gray-300 bg-black/30 backdrop-blur-sm px-4 py-3 rounded-lg">
                  <span className="font-medium">{game.genre}</span>
                  <div className="flex items-center space-x-3">
                    <span className="flex items-center">
                      <span className="text-yellow-400 mr-1">★</span> {game.rating}
                    </span>
                    <span className="text-gray-500">•</span>
                    <span>{game.hours} hours</span>
                  </div>
                </div>
              </div>
              
              <AnimatePresence>
                {activeGame === game.id && (
                  <motion.div 
                    className="absolute inset-0 bg-black/80 backdrop-blur-sm p-6 overflow-y-auto"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ duration: 0.2 }}
                  >
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveGame(null);
                      }}
                      className="absolute top-4 right-4 text-gray-400 hover:text-white"
                      aria-label="Close details"
                    >
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                    <h3 className="text-xl font-bold mb-2">{game.title}</h3>
                    <p className="text-gray-300 mb-4">{game.description}</p>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-gray-400">Genre</p>
                        <p>{game.genre}</p>
                      </div>
                      <div>
                        <p className="text-gray-400">Rating</p>
                        <p>★ {game.rating}/5</p>
                      </div>
                      <div>
                        <p className="text-gray-400">Play Time</p>
                        <p>{game.hours} hours</p>
                      </div>
                      {game.rank && (
                        <div>
                          <p className="text-gray-400">Rank</p>
                          <p>{game.rank}</p>
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Section */}
        <motion.div className="relative bg-gradient-to-br from-gray-900 via-gray-950 to-gray-900 rounded-2xl p-8 md:p-12 mb-24 overflow-hidden border border-gray-700/50 shadow-2xl mx-6"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          {/* Animated background elements */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-32 -right-32 w-64 h-64 bg-purple-500/5 rounded-full filter blur-3xl"></div>
            <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500/5 rounded-full filter blur-3xl"></div>
            <div className="absolute top-1/2 left-1/2 w-full h-full -translate-x-1/2 -translate-y-1/2 bg-gradient-to-br from-purple-500/3 via-transparent to-blue-500/3"></div>
          </div>
          
          <div className="relative z-10 max-w-5xl mx-auto">
            <div className="text-center mb-10">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-purple-500/20 to-blue-500/20 border border-purple-500/30 mb-6">
                <FaGamepad className="text-2xl text-purple-300" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Let's Play <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">Together</span>
              </h2>
              <p className="text-gray-400 max-w-2xl mx-auto">
                Looking for a gaming partner? Let's team up and dominate the battlefield! Add me on your preferred platform.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto mt-12">
              <motion.a 
                whileHover={{ y: -5, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                href="https://discord.com/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="group relative p-6 rounded-xl bg-gray-800/50 border border-gray-700/50 hover:border-indigo-500/50 transition-all duration-300 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative z-10 flex items-center">
                  <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-indigo-600 flex items-center justify-center">
                    <FaDiscord className="w-6 h-6 text-white" />
                  </div>
                  <div className="ml-4">
                    <h3 className="font-medium text-white">Discord</h3>
                    <p className="text-sm text-gray-400">@YourUsername</p>
                  </div>
                </div>
              </motion.a>
              
              <motion.a 
                whileHover={{ y: -5, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                href="https://store.epicgames.com/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="group relative p-6 rounded-xl bg-gray-800/50 border border-gray-700/50 hover:border-blue-500/50 transition-all duration-300 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative z-10 flex items-center">
                  <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-black flex items-center justify-center">
                    <SiEpicgames className="w-6 h-6 text-white" />
                  </div>
                  <div className="ml-4">
                    <h3 className="font-medium text-white">Epic Games</h3>
                    <p className="text-sm text-gray-400">YourEpicID</p>
                  </div>
                </div>
              </motion.a>
            </div>
            
            <div className="mt-10 text-center">
              <p className="text-sm text-gray-500">
                Usually online in the evenings and weekends. Let's make some memories! 🚀
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Gaming;
