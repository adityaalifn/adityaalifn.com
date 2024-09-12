import React from 'react';
import { motion } from 'framer-motion';

const WorkExperiences = () => {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 sm:p-8 bg-gradient-to-br from-green-500 to-blue-500 overflow-y-auto">
      <motion.div 
        className="max-w-4xl w-full space-y-6 text-white"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-3xl sm:text-4xl font-bold mb-4 sm:mb-6">Work Experiences</h2>
        
        <div className="space-y-4 sm:space-y-6">
          <h3 className="text-2xl font-semibold">Senior Software Engineer at Gojek</h3>
          <p className="text-base sm:text-lg text-justify">
            At Gojek, Southeast Asia's tech giant providing a wide range of services including transportation, food delivery, logistics, payment, and more, I've contributed to multiple teams: payment, driver platform, consumer platform, consumer growth, and cartography.
          </p>
          
          <h4 className="text-xl font-semibold">Key Projects and Achievements:</h4>
          <ul className="list-disc list-inside space-y-2 text-base sm:text-lg">
            <li>Built payment microservices monitoring</li>
            <li>Developed driver inventory transactions</li>
            <li>Created automated driver online meetings</li>
            <li>Contributed to global search engine development</li>
            <li>Worked on recommender system, ads, vouchers and promotions</li>
            <li>Handled the Gojek app core experience</li>
            <li>Currently developing an internal routing engine capable of directions, live tracking, and map-matching</li>
          </ul>
          
          <p className="text-base sm:text-lg text-justify">
            The internal routing engine project aims to replace Google Maps API, potentially saving millions of dollars in annual costs.
          </p>
          
          <p className="text-base sm:text-lg text-justify">
            Throughout my tenure, I've demonstrated strong problem-solving skills, adaptability to diverse roles, and the ability to effectively communicate complex technical concepts to both technical and non-technical stakeholders.
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default WorkExperiences;
