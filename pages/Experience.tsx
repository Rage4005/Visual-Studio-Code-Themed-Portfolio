import { useState } from 'react';
import { NextPage } from 'next';
import Head from 'next/head';
import { motion, AnimatePresence } from 'framer-motion';
import { FiChevronDown, FiExternalLink, FiCode, FiLayers, FiUsers, FiTrendingUp } from 'react-icons/fi';
import { useRouter } from 'next/router';
import Image from 'next/image';

type Experience = {
  id: number;
  role: string;
  company: string;
  companyLogo: string;
  companyUrl: string;
  location: string;
  startDate: string;
  endDate: string;
  description: string[];
  skills: string[];
  isCurrent: boolean;
  achievements: {
    title: string;
    description: string;
    icon: React.ReactNode;
  }[];
};

const experiences: Experience[] = [
  {
    id: 1,
    role: "Software Development Engineer I",
    company: "Your Company",
    companyLogo: "/velotio.jpg",
    companyUrl: "#",
    location: "Remote",
    startDate: "Aug 2021",
    endDate: "Present",
    isCurrent: true,
    description: [
      "Led the development of a scalable microservices architecture, improving system performance by 40%.",
      "Mentored 3 junior developers, conducting code reviews and pair programming sessions.",
      "Implemented CI/CD pipelines reducing deployment time by 65%.",
      "Optimized frontend performance, decreasing load times by 30%."
    ],
    skills: ["TypeScript", "React", "Node.js", "AWS", "Docker", "GraphQL", "Jest"],
    achievements: [
      {
        title: "Performance Optimization",
        description: "Improved application load time by 40% through code splitting and lazy loading.",
        icon: <FiTrendingUp className="w-5 h-5 text-blue-400" />
      },
      {
        title: "Team Leadership",
        description: "Led a team of 4 developers to deliver a critical feature 2 weeks ahead of schedule.",
        icon: <FiUsers className="w-5 h-5 text-green-400" />
      }
    ]
  },
  {
    id: 2,
    role: "Frontend Developer",
    company: "Your Company 2",
    companyLogo: "/hha.png",
    companyUrl: "#",
    location: "Remote",
    startDate: "Dec 2020",
    endDate: "Aug 2021",
    isCurrent: false,
    description: [
      "Developed responsive web applications using React and TypeScript.",
      "Collaborated with UX designers to implement pixel-perfect UIs.",
      "Reduced bundle size by 25% through code splitting and optimization.",
      "Implemented comprehensive unit tests with 90%+ coverage."
    ],
    skills: ["JavaScript", "React", "Redux", "Styled Components", "Jest", "Webpack"],
    achievements: [
      {
        title: "UI Revamp",
        description: "Redesigned the dashboard interface, improving user engagement by 35%.",
        icon: <FiLayers className="w-5 h-5 text-purple-400" />
      },
      {
        title: "Test Coverage",
        description: "Increased test coverage from 60% to 90% across the codebase.",
        icon: <FiCode className="w-5 h-5 text-yellow-400" />
      }
    ]
  }
];

const Experience: NextPage = () => {
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const toggleExpand = (id: number) => {
    setExpandedId(expandedId === id ? null : id);
  };

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
        duration: 0.5
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#1e1e1e] text-gray-100">
      <Head>
        <title>Experience | Arman Khan</title>
        <meta name="description" content="Professional experience and work history of Arman Khan" />
        <link rel="icon" href="/favicon.ico" />
        <meta property="og:title" content="Experience | Arman Khan" />
        <meta name="description" content="Professional experience and work history of Arman Khan" />
        <meta property="og:locale" content="en_US" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.armankhan.com/experience" />
        <meta property="og:site_name" content="Arman Khan" />
        <meta property="og:image" content="/mainthumbnail.PNG" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="relative max-w-4xl mx-auto px-4 group">
            {/* Animated background grid */}
            <div className="absolute inset-0 overflow-hidden opacity-5 pointer-events-none">
              <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgdmlld0JveD0iMCAwIDQwIDQwIiBmaWxsPSJub25lIiBzdHJva2U9IiMzMDNmNDciIHN0cm9rZS13aWR0aD0iMC41Ij48cGF0aCBkPSJNIDAgMCBMIDAgNDAgTSA0MCAwIEwgNDAgNDAgTSAwIDAgTCA0MCAwIE0gMCA0MCBMIDQwIDQwIE0gMjAgMCBMIDIwIDQwIE0gMCAyMCBMIDQwIDIwIi8+PC9zdmc+')]" />
            </div>

            {/* Animated cursor */}
            <motion.div 
              className="absolute -left-4 top-0 w-0.5 bg-blue-400"
              initial={{ opacity: 0, height: 0 }}
              animate={{ 
                opacity: [0, 1, 0],
                height: ['0%', '100%', '0%'],
              }}
              transition={{ 
                duration: 1.5, 
                repeat: Infinity,
                repeatDelay: 0.5,
                ease: 'easeInOut'
              }}
            />

            <div className="relative z-10">
              <motion.div 
                className="inline-block mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <div className="relative">
                  <motion.h1 
                    className="text-5xl md:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-cyan-200 group-hover:from-cyan-200 group-hover:to-blue-200 transition-all duration-500 drop-shadow-[0_0_8px_rgba(147,197,253,0.3)]"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                  >
                    <span className="relative z-10 text-white/90">
                      Experience
                    </span>
                    <motion.span
                      className="absolute -left-8 top-0 bottom-0 w-1 bg-blue-400 rounded-full"
                      initial={{ scaleY: 0 }}
                      animate={{ scaleY: 1 }}
                      transition={{ delay: 0.8, duration: 0.8 }}
                    />
                  </motion.h1>
                  <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-blue-500/30 to-cyan-500/30 rounded-full" />
                </div>
                <motion.div 
                  className="mt-6 relative"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  <p className="text-lg md:text-xl text-gray-300 font-medium">
                    <span className="text-blue-400 font-mono">//</span> My professional journey in code
                  </p>
                  <div className="absolute -left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500/30 to-transparent" />
                </motion.div>
              </motion.div>

              {/* Animated divider */}
              <motion.div 
                className="h-[2px] bg-gradient-to-r from-transparent via-blue-500/40 to-transparent my-12"
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: '100%', opacity: 1 }}
                transition={{ delay: 0.8, duration: 1.2, ease: 'easeOut' }}
              />

              {/* Interactive elements */}
              <motion.div 
                className="flex flex-wrap gap-4 mt-12"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 }}
              >
                {[
                  { name: 'Work History', path: '/#experience' },
                  { name: 'Skills', path: '/Skills' },
                  { name: 'Projects', path: '/Projects' },  // Updated to match the exact directory name case
                  { name: 'Education', path: '/education' }
                ].map((item, i) => {
                  const router = useRouter();
                  return (
                    <motion.div
                      key={i}
                      onClick={() => router.push(item.path)}
                      className="px-4 py-2 rounded-md bg-gray-800/50 border border-gray-700/50 text-sm font-mono cursor-pointer hover:bg-blue-500/10 hover:border-blue-500/30 transition-all duration-300 group/item"
                      whileHover={{ 
                        y: -2,
                        boxShadow: '0 10px 15px -3px rgba(59, 130, 246, 0.1)'
                      }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <span className="text-blue-400 group-hover/item:text-cyan-300 transition-colors">$</span>{' '}
                      <span className="text-gray-300 group-hover/item:text-white">{item.name}</span>
                      <span className="ml-2 text-blue-400 opacity-0 group-hover/item:opacity-100 transition-opacity">→</span>
                    </motion.div>
                  );
                })}
              </motion.div>
            </div>

            {/* Animated background elements */}
            <motion.div 
              className="absolute -right-10 -bottom-10 w-40 h-40 rounded-full bg-blue-500/5 blur-xl"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.1, 0.2, 0.1],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                repeatType: 'reverse',
                ease: 'easeInOut',
              }}
            />
          </div>
        </motion.div>

        <motion.div 
          className="space-y-6 max-w-4xl mx-auto"
          variants={container}
          initial="hidden"
          animate="show"
        >
          {experiences.map((exp) => (
            <motion.div 
              key={exp.id}
              className="bg-[#252526] rounded-lg overflow-hidden border border-gray-700/50 transition-all duration-300 hover:border-blue-500/50"
              variants={item}
            >
              <button 
                className="w-full text-left p-6 focus:outline-none"
                onClick={() => toggleExpand(exp.id)}
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 rounded-md bg-gray-800 flex items-center justify-center overflow-hidden">
                        <Image 
                          src={exp.companyLogo} 
                          alt={exp.company}
                          width={40}
                          height={40}
                          className="object-contain w-8 h-8"
                        />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white">{exp.role}</h3>
                      <div className="flex items-center mt-1">
                        <a 
                          href={exp.companyUrl} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-blue-400 hover:text-blue-300 flex items-center text-sm"
                          onClick={(e) => e.stopPropagation()}
                        >
                          {exp.company}
                          <FiExternalLink className="ml-1 w-3 h-3" />
                        </a>
                        <span className="mx-2 text-gray-600">•</span>
                        <span className="text-sm text-gray-400">{exp.location}</span>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 md:mt-0 flex items-center justify-between">
                    <span className="text-sm bg-blue-900/30 text-blue-400 px-3 py-1 rounded-full">
                      {exp.startDate} - {exp.endDate}
                    </span>
                    <motion.span
                      animate={{ rotate: expandedId === exp.id ? 180 : 0 }}
                      className="ml-4 text-gray-400"
                    >
                      <FiChevronDown className="w-5 h-5" />
                    </motion.span>
                  </div>
                </div>
              </button>

              <AnimatePresence>
                {expandedId === exp.id && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="px-6 pb-6 pt-0 border-t border-gray-800"
                  >
                    <div className="grid md:grid-cols-3 gap-6 mt-4">
                      <div className="md:col-span-2">
                        <h4 className="text-sm font-medium text-gray-300 mb-3">KEY RESPONSIBILITIES</h4>
                        <ul className="space-y-3">
                          {exp.description.map((item, i) => (
                            <li key={i} className="flex items-start">
                              <span className="text-blue-400 mr-2 mt-1">▹</span>
                              <span className="text-gray-300">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div>
                        <h4 className="text-sm font-medium text-gray-300 mb-3">KEY ACHIEVEMENTS</h4>
                        <div className="space-y-4">
                          {exp.achievements.map((achievement, i) => (
                            <div key={i} className="bg-gray-800/50 p-4 rounded-lg">
                              <div className="flex items-start space-x-3">
                                <div className="flex-shrink-0 mt-0.5">
                                  {achievement.icon}
                                </div>
                                <div>
                                  <h5 className="text-blue-400 font-medium">{achievement.title}</h5>
                                  <p className="text-sm text-gray-400 mt-1">{achievement.description}</p>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 pt-6 border-t border-gray-800">
                      <h4 className="text-sm font-medium text-gray-300 mb-3">TECH STACK</h4>
                      <div className="flex flex-wrap gap-2">
                        {exp.skills.map((skill, i) => (
                          <span 
                            key={i}
                            className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-800 text-blue-300"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default Experience;
