import { NextPage } from "next";
import Head from "next/head";
import { motion } from "framer-motion";
import { useState } from "react";
import { FiCode, FiDatabase, FiServer, FiCpu, FiLayers } from "react-icons/fi";

type Skill = {
  name: string;
  level: number;
  icon: string;
  category: 'frontend' | 'backend' | 'database' | 'devops' | 'other';
};

const skills: Skill[] = [
  // Frontend
  { name: 'JavaScript', level: 90, icon: 'https://img.icons8.com/color/144/000000/javascript--v1.png', category: 'frontend' },
  { name: 'TypeScript', level: 85, icon: 'https://img.icons8.com/color/96/000000/typescript.png', category: 'frontend' },
  { name: 'React', level: 88, icon: 'https://img.icons8.com/color/144/000000/react-native.png', category: 'frontend' },
  { name: 'Next.js', level: 85, icon: 'https://i.ibb.co/Kj1TqRv/image.png', category: 'frontend' },
  { name: 'Tailwind CSS', level: 90, icon: 'https://img.icons8.com/color/144/000000/tailwindcss.png', category: 'frontend' },
  
  // Backend
  { name: 'Node.js', level: 85, icon: 'https://img.icons8.com/fluency/144/000000/node-js.png', category: 'backend' },
  { name: 'Python', level: 80, icon: 'https://img.icons8.com/color/48/null/python--v1.png', category: 'backend' },
  { name: 'Express', level: 82, icon: 'https://img.icons8.com/fluency/48/000000/node-js.png', category: 'backend' },
  
  // Database
  { name: 'PostgreSQL', level: 80, icon: 'https://img.icons8.com/color/48/null/postgreesql.png', category: 'database' },
  { name: 'MongoDB', level: 75, icon: 'https://img.icons8.com/color/48/000000/mongodb.png', category: 'database' },
  { name: 'Redis', level: 70, icon: 'https://img.icons8.com/color/48/null/redis.png', category: 'database' },
  
  // DevOps & Tools
  { name: 'Docker', level: 75, icon: 'https://img.icons8.com/color/48/000000/docker.png', category: 'devops' },
  { name: 'AWS', level: 70, icon: 'https://img.icons8.com/color/48/000000/amazon-web-services.png', category: 'devops' },
  { name: 'Git', level: 85, icon: 'https://img.icons8.com/color/48/000000/git.png', category: 'devops' },
  
  // Other
  { name: 'Data Structures', level: 90, icon: 'https://img.icons8.com/color/48/000000/data-structure.png', category: 'other' },
  { name: 'Algorithms', level: 85, icon: 'https://img.icons8.com/color/48/000000/algorithm.png', category: 'other' },
];

const categoryIcons = {
  frontend: <FiCode className="w-5 h-5" />,
  backend: <FiServer className="w-5 h-5" />,
  database: <FiDatabase className="w-5 h-5" />,
  devops: <FiCpu className="w-5 h-5" />,
  other: <FiLayers className="w-5 h-5" />
};

// Helper function to get proficiency text
function getProficiencyText(level: number): string {
  if (level >= 86) return 'Expert';
  if (level >= 66) return 'Proficient';
  if (level >= 41) return 'Competent';
  return 'Novice';
}

const Skills: NextPage = () => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  const filteredSkills = activeCategory === 'all' 
    ? skills 
    : skills.filter(skill => skill.category === activeCategory);

  const categories = [
    { id: 'all', name: 'All Skills', icon: <FiLayers className="w-5 h-5" /> },
    { id: 'frontend', name: 'Frontend', icon: <FiCode className="w-5 h-5" /> },
    { id: 'backend', name: 'Backend', icon: <FiServer className="w-5 h-5" /> },
    { id: 'database', name: 'Database', icon: <FiDatabase className="w-5 h-5" /> },
    { id: 'devops', name: 'DevOps', icon: <FiCpu className="w-5 h-5" /> },
    { id: 'other', name: 'Other', icon: <FiLayers className="w-5 h-5" /> },
  ];

  return (
    <div className="w-full h-full overflow-y-auto bg-gray-900 text-gray-100">
      <Head>
        <title>Skills | Arman Khan</title>
        <meta name="description" content="Technical skills and expertise of Arman Khan" />
        <link rel="icon" href="/favicon.ico" />
        <meta property="og:title" content="Skills | Arman Khan" />
        <meta name="description" content="Technical skills and expertise of Arman Khan" />
        <link rel="canonical" href="https://www.armankhan.com/skills" />
        <meta property="og:locale" content="en_US" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.armankhan.com/skills" />
        <meta property="og:site_name" content="Arman Khan" />
        <meta property="og:image" content="/mainthumbnail.PNG" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="HandheldFriendly" content="True" />
        <meta name="MobileOptimized" content="320" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>

      <div className="w-full px-4 py-8 mx-auto max-w-7xl">
        {/* Hero Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-600 mb-4">
            My Skills
          </h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">
            A collection of my technical skills and expertise across various domains of software development.
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-indigo-500 to-purple-600 mx-auto mt-6 rounded-full"></div>
        </motion.div>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`flex items-center px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                activeCategory === category.id
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/20'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              <span className="mr-2">{category.icon}</span>
              {category.name}
            </button>
          ))}
        </div>

        {/* Skills Grid */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, staggerChildren: 0.1 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          {filteredSkills.map((skill, index) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className="relative group bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 transition-all duration-300 hover:shadow-lg hover:shadow-indigo-500/10 hover:border-indigo-500/30 border border-gray-700/50"
              onMouseEnter={() => setHoveredSkill(skill.name)}
              onMouseLeave={() => setHoveredSkill(null)}
            >
              <div className="flex items-center space-x-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-gray-900/50 flex items-center justify-center p-2">
                  <img 
                    src={skill.icon} 
                    alt={skill.name} 
                    className="w-8 h-8 object-contain"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.onerror = null;
                      target.src = 'https://img.icons8.com/color/48/000000/code--v1.png';
                    }}
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-semibold text-white">{skill.name}</h3>
                  <div className="mt-2 w-full bg-gray-700 rounded-full h-2">
                    <motion.div 
                      className="h-full bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${skill.level}%` }}
                      transition={{ duration: 1, delay: 0.5 + (index * 0.05) }}
                    />
                  </div>
                  <div className="mt-2 text-right">
                    <span className="text-sm font-medium text-indigo-400">{skill.level}%</span>
                  </div>
                </div>
              </div>
              
              {hoveredSkill === skill.name && (
                <motion.div 
                  className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 translate-y-full bg-gray-900 text-white text-xs rounded px-2 py-1 whitespace-nowrap z-10"
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  {skill.name} - {getProficiencyText(skill.level)}
                </motion.div>
              )}
            </motion.div>
          ))}
        </motion.div>

        {/* Legend */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <h3 className="text-lg font-medium text-gray-300 mb-4">Proficiency Levels</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-indigo-500 mr-2"></div>
              <span className="text-sm text-gray-400">Novice (0-40%)</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-indigo-500 mr-2"></div>
              <span className="text-sm text-gray-400">Competent (41-65%)</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-indigo-500 mr-2"></div>
              <span className="text-sm text-gray-400">Proficient (66-85%)</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-indigo-500 mr-2"></div>
              <span className="text-sm text-gray-400">Expert (86-100%)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Skills;
