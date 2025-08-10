import { NextPage } from "next";
import { Scrollbars } from "react-custom-scrollbars";
import Image from "next/legacy/image";
import Link from "next/link";
import { useMediaQuery } from "react-responsive";
import { projectsdata } from "../../Components/JSON/projectsdata";
import Head from "next/head";
import { motion, AnimatePresence } from "framer-motion";
import { FiGithub, FiExternalLink, FiChevronDown } from "react-icons/fi";
import { useState } from "react";

const Projects: NextPage = (props: any) => {
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 943px)" });
  const [activeProject, setActiveProject] = useState<number | null>(null);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1
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
        damping: 15
      }
    }
  };

  return (
    <Scrollbars
      autoHide
      autoHideTimeout={1000}
      autoHideDuration={200}
      universal={true}
    >
      <Head>
        <title>Projects</title>
        <meta
          name="description"
          content={`Visual Studio Code style Developer Portfolio.`}
        />
        <link rel="icon" href="/favicon.ico" />
        <meta property="og:title" content={"Projects - College | Side"} />
        <meta
          name="description"
          content={`Visual Studio Code style Developer Portfolio.`}
        />
        <link rel="canonical" href={"https://www.armankhan.com"} />
        <meta property="og:locale" content="en_US" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={"https://www.armankhan.com"} />
        <meta property="og:site_name" content="Arman Khan" />
        <meta property="og:image" content="/mainthumbnail.PNG" />
        <meta property="og:image:width" content="1040" />
        <meta property="og:image:height" content="600" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="HandheldFriendly" content="True" />
        <meta name="MobileOptimized" content="320" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="twitter:widgets:csp" content="on" />
      </Head>
      <div className="w-full min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 p-6 text-left">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12 overflow-hidden">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{
                opacity: 1,
                x: 0,
                transition: {
                  duration: 0.6,
                  ease: "easeOut"
                }
              }}
            >
              <h1 className="text-4xl md:text-5xl font-bold text-white relative inline-block">
                <motion.span
                  className="relative z-10"
                >
                  Projects
                </motion.span>
                <motion.span
                  className="absolute bottom-0 left-0 h-1 bg-indigo-500"
                  initial={{ width: 0 }}
                  animate={{
                    width: '100%',
                    transition: {
                      delay: 0.3,
                      duration: 0.8,
                      ease: [0.22, 1, 0.36, 1]
                    }
                  }}
                />
              </h1>
            </motion.div>
            
            <motion.div 
              initial={{ width: 0 }}
              animate={{ 
                width: '100px',
                transition: { 
                  delay: 0.8,
                  duration: 0.8,
                  ease: 'easeOut'
                }
              }}
              className="h-1 bg-gradient-to-r from-indigo-500 to-pink-500 rounded-full my-3"
            />
            
            <motion.p 
              initial={{ opacity: 0, x: -20 }}
              animate={{ 
                opacity: 1, 
                x: 0,
                transition: { 
                  delay: 1,
                  duration: 0.5
                }
              }}
              className="text-gray-300 mt-3 text-lg max-w-2xl"
            >
              A collection of my work and creations, each built with passion and attention to detail.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {props?.projects?.map((project: any, index: number) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="group"
              >
                <Link href={`/Projects/${index + 1}`}>
                  <div className="h-full bg-gray-800/50 backdrop-blur-sm rounded-xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-700/50 hover:border-indigo-500/30">
                    {/* Project Image */}
                    <div className="relative h-48 overflow-hidden">
                      <Image
                        src={index === 0 ? "/ARSENAL.png" : project.banner}
                        alt={`${project.name} - ${project.title}`}
                        layout="fill"
                        objectFit="cover"
                        className="transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                        <div className="flex space-x-3">
                          {project.github && (
                            <a 
                              href={project.github} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              onClick={(e) => e.stopPropagation()}
                              className="p-2 bg-gray-800/80 rounded-full hover:bg-indigo-600 transition-colors"
                            >
                              <FiGithub className="text-white" />
                            </a>
                          )}
                          {project.link && (
                            <a 
                              href={project.link} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              onClick={(e) => e.stopPropagation()}
                              className="p-2 bg-gray-800/80 rounded-full hover:bg-indigo-600 transition-colors"
                            >
                              <FiExternalLink className="text-white" />
                            </a>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Project Info */}
                    <motion.div 
                      className="p-6"
                      variants={item}
                      key={index}
                    >
                      <div className="flex items-start space-x-4 mb-3">
                        <motion.div 
                          className="h-12 w-12 rounded-lg bg-gray-700/50 p-1.5 flex-shrink-0"
                          whileHover={{
                            rotate: 5,
                            scale: 1.05,
                            transition: { 
                              type: 'spring',
                              stiffness: 300,
                              damping: 10
                            }
                          }}
                        >
                          <Image
                            src={project.logo}
                            alt={`${project.name} logo`}
                            width={40}
                            height={40}
                            className="rounded-md object-contain"
                          />
                        </motion.div>
                        <div className="flex-1 min-w-0">
                          <div 
                            className="relative cursor-pointer group"
                            onClick={() => setActiveProject(activeProject === index ? null : index)}
                          >
                            <div className="flex items-center justify-between">
                              <motion.h3 
                                className="text-xl font-bold text-white relative z-10 flex items-center"
                                whileHover={{ color: '#a5b4fc' }}
                              >
                                {project.name}
                                <motion.span 
                                  className="ml-2"
                                  animate={{
                                    rotate: activeProject === index ? 180 : 0,
                                    transition: { duration: 0.3 }
                                  }}
                                >
                                  <FiChevronDown className="h-5 w-5 text-indigo-400" />
                                </motion.span>
                              </motion.h3>
                            </div>
                            <motion.p 
                              className="text-indigo-400 text-sm mt-1"
                              initial={{ opacity: 0.9 }}
                              whileHover={{ opacity: 1 }}
                            >
                              {project.title}
                            </motion.p>
                            <AnimatePresence>
                              {activeProject === index && (
                                <motion.div
                                  className="mt-3 pt-3 border-t border-gray-700/50"
                                  initial={{ opacity: 0, height: 0 }}
                                  animate={{ 
                                    opacity: 1,
                                    height: 'auto',
                                    transition: {
                                      opacity: { duration: 0.2 },
                                      height: { 
                                        duration: 0.3,
                                        ease: [0.16, 1, 0.3, 1]
                                      }
                                    }
                                  }}
                                  exit={{ 
                                    opacity: 0,
                                    height: 0,
                                    transition: {
                                      opacity: { duration: 0.1 },
                                      height: { 
                                        duration: 0.2,
                                        ease: [0.16, 1, 0.3, 1]
                                      }
                                    }
                                  }}
                                >
                                  <p className="text-gray-300 text-sm">
                                    {project.description}
                                  </p>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex flex-wrap gap-2 mt-4">
                        {project.skills.slice(0, 3).map((skill: string, i: number) => (
                          <span 
                            key={i}
                            className="px-2 py-1 text-xs rounded-full bg-indigo-500/10 text-indigo-300"
                          >
                            {skill}
                          </span>
                        ))}
                        {project.skills.length > 3 && (
                          <span className="px-2 py-1 text-xs rounded-full bg-gray-700/50 text-gray-400">
                            +{project.skills.length - 3} more
                          </span>
                        )}
                      </div>
                    </motion.div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </Scrollbars>
  );
};

export function getStaticProps() {
  const projects = projectsdata();
  return {
    props: {
      projects: projects,
    },
  };
}

export default Projects;
