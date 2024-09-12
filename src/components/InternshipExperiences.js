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
        
        <div className="space-y-4 sm:space-y-6">
          <div>
            <h3 className="text-2xl font-semibold">Gojek</h3>
            <p className="text-base sm:text-lg text-justify">
              Developed a microservice monitoring system for Kubernetes cluster and Consul.
            </p>
          </div>
          
          <div>
            <h3 className="text-2xl font-semibold">GDP Labs</h3>
            <p className="text-base sm:text-lg text-justify">
              Developed and deployed an image captioning machine learning model using Convolutional Neural Network and Gated Recurrent Unit.
            </p>
          </div>
          
          <div>
            <h3 className="text-2xl font-semibold">The Indonesian Institute of Sciences</h3>
            <p className="text-base sm:text-lg text-justify">
              Successfully developed a wood classification machine learning model with 90% accuracy in just 3 weeks.
            </p>
          </div>
          
          <p className="text-base sm:text-lg text-justify">
            Additionally, I received offers from other top Indonesian tech companies such as Tokopedia, Midtrans, and Kudo.
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default InternshipExperiences;
