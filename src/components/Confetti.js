import React from 'react';
import { motion } from 'framer-motion';

const Confetti = () => {
  const emojis = ['🎉', '🎊', '🥳', '🍾', '🎈'];
  return (
    <div className="fixed inset-0 pointer-events-none">
      {emojis.map((emoji, index) => (
        <motion.div
          key={index}
          className="absolute text-4xl"
          initial={{ y: -50, x: Math.random() * window.innerWidth }}
          animate={{
            y: window.innerHeight,
            rotate: 360,
          }}
          transition={{
            duration: Math.random() * 2 + 1,
            repeat: Infinity,
            repeatType: "loop"
          }}
        >
          {emoji}
        </motion.div>
      ))}
    </div>
  );
};

export default Confetti;
