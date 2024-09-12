import React from 'react';
import { motion } from 'framer-motion';

const InternshipExperiences = () => {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 sm:p-8 bg-gradient-to-br from-yellow-500 to-red-500 overflow-y-auto">
      <motion.div 
        className="max-w-4xl w-full space-y-6 text-white"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-3xl sm:text-4xl font-bold mb-4 sm:mb-6">Internship Experiences</h2>
        
        <div className="space-y-6 sm:space-y-8">
          <div>
            <h3 className="text-2xl font-semibold">Artificial Intelligence Engineer Intern - GDP Labs</h3>
            <p className="text-sm italic mb-2">June 25 - August 16, 2018</p>
            <p className="text-base sm:text-lg text-justify mb-2">
              GDP Labs is a software development company that focuses on creating innovative solutions using cutting-edge technologies, including artificial intelligence and machine learning.
            </p>
            <ul className="list-disc list-inside space-y-1 text-base sm:text-lg">
              <li>Built an Image Captioning System using Convolutional Neural Network and Gated Recurrent Unit</li>
              <li>Developed front-end, backend system, and core machine learning system as a microservices architecture</li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-2xl font-semibold">Research Assistant - Indonesian Institute of Sciences</h3>
            <p className="text-sm italic mb-2">March 13 - June 8, 2018</p>
            <p className="text-base sm:text-lg text-justify mb-2">
              The Indonesian Institute of Sciences (LIPI) is the governmental authority for science and research in Indonesia, consisting of 47 research centers in the fields of science and technology.
            </p>
            <ul className="list-disc list-inside space-y-1 text-base sm:text-lg">
              <li>Successfully built a deep learning model that can classify dozens of wood species with an accuracy of >90%</li>
              <li>Created a cost-free backend system to run the model</li>
            </ul>
          </div>
          
          <p className="text-base sm:text-lg text-justify mt-4">
            Additionally, I received offers from other top Indonesian tech companies such as Tokopedia, Midtrans, and Kudo, demonstrating my competitiveness in the tech industry even as a student.
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default InternshipExperiences;
