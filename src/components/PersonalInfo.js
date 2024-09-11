import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Github, Twitter, FileText, AlertCircle } from 'lucide-react';

const PersonalInfo = () => (
  <motion.div
    className="text-center max-w-2xl w-full space-y-6 z-10"
    initial={{ opacity: 0, y: -20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8 }}
  >
    <h1 className="text-5xl font-bold">Aditya Alif Nugraha</h1>
    <h2 className="text-2xl">Senior Software Engineer with 5+ years of experience</h2>
    
    <div className="flex flex-col items-center space-y-4">
      <div className="flex items-center space-x-4">
        <motion.a
          href="mailto:adityaalifnugraha@gmail.com"
          className="inline-flex items-center px-6 py-3 bg-white text-purple-600 rounded-full text-lg font-semibold hover:bg-opacity-90 transition-colors duration-300"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={(e) => e.stopPropagation()}
        >
          <Mail className="mr-2" /> Connect with me
        </motion.a>
        <motion.a
          href="https://github.com/yourusername"
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 bg-white text-purple-600 rounded-full hover:bg-opacity-90 transition-colors duration-300"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={(e) => e.stopPropagation()}
        >
          <Github size={24} />
        </motion.a>
        <motion.a
          href="https://twitter.com/yourusername"
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 bg-white text-purple-600 rounded-full hover:bg-opacity-90 transition-colors duration-300"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={(e) => e.stopPropagation()}
        >
          <Twitter size={24} />
        </motion.a>
        <motion.a
          href="/path-to-your-resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 bg-white text-purple-600 rounded-full hover:bg-opacity-90 transition-colors duration-300"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={(e) => e.stopPropagation()}
        >
          <FileText size={24} />
        </motion.a>
      </div>
      <p className="text-white text-sm">
        Email: adityaalifnugraha@gmail.com
      </p>
    </div>

    <motion.div 
      className="bg-white bg-opacity-20 backdrop-blur-sm rounded-lg p-4 flex items-start space-x-3 mt-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5, duration: 0.8 }}
    >
      <AlertCircle className="text-white flex-shrink-0 mt-1" />
      <p className="text-left text-sm">
        Site is under construction. In the meantime, please enjoy the Brick Breaker game! 
        Click or tap anywhere to start, restart, or play again.
      </p>
    </motion.div>
  </motion.div>
);

export default PersonalInfo;
