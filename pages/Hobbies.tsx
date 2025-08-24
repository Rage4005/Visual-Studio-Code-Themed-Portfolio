import { NextPage } from "next";
import Head from "next/head";
import { motion } from 'framer-motion';
import { FaGamepad, FaBook, FaArrowRight } from 'react-icons/fa';
import { FaShapes } from 'react-icons/fa6';
import Link from 'next/link';

interface HobbyCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  link: string;
}

const HobbyCard: React.FC<HobbyCardProps> = ({ 
  title, 
  description, 
  icon, 
  color,
  link
}) => (
  <Link href={link}>
    <motion.div
      className={`relative group bg-gradient-to-br ${color} p-6 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 h-full flex flex-col`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: 'spring', stiffness: 100 }}
    >
      <div className="text-5xl mb-6 transform group-hover:scale-110 transition-transform duration-300">
        {icon}
      </div>
      <h3 className="text-2xl font-bold text-white mb-3">{title}</h3>
      <p className="text-gray-100 mb-4 flex-grow">{description}</p>
      <div className="flex items-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <span className="mr-2">Explore more</span>
        <FaArrowRight className="transform group-hover:translate-x-1 transition-transform duration-300" />
      </div>
    </motion.div>
  </Link>
);

const hobbies = [
  {
    title: "Gaming",
    description: "Explore my gaming journey, favorite titles, and gaming setup.",
    icon: <FaGamepad />,
    color: "from-purple-500 to-indigo-600",
    link: "/Gaming"
  },
  {
    title: "Anime",
    description: "Discover my favorite anime series, characters, and recommendations.",
    icon: <FaShapes />,
    color: "from-red-500 to-pink-500",
    link: "/Anime"
  },
  {
    title: "Blog",
    description: "Read my thoughts, experiences, and insights on various topics.",
    icon: <FaBook />,
    color: "from-blue-500 to-cyan-500",
    link: "/Blogs"
  }
];

const Hobbies: NextPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white">
      <Head>
        <title>My Hobbies</title>
        <meta name="description" content="Explore my hobbies and interests" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container mx-auto px-4 py-12 md:py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-500 mb-4">
            My Hobbies
          </h1>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {hobbies.map((hobby, index) => (
            <motion.div
              key={hobby.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
            >
              <HobbyCard
                title={hobby.title}
                description={hobby.description}
                icon={hobby.icon}
                color={hobby.color}
                link={hobby.link}
              />
            </motion.div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Hobbies;
