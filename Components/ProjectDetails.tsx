import { Scrollbars } from "react-custom-scrollbars";
import Image from "next/legacy/image";
import { useMediaQuery } from "react-responsive";
import Zoom from "react-medium-image-zoom";
import { motion } from "framer-motion";
import { FiGithub, FiExternalLink, FiArrowLeft } from "react-icons/fi";
import { useRouter } from "next/router";

interface ProjectDetailsProps {
  projectDetails: {
    name: string;
    title: string;
    description: string;
    banner: string;
    logo: string;
    github?: string;
    link?: string;
    features: string[];
    skills: string[];
    snapshots: string[];
    height?: number;
    others?: Array<{
      thumbnail: string;
      title: string;
      description: string;
      logo: string;
      link: string;
    }>;
  };
  altt: string;
}

const ProjectDetails: React.FC<ProjectDetailsProps> = ({ projectDetails, altt }) => {
  const router = useRouter();
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 943px)" });

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const stagger = {
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    },
    hidden: { opacity: 0 }
  };

  // Desktop View
  if (!isTabletOrMobile) {
    return (
      <Scrollbars
        autoHide
        autoHideTimeout={1000}
        autoHideDuration={200}
        universal={true}
      >
        <motion.div
          initial="hidden"
          animate="visible"
          variants={stagger}
          className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800"
        >
          {/* Back button removed as per user request */}

          {/* Banner with Gradient Overlay */}
          <div className="relative w-full h-[60vh] overflow-hidden">
            <div 
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage: `url(${projectDetails.banner})`,
                backgroundPosition: 'center',
                backgroundSize: 'cover',
                filter: 'brightness(0.7)'
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/80 to-transparent" />
            
            <div className="container mx-auto px-6 relative h-full flex flex-col justify-end pb-16">
              <motion.div 
                variants={fadeInUp}
                className="flex items-center space-x-4 mb-6"
              >
                {projectDetails.logo && (
                  <div className="h-20 w-20 rounded-xl overflow-hidden bg-white/10 backdrop-blur-sm p-2">
                    <Image
                      src={projectDetails.logo}
                      alt={altt}
                      width={80}
                      height={80}
                      className="object-contain h-full w-full"
                    />
                  </div>
                )}
                <div>
                  <h1 className="text-4xl font-bold text-white">
                    {projectDetails.name}
                  </h1>
                  <p className="text-xl text-blue-300">{projectDetails.title}</p>
                </div>
              </motion.div>
              
              <motion.div variants={fadeInUp} className="max-w-3xl">
                <p className="text-gray-300 text-lg">
                  {projectDetails.description}
                </p>
                <div className="flex space-x-4 mt-6">
                  {projectDetails.github && (
                    <a
                      href={projectDetails.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-all duration-200"
                    >
                      <FiGithub className="mr-2" /> View on GitHub
                    </a>
                  )}
                  {projectDetails.link && (
                    <a
                      href={projectDetails.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-all duration-200"
                    >
                      <FiExternalLink className="mr-2" /> Live Demo
                    </a>
                  )}
                </div>
              </motion.div>
            </div>
          </div>

          <div className="container mx-auto px-6 py-16">
            <motion.div variants={fadeInUp} className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              <div className="lg:col-span-2">
                <motion.div variants={fadeInUp} className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 shadow-2xl">
                  <h2 className="text-2xl font-bold text-white mb-6 pb-2 border-b border-gray-700">
                    Project Overview
                  </h2>
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold text-blue-300 mb-2">Key Features</h3>
                      <ul className="space-y-2">
                        {projectDetails.features.map((feature, index) => (
                          <motion.li 
                            key={`feature-${index}`}
                            variants={fadeInUp}
                            className="flex items-start text-gray-300"
                          >
                            <span className="text-blue-400 mr-2">▹</span>
                            <span>{feature}</span>
                          </motion.li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </motion.div>

                {/* Screenshots Section */}
                <motion.div 
                  variants={fadeInUp}
                  className="mt-12"
                >
                  <h2 className="text-2xl font-bold text-white mb-6">Screenshots</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {projectDetails.snapshots.map((screenshot, index) => (
                      <motion.div
                        key={`screenshot-${index}`}
                        variants={fadeInUp}
                        className="rounded-xl overflow-hidden"
                      >
                        <Zoom zoomMargin={100}>
                          <Image
                            src={screenshot}
                            alt={`${altt} - Screenshot ${index + 1}`}
                            width={600}
                            height={400}
                            className="w-full h-auto object-cover rounded-lg"
                          />
                        </Zoom>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </div>

              <div>
                <motion.div variants={fadeInUp} className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 shadow-2xl sticky top-6 h-fit">
                  <h2 className="text-2xl font-bold text-white mb-6 pb-2 border-b border-gray-700">
                    Technologies Used
                  </h2>
                  <div className="flex flex-wrap gap-3">
                    {projectDetails.skills.map((skill, index) => (
                      <motion.span
                        key={`skill-${index}`}
                        variants={fadeInUp}
                        className="px-3 py-1.5 bg-blue-500/10 text-blue-300 text-sm font-medium rounded-full"
                      >
                        {skill}
                      </motion.span>
                    ))}
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </Scrollbars>
    );
  }

  // Mobile View
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 p-4">
      {/* Back button removed as per user request */}

      <div className="relative w-full h-64 rounded-xl overflow-hidden mb-6">
        <Image
          src={projectDetails.banner}
          alt={altt}
          layout="fill"
          objectFit="cover"
          className="brightness-75"
        />
      </div>

      <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 mb-6">
        <div className="flex items-center space-x-4 mb-4">
          {projectDetails.logo && (
            <div className="h-16 w-16 rounded-xl overflow-hidden bg-white/10 p-1.5">
              <Image
                src={projectDetails.logo}
                alt={altt}
                width={64}
                height={64}
                className="object-contain h-full w-full"
              />
            </div>
          )}
          <div>
            <h1 className="text-2xl font-bold text-white">{projectDetails.name}</h1>
            <p className="text-blue-300">{projectDetails.title}</p>
          </div>
        </div>

        <p className="text-gray-300 mb-6">{projectDetails.description}</p>

        <div className="flex space-x-3 mb-6">
          {projectDetails.github && (
            <a
              href={projectDetails.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg"
            >
              <FiGithub className="mr-2" /> GitHub
            </a>
          )}
          {projectDetails.link && (
            <a
              href={projectDetails.link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
            >
              <FiExternalLink className="mr-2" /> Live Demo
            </a>
          )}
        </div>

        <div className="mb-6">
          <h2 className="text-xl font-bold text-white mb-3">Key Features</h2>
          <ul className="space-y-2">
            {projectDetails.features.map((feature, index) => (
              <li key={`feature-mobile-${index}`} className="flex items-start text-gray-300">
                <span className="text-blue-400 mr-2 mt-1">▹</span>
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mb-6">
          <h2 className="text-xl font-bold text-white mb-3">Technologies</h2>
          <div className="flex flex-wrap gap-2">
            {projectDetails.skills.map((skill, index) => (
              <span
                key={`skill-mobile-${index}`}
                className="px-3 py-1 bg-blue-500/10 text-blue-300 text-sm font-medium rounded-full"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-bold text-white mb-4">Screenshots</h2>
        <div className="space-y-4">
          {projectDetails.snapshots.map((screenshot, index) => (
            <div key={`screenshot-mobile-${index}`} className="rounded-xl overflow-hidden">
              <Zoom zoomMargin={20}>
                <Image
                  src={screenshot}
                  alt={`${altt} - Screenshot ${index + 1}`}
                  width={600}
                  height={400}
                  className="w-full h-auto object-cover rounded-lg"
                />
              </Zoom>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectDetails;
