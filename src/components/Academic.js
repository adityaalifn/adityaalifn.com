import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';

const Academic = () => {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 sm:p-8 bg-gradient-to-br from-indigo-500 to-purple-500 overflow-y-auto">
      <motion.div 
        className="max-w-4xl w-full space-y-6 text-white"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-3xl sm:text-4xl font-bold mb-4 sm:mb-6">Academic Background</h2>
        
        <div className="space-y-4 sm:space-y-6">
          <div>
            <h3 className="text-2xl font-semibold">Telkom University</h3>
            <p className="text-base sm:text-lg text-justify">
              Bachelor of Computer Science<br/>
              Graduated Cum Laude with a GPA of 3.61 out of 4
            </p>
          </div>
          
          <div>
            <h3 className="text-2xl font-semibold">Research and Publications</h3>
            <p className="text-base sm:text-lg text-justify">
              Published undergraduate thesis titled "Generating Image Description in Indonesian Language using Convolutional Neural Network and Gated Recurrent Unit" at an international conference.
              <motion.a
                href="https://ieeexplore.ieee.org/document/8835370"
                target="_blank"
                rel="noopener noreferrer"
                className="text-yellow-300 hover:text-yellow-100 transition-colors duration-300 ml-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                View Publication <ExternalLink className="inline ml-1" size={16} />
              </motion.a>
            </p>
          </div>
          
          <div>
            <h3 className="text-2xl font-semibold">Artificial Intelligence Laboratory</h3>
            <p className="text-base sm:text-lg text-justify">
              Led research on cheating action detection using human pose estimation.
            </p>
          </div>
          
          <div>
            <h3 className="text-2xl font-semibold">Teaching Experience</h3>
            <p className="text-base sm:text-lg text-justify">
              Served as an Assistant Lecturer for Artificial Intelligence and Machine Learning courses.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Academic;
