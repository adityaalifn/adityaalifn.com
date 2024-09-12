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
          <p className="text-sm italic mb-2">June 2019 - Present</p>
          <p className="text-base sm:text-lg text-justify mb-4">
            Gojek is Southeast Asia's leading on-demand multi-service platform and digital payment technology group. It's a decacorn startup that provides a wide range of services including transportation, food delivery, logistics, payment, and more.
          </p>
          
          <p className="text-base sm:text-lg text-justify">
            At Gojek, I've contributed to multiple teams: payment, driver platform, consumer platform, consumer growth, and cartography.
          </p>
          
          <h4 className="text-xl font-semibold mt-4">Key Projects and Achievements:</h4>
          <ul className="list-disc list-inside space-y-2 text-base sm:text-lg">
            <li>Developed an internal routing engine capable of directions, live tracking, and map-matching, potentially saving millions of dollars in annual costs</li>
            <li>Generated hundred thousand of USD daily revenue by building an ad system</li>
            <li>Built a seamless global search system with query and intent understanding, integrated with >10 products, serving 25 million searches</li>
            <li>Developed a high throughput and availability home content recommendation system</li>
            <li>Created an inventory sales and management system with complex discount, pricing EMI, and rule features</li>
            <li>Built an automated platform for operation teams to conduct virtual meetings with millions of drivers</li>
          </ul>
          
          <p className="text-base sm:text-lg text-justify mt-4">
            Throughout my tenure, I've demonstrated strong problem-solving skills, adaptability to diverse roles, and the ability to effectively communicate complex technical concepts to both technical and non-technical stakeholders.
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default WorkExperiences;
