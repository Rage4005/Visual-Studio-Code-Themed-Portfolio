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
    background: linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%);
    color: #fff;
    scroll-behavior: smooth;
    overflow-x: hidden;
    padding: 2rem 0;
  }
  
  .gaming-page .games-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(500px, 1fr));
    gap: 2rem;
    padding: 0 2rem;
    max-width: 1200px;
    margin: 0 auto;
  }
  
  .gaming-page .game-card {
    transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    border: none;
    background: rgba(255, 255, 255, 0.05);
    backdrop-filter: blur(12px);
    border-radius: 16px;
    overflow: hidden;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.1);
  }
  
  .gaming-page .game-card:hover {
    transform: translateY(-8px) scale(1.015);
    box-shadow: 0 15px 35px rgba(0, 0, 0, 0.2);
    background: rgba(255, 255, 255, 0.08);
    border-color: rgba(255, 255, 255, 0.15);
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
    <div className="gaming-page w-full relative">
      {/* Enhanced Animated Background */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        {/* Subtle gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/40 via-purple-900/30 to-indigo-900/40"></div>
        
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: `
            linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px),
            linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
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
      <Head>
        <title>Gaming Hub</title>
        <meta name="description" content="Check out the games I play" />
      </Head>

      <main className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 text-gray-900">
            Gaming Hub
          </h1>
          <p className="text-gray-600">
            Check out the games I play
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {games.map((game) => (
            <div
              key={game.id}
              className="bg-white rounded-xl overflow-hidden shadow-lg border border-gray-200 hover:shadow-xl transition-shadow duration-300"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={game.image}
                  alt={game.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="px-3 py-1 bg-purple-100 text-purple-800 text-xs font-semibold rounded-full">
                    {game.genre}
                  </span>
                  <div className="flex space-x-2">
                    {game.platforms.map((platform) => (
                      <span key={`${game.id}-${platform}`} className="text-gray-500">
                        {getPlatformIcon(platform)}
                      </span>
                    ))}
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{game.title}</h3>
                <p className="text-gray-600 text-sm mb-4">{game.description}</p>
                <a
                  href={game.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-4 py-2 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 transition-colors text-sm"
                >
                  <FaPlay className="mr-2 text-xs" /> Play Now
                </a>
              </div>
            </div>
          ))}
        </div>
      </main>
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
