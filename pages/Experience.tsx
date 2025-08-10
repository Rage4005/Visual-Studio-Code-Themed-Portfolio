import { NextPage } from "next";
import Head from "next/head";
import { motion } from "framer-motion";
import { FiBriefcase, FiCalendar, FiMapPin, FiExternalLink } from "react-icons/fi";
import Image from "next/image";

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
      "Developed and maintained web applications using modern JavaScript frameworks and libraries.",
      "Collaborated with cross-functional teams to design and implement new features.",
      "Optimized application performance and improved user experience.",
      "Mentored junior developers and conducted code reviews."
    ],
    skills: ["JavaScript", "TypeScript", "React", "Node.js", "Next.js", "Tailwind CSS", "Redux"]
  },
  {
    id: 2,
    role: "Software Development Engineer I",
    company: "Your Company 2",
    companyLogo: "/hha.png",
    companyUrl: "#",
    location: "Remote",
    startDate: "Dec 2020",
    endDate: "Aug 2021",
    isCurrent: false,
    description: [
      "Built responsive web interfaces using React and modern CSS frameworks.",
      "Implemented RESTful APIs and integrated with various third-party services.",
      "Participated in agile development processes and sprint planning.",
      "Wrote unit and integration tests to ensure code quality."
    ],
    skills: ["JavaScript", "React", "Node.js", "Express", "MongoDB", "Jest", "HTML5", "CSS3"]
  }
];

const Experience: NextPage = () => {
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
        duration: 0.5
      }
    }
  };

  return (
    <div className="min-h-screen text-gray-100">
      <Head>
        <title>Experience | Arman Khan</title>
        <meta name="description" content="Professional experience and work history of Arman Khan" />
        <link rel="icon" href="/favicon.ico" />
        <meta property="og:title" content="Experience | Arman Khan" />
        <meta name="description" content="Professional experience and work history of Arman Khan" />
        <link rel="canonical" href="https://www.armankhan.com/experience" />
        <meta property="og:locale" content="en_US" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.armankhan.com/experience" />
        <meta property="og:site_name" content="Arman Khan" />
        <meta property="og:image" content="/mainthumbnail.PNG" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="HandheldFriendly" content="True" />
        <meta name="MobileOptimized" content="320" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>

      <div className="w-full bg-gray-900 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        {/* Hero Section */}
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-600 mb-4">
            Professional Experience
          </h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">
            A timeline of my professional journey and key contributions in the tech industry
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-indigo-500 to-purple-600 mx-auto mt-6 rounded-full"></div>
        </motion.div>

        {/* Experience Timeline */}
        <motion.div 
          className="space-y-8 w-full"
          variants={container}
          initial="hidden"
          animate="show"
        >
          {experiences.map((exp, index) => (
            <motion.div 
              key={exp.id}
              className="relative w-full"
              variants={item}
            >
              {/* Date - Mobile */}
              <div className="md:hidden mb-4 w-full text-left">
                <div className="inline-flex items-center px-4 py-1 rounded-full text-sm font-medium bg-indigo-900/50 text-indigo-300">
                  <FiCalendar className="mr-2" />
                  {exp.startDate} - {exp.endDate}
                </div>
              </div>
              
              {/* Experience Card */}
              <motion.div 
                className="w-full bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50 hover:border-indigo-500/30 transition-all duration-300 hover:shadow-lg hover:shadow-indigo-500/10"
                whileHover={{ y: -5 }}
              >
                <div className="flex flex-col md:flex-row md:items-start md:justify-between">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-white">{exp.role}</h3>
                    <div className="flex items-center mt-1">
                      <a 
                        href={exp.companyUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-indigo-400 hover:text-indigo-300 flex items-center"
                      >
                        {exp.company}
                        <FiExternalLink className="ml-1 w-4 h-4" />
                      </a>
                    </div>
                    
                    <div className="mt-4 flex items-center text-sm text-gray-400">
                      <FiMapPin className="mr-1.5 flex-shrink-0" />
                      <span>{exp.location}</span>
                      <span className="mx-2">•</span>
                      <FiCalendar className="mr-1.5 flex-shrink-0" />
                      <span>{exp.startDate} - {exp.endDate}</span>
                    </div>
                    
                    <ul className="mt-4 space-y-2">
                      {exp.description.map((item, i) => (
                        <li key={i} className="flex items-start">
                          <span className="text-indigo-400 mr-2">•</span>
                          <span className="text-gray-300">{item}</span>
                        </li>
                      ))}
                    </ul>
                    
                    <div className="mt-4 pt-4 border-t border-gray-700/50">
                      <div className="flex flex-wrap gap-2">
                        {exp.skills.map((skill, i) => (
                          <span 
                            key={i}
                            className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-indigo-900/30 text-indigo-300"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-4 md:mt-0 md:ml-8 flex-shrink-0">
                    <div className="w-16 h-16 rounded-lg bg-gray-900/50 flex items-center justify-center overflow-hidden">
                      <Image 
                        src={exp.companyLogo} 
                        alt={exp.company}
                        width={48}
                        height={48}
                        className="object-cover w-12 h-12"
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Experience;
