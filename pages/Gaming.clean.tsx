import { NextPage } from "next";
import React, { useEffect, useRef, useState, ReactElement } from "react";
import Head from "next/head";
import { motion, AnimatePresence, useAnimation } from "framer-motion";
import { FaGamepad, FaDiscord, FaSteam, FaWindows, FaXbox, FaPlaystation } from 'react-icons/fa';
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
  completion: number;
  platforms: string[];
  rank?: string;
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
    image: '/Resident Evil GIF by Regal.gif',
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
    title: 'Valorant',
    tagline: 'Defy the limits',
    description: 'A 5v5 character-based tactical FPS where precise gunplay meets unique agent abilities.',
    image: 'https://i.gifer.com/7VB.gif',
    icon: <GiPistolGun className="text-3xl text-red-400" />,
    genre: 'Tactical FPS',
    rating: 4.7,
    hours: 580,
    completion: 0,
    rank: 'Immortal',
    platforms: ['windows']
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
  const [play, setPlay] = useState<boolean>(true);
  const [activeGame, setActiveGame] = useState<number | null>(null);
  const [isHovering, setIsHovering] = useState<number | null>(null);
  const controls = useAnimation();
  const audioRef = useRef<HTMLAudioElement>(null);
  
  // Stats counter animation
  const [stats, setStats] = useState<Stat[]>([
    { value: 0, label: 'Games Played', max: 8, suffix: '+' },
    { value: 0, label: 'Hours Played', max: 100, suffix: '+' },
    { value: 0, label: 'Achievements', max: 6, suffix: '%' },
    { value: 1, label: 'Current Rank', max: 1, suffix: '' }
  ]);

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

  // Handle audio player
  const managePlayer = (shouldPlay: boolean) => {
    if (!audioRef.current) return;
    
    if (shouldPlay) {
      audioRef.current.play().catch(error => {
        console.log('Audio playback failed:', error);
      });
    } else {
      audioRef.current.pause();
    }
    setPlay(shouldPlay);
  };

  // Animate stats counter
  useEffect(() => {
    const timer = setInterval(() => {
      setStats(prevStats => 
        prevStats.map(stat => ({
          ...stat,
          value: stat.value < stat.max ? stat.value + 1 : stat.value
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
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-950 to-black text-gray-200 overflow-x-hidden">
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

      <div className="relative z-10 pt-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* Floating Music Player */}
        <motion.div 
          className="fixed bottom-6 right-6 z-50 flex items-center space-x-3"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <div className="bg-black/60 backdrop-blur-md rounded-full p-3 shadow-lg border border-white/10">
            <button 
              onClick={() => managePlayer(!play)}
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
          <audio ref={audioRef} loop>
            <source src="/music.mp3" type="audio/mpeg" />
            Your browser does not support the audio element.
          </audio>
        </motion.div>

        {/* Hero Section */}
        <motion.div 
          className="text-center mb-16 md:mb-24"
          initial="hidden"
          animate={controls}
          variants={fadeIn}
        >
          <motion.h1 className="text-4xl md:text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-500">
            My Gaming Universe
          </motion.h1>
          <motion.p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto">
            Exploring immersive worlds, competing in intense battles, and creating unforgettable gaming memories.
          </motion.p>
        </motion.div>

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
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-24"
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
                   style={{ backgroundImage: `url(${game.image})` }}>
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent"></div>
              </div>
              
              <div className="relative h-full flex flex-col justify-between p-6">
                <div>
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-bold text-white">{game.title}</h3>
                    <div className="flex space-x-2">
                      {game.platforms.map((platform) => (
                        <span key={`${game.id}-${platform}`} className="text-lg">
                          {getPlatformIcon(platform)}
                        </span>
                      ))}
                    </div>
                  </div>
                  <p className="text-purple-400 text-sm font-medium mb-2">{game.tagline}</p>
                  <p className="text-gray-300 text-sm line-clamp-3">{game.description}</p>
                </div>
                
                <div className="flex justify-between items-center text-sm text-gray-400">
                  <span>{game.genre}</span>
                  <div className="flex items-center space-x-2">
                    <span>★ {game.rating}</span>
                    <span>•</span>
                    <span>{game.hours}h</span>
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
        <motion.div 
          className="relative bg-gradient-to-r from-purple-900/50 to-blue-900/50 rounded-2xl p-8 md:p-12 mb-24 overflow-hidden"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-purple-500/10 rounded-full filter blur-3xl"></div>
          <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-blue-500/10 rounded-full filter blur-3xl"></div>
          
          <div className="relative z-10 text-center max-w-3xl mx-auto">
            <h2 className="text-2xl md:text-4xl font-bold mb-4">Let's Play Together!</h2>
            <p className="text-gray-300 mb-8">
              Interested in teaming up for some gaming sessions? Feel free to add me on your preferred platform.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a 
                href="https://steamcommunity.com/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center px-6 py-3 bg-white/10 hover:bg-white/20 border border-white/10 rounded-lg transition-colors"
              >
                <FaSteam className="mr-2" />
                Steam
              </a>
              <a 
                href="https://discord.com/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center px-6 py-3 bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors"
              >
                <FaDiscord className="mr-2" />
                Discord
              </a>
              <a 
                href="https://www.xbox.com/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center px-6 py-3 bg-green-600 hover:bg-green-700 rounded-lg transition-colors"
              >
                <FaXbox className="mr-2" />
                Xbox Live
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Gaming;
