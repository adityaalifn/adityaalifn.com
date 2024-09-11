import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';

const AboutMe = () => {
  return (
    <div className="min-h-screen flex items-center justify-center p-8 bg-gradient-to-br from-blue-500 to-purple-500">
      <motion.div 
        className="max-w-4xl w-full space-y-8 text-white"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-4xl font-bold mb-6">About Me</h2>
        
        <div className="space-y-6">
          <p className="text-lg text-justify">
            I'm <strong>Aditya Alif Nugraha</strong>, a <strong>Software Engineer with over 5 years of experience</strong>. I currently work as a <strong>Senior Software Engineer at Gojek</strong>, Southeast Asia's tech giant providing a wide range of services including transportation, food delivery, logistics, payment, and more. I've contributed to numerous <strong>critical projects across multiple teams</strong>. My work spans various domains including <strong>payment systems, driver platforms, consumer experiences, and cartography</strong>. I've developed key solutions such as <strong>payment microservices monitoring, driver inventory transactions, automated driver online meetings, a global search engine, and a recommender system</strong>. I've also worked on ads, vouchers, and promotions, significantly impacting Gojek's experience and revenue. Currently, I'm <strong>leading the development of an internal routing engine</strong> capable of directions, live tracking, and map-matching, which is set to replace Google Maps API and potentially save millions in annual costs. Throughout my tenure, I've demonstrated <strong>strong problem-solving skills, adaptability to diverse roles, and the ability to effectively communicate complex technical concepts</strong> to both technical and non-technical stakeholders.
          </p>
          
          <p className="text-lg text-justify">
            My foundation in technology was laid at <strong>Telkom University</strong>, where I earned a <strong>Bachelor's degree in Computer Science, graduating cum laude with a GPA of 3.61 out of 4</strong>. During my time there, I published research on 
            <motion.a
              href="https://ieeexplore.ieee.org/document/8835370"
              target="_blank"
              rel="noopener noreferrer"
              className="text-yellow-300 hover:text-yellow-100 transition-colors duration-300 mx-1"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <strong>"Generating Image Description in Indonesian Language using Convolutional Neural Network and Gated Recurrent Unit"</strong>
              <ExternalLink className="inline ml-1" size={16} />
            </motion.a>
            at an international conference. I was also actively involved in the <strong>Artificial Intelligence Laboratory</strong>, where I led research on <strong>cheating action detection using human pose estimation</strong>. Additionally, I served as an <strong>Assistant Lecturer for AI and Machine Learning courses</strong>. My internship experiences further enhanced my practical skills: at <strong>GDP Labs</strong>, I developed an <strong>image captioning model using CNN and GRU</strong>; at the <strong>Indonesian Institute of Sciences</strong>, I created a <strong>wood classification model achieving 90% accuracy in just three weeks</strong>; and at <strong>Gojek</strong>, I developed a <strong>microservice monitoring system for Kubernetes cluster and Consul</strong>. These diverse experiences in academia and industry internships provided me with a strong foundation in both theoretical knowledge and practical application of technology.
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default AboutMe;
