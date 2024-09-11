import React from 'react';
import { motion } from 'framer-motion';
import { BRICK_WIDTH, BRICK_HEIGHT } from '../utils/gameConstants';

const Brick = ({ x, y, color }) => (
  <motion.div
    className="absolute rounded-sm"
    style={{
      left: x,
      top: y,
      width: BRICK_WIDTH,
      height: BRICK_HEIGHT,
      backgroundColor: color,
      opacity: 0.7,
    }}
    initial={{ opacity: 0, scale: 0.5 }}
    animate={{ opacity: 0.7, scale: 1 }}
    exit={{ opacity: 0, scale: 0.5 }}
    transition={{ duration: 0.3 }}
  />
);

export default Brick;
