import { NextPage } from "next";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import Image from "next/legacy/image";
import { useMediaQuery } from "react-responsive";
import Head from "next/head";
import { motion } from "framer-motion";
import { FiBriefcase, FiCalendar, FiMapPin } from "react-icons/fi";

const Experience: NextPage = () => {
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 943px)" });
  
  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  return (
    <div className="w-full h-full">
      <Head>
        <title>Professional Experience | Arman Khan</title>
        <meta name="description" content="Professional experience and work history of Arman Khan" />
        <link rel="icon" href="/favicon.ico" />
        <meta property="og:title" content="Professional Experience | Arman Khan" />
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
        <meta name="twitter:widgets:csp" content="on" />
      </Head>
      {!isTabletOrMobile ? (
        <motion.div 
          className="p-6 pl-8 pb-32 text-center"
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >
          <motion.div 
            className="mb-16 md:mb-20"
            variants={fadeInUp}
          >
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-500">
              Professional Journey
            </h1>
            <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              A timeline of my professional growth and contributions in software engineering and technology
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-indigo-500 to-purple-600 mx-auto mt-6 rounded-full"></div>
          </motion.div>
          <div className="w-full timeline py-8 px-4">
            <VerticalTimeline>
              <VerticalTimelineElement
                className="vertical-timeline-element--work"
                contentStyle={{
                  background: "linear-gradient(to right, #4A00E0, #8E2DE2)",
                  color: "#fff",
                }}
                contentArrowStyle={{
                  borderRight: "7px solid  #4A00E0",
                }}
                date="Aug 2021 - present"
                iconStyle={{ background: "rgb(33, 150, 243)", color: "#fff" }}
                icon={
                  <Image
                    src={"/velotio.jpg"}
                    width="500"
                    height="500"
                    className="rounded-full"
                    alt="velotio"
                  />
                }
              >
                <h3 className="vertical-timeline-element-title font-bold">
                  Software Development Engineer I
                </h3>
                <h4 className="vertical-timeline-element-subtitle">
                  Your Company, IN
                </h4>
                <div className="text-left">
                  <p>• Work experience Points</p>
                  <p>
                    • Tech Stack: JavaScript, TypeScript, React, Node.js,
                    Redux, SASS, LESS, Bootstrap, Jest, HTML5, CSS3
                  </p>
                </div>
              </VerticalTimelineElement>
              <VerticalTimelineElement
                className="vertical-timeline-element--work"
                contentStyle={{
                  background: "linear-gradient(to right, #4A00E0, #8E2DE2)",
                  color: "#fff",
                }}
                contentArrowStyle={{
                  borderRight: "7px solid  #4A00E0",
                }}
                date="Dec 2020 - Aug 2021"
                iconStyle={{ background: "rgb(33, 150, 243)", color: "#fff" }}
                icon={
                  <Image
                    src={"/hha.png"}
                    width="500"
                    height="500"
                    className="rounded-full"
                    alt="velotio"
                  />
                }
              >
                <h3 className="vertical-timeline-element-title font-bold">
                  Software Development Engineer I
                </h3>
                <h4 className="vertical-timeline-element-subtitle">
                  Your Company 2, IN
                </h4>
                <div className="text-left">
                  <p>• Work experience Points</p>
                  <p>
                    • Tech Stack: JavaScript, TypeScript, React, Node.js,
                    Redux, SASS, LESS, Bootstrap, Jest, HTML5, CSS3
                  </p>
                </div>
              </VerticalTimelineElement>
            </VerticalTimeline>
          </div>
        </motion.div>
      ) : (
        <div className=" pt-5 text-center ">
          <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            <span className="block lg:text-5xl  font-bold leading-tight text-3xl text-white">
              Work
            </span>
            <span className="block pt-3 text-indigo-500 text-2xl">
              Industry Experience
            </span>
          </h2>
          <div className="w-full py-8 px-4">
            <VerticalTimeline>
              <VerticalTimelineElement
                className="vertical-timeline-element--work"
                contentStyle={{
                  background: "linear-gradient(to right, #4A00E0, #8E2DE2)",
                  color: "#fff",
                }}
                contentArrowStyle={{
                  borderRight: "7px solid  #4A00E0",
                }}
                date="Aug 2021 - present"
                iconStyle={{ background: "rgb(33, 150, 243)", color: "#fff" }}
                icon={
                  <Image
                    src={"/velotio.jpg"}
                    width="500"
                    height="500"
                    className="rounded-full"
                    alt="velotio"
                  />
                }
              >
                <h3 className="vertical-timeline-element-title font-bold">
                  Software Development Engineer I
                </h3>
                <h4 className="vertical-timeline-element-subtitle">
                  Your Company, IN
                </h4>
                <div className="text-left">
                  <p>• Work experience Points</p>
                  <p>
                    • Tech Stack: JavaScript, TypeScript, React, Node.js,
                    Redux, SASS, LESS, Bootstrap, Jest, HTML5, CSS3
                  </p>
                </div>
              </VerticalTimelineElement>
              <VerticalTimelineElement
                className="vertical-timeline-element--work"
                contentStyle={{
                  background: "linear-gradient(to right, #4A00E0, #8E2DE2)",
                  color: "#fff",
                }}
                contentArrowStyle={{
                  borderRight: "7px solid  #4A00E0",
                }}
                date="Dec 2020 - Aug 2021"
                iconStyle={{ background: "rgb(33, 150, 243)", color: "#fff" }}
                icon={
                  <Image
                    src={"/hha.png"}
                    width="500"
                    height="500"
                    className="rounded-full"
                    alt="velotio"
                  />
                }
              >
                <h3 className="vertical-timeline-element-title font-bold">
                  Software Development Engineer I
                </h3>
                <h4 className="vertical-timeline-element-subtitle">
                  Your Company 2, IN
                </h4>
                <div className="text-left">
                  <p>• Work experience Points</p>
                  <p>
                    • Tech Stack: JavaScript, TypeScript, React, Node.js,
                    Redux, SASS, LESS, Bootstrap, Jest, HTML5, CSS3
                  </p>
                </div>
              </VerticalTimelineElement>
            </VerticalTimeline>
          </div>
        </div>
      )}
    </div>
  );
};

export default Experience;
