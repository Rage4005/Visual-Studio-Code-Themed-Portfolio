import { NextPage } from "next";
import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Head from "next/head";
import { FaGamepad, FaHeadset, FaTrophy, FaUsers, FaDiscord, FaVolumeUp, FaVolumeMute, FaExternalLinkAlt } from 'react-icons/fa';
import { SiValorant, SiMinecraft, SiEpicgames, SiNintendoswitch, SiPlaystation, SiXbox } from 'react-icons/si';
import { GiCrossedSwords, GiPistolGun, GiSwordman, GiCarWheel } from 'react-icons/gi';
import { BsController } from 'react-icons/bs';

// Inline styles for the gaming page
const styles = `
  .gaming-page {
    min-height: 100vh;
    background-color: #0a0a0f;
    color: #ddd;
    scroll-behavior: smooth;
    overflow-x: hidden;
  }
  
  .gaming-page .game-card {
    transition: all 0.3s ease;
    border: 1px solid rgba(99, 102, 241, 0.2);
    background: rgba(17, 24, 39, 0.6);
    backdrop-filter: blur(10px);
  }
  
  .gaming-page .game-card:hover {
    transform: translateY(-10px) scale(1.02);
    box-shadow: 0 20px 25px -5px rgba(139, 92, 246, 0.1), 0 10px 10px -5px rgba(139, 92, 246, 0.04);
    border-color: rgba(139, 92, 246, 0.5);
  }
  
  @keyframes float {
    0% { transform: translateY(0px); }
    50% { transform: translateY(-20px); }
    100% { transform: translateY(0px); }
  }
  
  @keyframes pulse {
    0% { box-shadow: 0 0 0 0 rgba(139, 92, 246, 0.7); }
    70% { box-shadow: 0 0 0 15px rgba(139, 92, 246, 0); }
    100% { box-shadow: 0 0 0 0 rgba(139, 92, 246, 0); }
  }
  
  @keyframes glow {
    0% { text-shadow: 0 0 5px rgba(124, 58, 237, 0.5); }
    50% { text-shadow: 0 0 20px rgba(124, 58, 237, 0.8); }
    100% { text-shadow: 0 0 5px rgba(124, 58, 237, 0.5); }
  }
`;

// Game data with high-quality GIFs and detailed information
const games = [
  {
    id: 1,
    title: 'Sekiro: Shadows Die Twice',
    description: 'Your sword is your tongue — speak only in death. A punishing action-adventure game set in a dark fantasy world.',
    image: 'https://i.gifer.com/7VC.gif',
    icon: <GiSwordman className="text-red-500 w-6 h-6" />,
    genre: 'Action RPG',
    platform: ['PC', 'PS4', 'Xbox One'],
    platforms: [
      <SiPlaystation key="ps" className="text-blue-500 w-5 h-5" />,
      <SiXbox key="xbox" className="text-green-500 w-5 h-5" />
    ],
    stats: { 'Hours': '150+', 'Bosses': 'All', 'Endings': 'All' },
    color: 'from-red-500/20 to-red-900/40',
    borderColor: 'border-red-500/30',
    buttonColor: 'bg-red-600 hover:bg-red-700',
    url: 'https://www.sekirothegame.com/'
  },
  {
    id: 2,
    title: 'Resident Evil',
    description: 'A city overrun by zombies, a world drowning in fear. Survival horror at its finest with intense action and puzzles.',
    image: 'https://i.gifer.com/7VD.gif',
    icon: <GiPistolGun className="text-green-500 w-6 h-6" />,
    genre: 'Survival Horror',
    platform: ['PC', 'PS4', 'PS5', 'Xbox'],
    platforms: [
      <SiPlaystation key="ps" className="text-blue-500 w-5 h-5" />,
      <SiXbox key="xbox" className="text-green-500 w-5 h-5" />
    ],
    stats: { 'Games': '8', 'Hours': '300+', 'Zombies Killed': '5K+' },
    color: 'from-green-500/20 to-green-900/40',
    borderColor: 'border-green-500/30',
    buttonColor: 'bg-green-600 hover:bg-green-700',
    url: 'https://www.residentevil.com/'
  },
  {
    id: 3,
    title: 'Forza Horizon 5',
    description: 'Lead breathtaking expeditions across the vibrant and ever-evolving open world landscapes of Mexico.',
    image: 'https://i.gifer.com/7VA.gif',
    icon: <GiCarWheel className="text-blue-500 w-6 h-6" />,
    genre: 'Racing',
    platform: ['PC', 'Xbox Series X/S'],
    platforms: [
      <SiXbox key="xbox" className="text-green-500 w-5 h-5" />
    ],
    stats: { 'Cars': '500+', 'Races Won': '200+', 'Hours': '150+' },
    color: 'from-blue-500/20 to-blue-900/40',
    borderColor: 'border-blue-500/30',
    buttonColor: 'bg-blue-600 hover:bg-blue-700',
    url: 'https://forza.net/horizon/'
  },
  {
    id: 4,
    title: 'Valorant',
    description: 'A 5v5 character-based tactical FPS where precise gunplay meets unique agent abilities.',
    image: 'https://i.gifer.com/7VB.gif',
    icon: <SiValorant className="text-red-400 w-6 h-6" />,
    genre: 'FPS / Tactical',
    platform: ['PC'],
    platforms: [
      <SiEpicgames key="epic" className="text-gray-200 w-5 h-5" />
    ],
    stats: { 'Rank': 'Diamond', 'Hours': '500+', 'Win Rate': '58%' },
    color: 'from-red-500/20 to-red-900/40',
    borderColor: 'border-red-500/30',
    buttonColor: 'bg-red-600 hover:bg-red-700',
    url: 'https://playvalorant.com/'
  },
  {
    id: 5,
    title: 'Apex Legends',
    description: 'A free-to-play battle royale game featuring a diverse cast of Legends, each with unique abilities that change the way you play.',
    image: 'https://images.unsplash.com/photo-1631477076119-9a6cdb68f55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    icon: <GiPistolGun className="text-orange-500 w-6 h-6" />,
    genre: 'Battle Royale / FPS',
    platform: ['PC', 'PS5', 'Xbox'],
    platforms: [
      <SiPlaystation key="ps" className="text-blue-500 w-5 h-5" />,
      <SiXbox key="xbox" className="text-green-500 w-5 h-5" />
    ],
    stats: { 'Rank': 'Platinum', 'Hours': '300+', 'Kills': '5000+' },
    color: 'from-orange-500/20 to-orange-900/40',
    borderColor: 'border-orange-500/30',
    buttonColor: 'bg-orange-600 hover:bg-orange-700',
    url: 'https://www.ea.com/games/apex-legends'
  },
  {
    id: 6,
    title: 'Minecraft',
    description: 'A sandbox game where players can build with a variety of different blocks in a 3D procedurally generated world.',
    image: 'https://images.unsplash.com/photo-1627855437693-dcc7b0c4ba7c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    icon: <SiMinecraft className="text-green-500 w-6 h-6" />,
    genre: 'Sandbox / Adventure',
    platform: ['PC', 'Mobile', 'Console'],
    platforms: [
      <SiNintendoswitch key="switch" className="text-red-500 w-5 h-5" />,
      <SiPlaystation key="ps" className="text-blue-500 w-5 h-5" />,
      <SiXbox key="xbox" className="text-green-500 w-5 h-5" />
    ],
    stats: { 'Hours': '1000+', 'Builds': '50+', 'Redstone': '10+' },
    color: 'from-green-500/20 to-green-900/40',
    borderColor: 'border-green-500/30',
    buttonColor: 'bg-green-600 hover:bg-green-700',
    url: 'https://www.minecraft.net/'
  }
];

// Animation variants
const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3
    }
  },
  exit: {
    opacity: 0,
    transition: {
      staggerChildren: 0.05,
      staggerDirection: -1
    }
  }
};

const item = {
  hidden: { 
    opacity: 0, 
    y: 20,
    scale: 0.98
  },
  show: { 
    opacity: 1, 
    y: 0,
    scale: 1,
    transition: {
      type: 'spring',
      stiffness: 120,
      damping: 12,
      mass: 0.5
    }
  },
  hover: {
    y: -5,
    transition: {
      duration: 0.2,
      ease: 'easeOut'
    }
  },
  tap: {
    scale: 0.98
  }
};

const fadeIn = {
  hidden: { opacity: 0 },
  show: { 
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: 'easeOut'
    }
  }
};

const slideUp = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1]
    }
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3
    }
  }
};

const Gaming: NextPage = () => {
  const [play, setPlay] = useState(true);
  const [activeTab, setActiveTab] = useState('all');
  const [expandedGame, setExpandedGame] = useState<number | null>(null);
  const player = useRef<HTMLAudioElement>(null);
  
  // Toggle audio playback
  const toggleAudio = () => {
    if (player.current) {
      if (play) {
        player.current.pause();
      } else {
        player.current.play();
      }
      setPlay(!play);
    }
  };

  const managePlayer = (shouldPlay: boolean) => {
    if (player.current) {
      shouldPlay ? player.current.play() : player.current.pause();
      setPlay(shouldPlay);
    }
  };

  useEffect(() => {
    if (player.current) {
      player.current.volume = 0.2; // Lower volume for background music
      player.current.play().catch(e => console.log("Autoplay prevented"));
    }
  }, []);

  // Add styles to head
  useEffect(() => {
    const styleElement = document.createElement('style');
    styleElement.textContent = styles;
    document.head.appendChild(styleElement);
    return () => {
      document.head.removeChild(styleElement);
    };
  }, []);

  return (
    <div className="gaming-page w-full p-0 m-0 relative">
      {/* Enhanced Animated Background */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        {/* Animated gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/30 via-blue-900/20 to-indigo-900/30 animate-gradient"></div>
        
        {/* Animated circuit board pattern */}
        <div className="absolute inset-0 opacity-20" style={{
          backgroundImage: `
            linear-gradient(90deg, rgba(99, 102, 241, 0.05) 1px, transparent 1px),
            linear-gradient(rgba(99, 102, 241, 0.05) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
          maskImage: 'radial-gradient(ellipse at center, black 20%, transparent 75%)'
        }}></div>
        
        {/* Floating gaming elements */}
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={`element-${i}`}
            className="absolute rounded-full"
            style={{
              width: Math.random() * 300 + 100,
              height: Math.random() * 300 + 100,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              background: `radial-gradient(circle, 
                rgba(${Math.random() > 0.5 ? '124, 58, 237' : '59, 130, 246'}, ${0.1 + Math.random() * 0.2}) 0%, 
                rgba(0, 0, 0, 0) 70%
              )`,
              filter: 'blur(40px)'
            }}
            animate={{
              x: [0, Math.random() * 200 - 100],
              y: [0, Math.random() * 200 - 100],
              scale: [1, 1 + Math.random() * 0.5],
              opacity: [0.3, 0.7, 0.3]
            }}
            transition={{
              duration: Math.random() * 20 + 20,
              repeat: Infinity,
              repeatType: 'reverse',
              ease: 'easeInOut'
            }}
          />
        ))}
        
        {/* Animated grid lines */}
        <motion.div 
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(90deg, rgba(99, 102, 241, 0.1) 1px, transparent 1px),
              linear-gradient(rgba(99, 102, 241, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px',
            opacity: 0.5
          }}
          animate={{
            backgroundPosition: ['0% 0%', '100% 100%']
          }}
          transition={{
            duration: 60,
            repeat: Infinity,
            ease: 'linear'
          }}
        />
      </div>
      
      <Head>
        <title>Gaming | Arman Khan</title>
        <meta name="description" content="Explore my gaming profile, favorite games, and connect with me for multiplayer sessions" />
        <link rel="icon" href="/favicon.ico" />
        <meta property="og:title" content="Gaming | Arman Khan" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.armankhan.com/gaming" />
        <meta property="og:image" content="/gaming-og.jpg" />
      </Head>
      
      {/* Enhanced Audio Player */}
      <motion.div 
        className="fixed bottom-6 right-6 z-50 flex flex-col items-end space-y-3"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <motion.button 
          className="p-3 rounded-full bg-gradient-to-br from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 transition-all duration-300 shadow-lg backdrop-blur-sm border border-purple-500/30"
          onClick={toggleAudio}
          whileHover={{ 
            scale: 1.1,
            boxShadow: '0 0 20px rgba(139, 92, 246, 0.7)'
          }}
          whileTap={{ scale: 0.95 }}
          aria-label={play ? 'Pause background music' : 'Play background music'}
        >
          {play ? (
            <FaVolumeUp className="w-6 h-6 text-white" />
          ) : (
            <FaVolumeMute className="w-6 h-6 text-white" />
          )}
        </motion.button>
        
        {/* Volume control */}
        <motion.div 
          className="p-2 rounded-full bg-gray-800/80 backdrop-blur-sm border border-gray-700/50"
          initial={{ opacity: 0, y: 10 }}
          whileHover={{ opacity: 1, y: 0 }}
        >
          <input 
            type="range" 
            min="0" 
            max="1" 
            step="0.01" 
            defaultValue="0.2"
            onChange={(e) => {
              if (player.current) {
                player.current.volume = parseFloat(e.target.value);
              }
            }}
            className="w-24 accent-purple-500"
          />
        </motion.div>
      </motion.div>
      <audio autoPlay loop ref={player}>
        <source src="/Bad_Parenting_Title_Song_Old_YazooBest_Part_Slowed_KLICKAUD.mp3" type="audio/mp3" />
        Your browser does not support the audio element.
      </audio>

      <div className="container mx-auto px-4 py-16 pt-24 relative z-10">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.h1 
            className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 inline-block"
            initial={{ opacity: 0, y: 20 }}
            animate={{ 
              opacity: 1, 
              y: 0,
              textShadow: '0 0 15px rgba(168, 85, 247, 0.5)'
            }}
            transition={{ 
              duration: 0.8,
              ease: "easeOut"
            }}
            whileHover={{
              scale: 1.02,
              textShadow: '0 0 25px rgba(168, 85, 247, 0.8)',
              transition: { duration: 0.3 }
            }}
          >
            Gaming Hub
          </motion.h1>
          <motion.p 
            className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
            variants={fadeIn}
          >
            From intense FPS battles to immersive RPG adventures, here's a showcase of my favorite games and gaming achievements.
            Let's connect and play together!
          </motion.p>
        </motion.div>

        {/* Stats */}
        <motion.div 
          className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-6xl mx-auto mb-16 px-4"
          variants={staggerContainer}
          initial="hidden"
          animate="show"
        >
          {[
            { 
              icon: <FaGamepad className="text-4xl text-purple-400" />, 
              title: 'Games Played', 
              value: '50+',
              delay: 0.2
            },
            { 
              icon: <FaTrophy className="text-4xl text-yellow-400" />, 
              title: 'Achievements', 
              value: '200+',
              delay: 0.4
            },
            { 
              icon: <FaUsers className="text-4xl text-blue-400" />, 
              title: 'Multiplayer', 
              value: 'Active',
              delay: 0.6
            },
            { 
              icon: <FaHeadset className="text-4xl text-green-400" />, 
              title: 'Voice Chat', 
              value: 'Available',
              delay: 0.8
            }
          ].map((stat, index) => (
            <motion.div 
              key={index}
              className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 text-center border border-gray-700/50 hover:border-purple-500/30 transition-all duration-300"
              variants={item}
              initial="hidden"
              animate="show"
              whileHover={{ y: -5, boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)' }}
            >
              <div className="inline-flex items-center justify-center w-16 h-16 mb-4 mx-auto rounded-full bg-gradient-to-br from-purple-600/20 to-blue-600/20">
                {stat.icon}
              </div>
              <h3 className="text-3xl font-bold text-white mb-2">{stat.value}</h3>
              <p className="text-gray-400">{stat.title}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Games Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto px-4"
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
                  <span className="text-sm text-gray-400">{game.platform.join(' • ')}</span>
                  <div className="flex space-x-2">
                    {game.platforms.map((platform, i) => (
                      <span key={i} className="text-gray-400 hover:text-white transition-colors">
                        {platform}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="mt-4 grid grid-cols-3 gap-2 text-center">
                  {Object.entries(game.stats).map(([key, value]) => (
                    <div key={key} className="bg-gray-800/50 rounded-lg p-2">
                      <div className="text-xs text-gray-400">{key}</div>
                      <div className="font-bold text-white">{value}</div>
                    </div>
                  ))}
                </div>
                
                <a 
                  href={game.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex items-center justify-center w-full py-2 px-4 rounded-lg bg-gradient-to-r from-purple-600 to-blue-600 text-white font-medium hover:from-purple-700 hover:to-blue-700 transition-all duration-300 group"
                >
                  <span>View Game</span>
                  <FaExternalLinkAlt className="ml-2 w-3 h-3 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </motion.div>
          ))}
        </motion.div>
        
        {/* CTA Section */}
        <motion.section 
          className="mt-24 bg-gradient-to-r from-purple-900/30 to-blue-900/30 rounded-2xl p-8 md:p-12 text-center backdrop-blur-sm border border-purple-800/30"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="max-w-2xl mx-auto">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full mb-6 shadow-lg">
              <FaGamepad className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Let's Play Together!</h2>
            <p className="text-gray-300 mb-8">
              Interested in teaming up for some gaming sessions? Add me on your preferred platform and let's play together!
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a 
                href="https://discord.com/users/yourusername" 
                target="_blank" 
                rel="noopener noreferrer"
                className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition-all duration-300 flex items-center gap-2"
              >
                <FaDiscord className="w-5 h-5" />
                Discord
              </a>
              <a 
                href="https://steamcommunity.com/id/yourprofile" 
                target="_blank" 
                rel="noopener noreferrer"
                className="px-6 py-3 bg-gray-800 hover:bg-gray-700 text-white font-medium rounded-lg transition-all duration-300 flex items-center gap-2"
              >
                <FaGamepad className="w-5 h-5" />
                Steam
              </a>
            </div>
          </div>
        </motion.section>
      </div>
    </div>
  );
};

export default Gaming;
