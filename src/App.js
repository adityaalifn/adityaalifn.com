import React, { useState, useEffect, useCallback } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { AlertCircle } from 'lucide-react';

// Game Constants
const PADDLE_WIDTH = 100;
const BALL_SIZE = 12;
const BRICK_WIDTH = 60;
const BRICK_HEIGHT = 20;
const BALL_SPEED = 5;

// Brick Component
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

// Confetti Component
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

// Raining Poop Component
const RainingPoop = () => {
  const emojis = Array(20).fill('💩');
  return (
    <div className="fixed inset-0 pointer-events-none">
      {emojis.map((emoji, index) => (
        <motion.div
          key={index}
          className="absolute text-4xl"
          initial={{ y: -50, x: Math.random() * window.innerWidth }}
          animate={{
            y: window.innerHeight,
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

const PersonalWebsite = () => {
  const [paddleX, setPaddleX] = useState(0);
  const [ballPos, setBallPos] = useState({ x: 0, y: 0 });
  const [ballVelocity, setBallVelocity] = useState({ x: BALL_SPEED, y: BALL_SPEED });
  const [bricks, setBricks] = useState([]);
  const [score, setScore] = useState(0);
  const [gameState, setGameState] = useState('initial'); // 'initial', 'playing', 'gameOver', 'won'

  const ballControls = useAnimation();

  const initializeBricks = useCallback(() => {
    const newBricks = [];
    const colors = ['#8B5CF6', '#6D28D9', '#5B21B6', '#4C1D95', '#3B0764'];
    const rows = 5;
    const cols = Math.floor((window.innerWidth * 0.8) / (BRICK_WIDTH + 10)); // 80% of screen width
    const totalWidth = cols * (BRICK_WIDTH + 10) - 10; // Total width of all bricks
    const startX = (window.innerWidth - totalWidth) / 2; // Starting X to center the bricks

    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        newBricks.push({
          id: `${row}-${col}`,
          x: startX + col * (BRICK_WIDTH + 10),
          y: row * (BRICK_HEIGHT + 10) + 50,
          color: colors[row % colors.length],
        });
      }
    }
    setBricks(newBricks);
  }, []);

  const updateBallPosition = useCallback(() => {
    if (gameState !== 'playing') return;

    setBallPos((prev) => {
      let newX = prev.x + ballVelocity.x;
      let newY = prev.y + ballVelocity.y;
      let newVelocityX = ballVelocity.x;
      let newVelocityY = ballVelocity.y;

      // Wall collisions
      if (newX <= 0 || newX >= window.innerWidth - BALL_SIZE) newVelocityX *= -1;
      if (newY <= 0) newVelocityY *= -1;

      // Paddle collision
      if (
        newY >= window.innerHeight - BALL_SIZE - 10 &&
        newX > paddleX &&
        newX < paddleX + PADDLE_WIDTH
      ) {
        newVelocityY *= -1;
        // Adjust x velocity based on where ball hits the paddle
        const hitPosition = (newX - paddleX) / PADDLE_WIDTH;
        newVelocityX = BALL_SPEED * (hitPosition - 0.5) * 2;
      }

      // Brick collisions
      bricks.forEach((brick, index) => {
        if (
          newX < brick.x + BRICK_WIDTH &&
          newX + BALL_SIZE > brick.x &&
          newY < brick.y + BRICK_HEIGHT &&
          newY + BALL_SIZE > brick.y
        ) {
          newVelocityY *= -1;
          setBricks((prev) => prev.filter((_, i) => i !== index));
          setScore((prev) => prev + 10);
        }
      });

      // Game over condition
      if (newY >= window.innerHeight - BALL_SIZE) {
        setGameState('gameOver');
      }

      // Win condition
      if (bricks.length === 0) {
        setGameState('won');
      }

      setBallVelocity({ x: newVelocityX, y: newVelocityY });
      return { x: newX, y: newY };
    });
  }, [ballVelocity, paddleX, bricks, gameState]);

  useEffect(() => {
    const gameLoop = setInterval(updateBallPosition, 16);
    return () => clearInterval(gameLoop);
  }, [updateBallPosition]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (gameState === 'playing') {
        const newX = e.clientX - PADDLE_WIDTH / 2;
        setPaddleX(Math.max(0, Math.min(newX, window.innerWidth - PADDLE_WIDTH)));
      }
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [gameState]);

  const startGame = () => {
    if (gameState === 'initial' || gameState === 'gameOver' || gameState === 'won') {
      setGameState('playing');
      setScore(0);
      initializeBricks();
      setBallPos({ x: window.innerWidth / 2, y: window.innerHeight - 100 });
      setBallVelocity({ x: BALL_SPEED, y: -BALL_SPEED });
    }
  };

  return (
    <div 
      className="min-h-screen bg-gradient-to-br from-purple-500 to-pink-500 flex flex-col items-center justify-center p-4 text-white overflow-hidden"
      onClick={startGame}
    >
      {/* Game elements */}
      <div className="fixed inset-0 pointer-events-none">
        {bricks.map((brick) => (
          <Brick key={brick.id} {...brick} />
        ))}
        {gameState !== 'initial' && (
          <>
            <motion.div
              className="absolute bg-white rounded-full"
              style={{
                left: paddleX,
                bottom: 10,
                width: PADDLE_WIDTH,
                height: 6,
                opacity: 0.8,
              }}
            />
            <motion.div
              className="absolute bg-white rounded-full"
              style={{
                left: ballPos.x,
                top: ballPos.y,
                width: BALL_SIZE,
                height: BALL_SIZE,
                opacity: 0.8,
              }}
              animate={ballControls}
            />
          </>
        )}
      </div>

      {/* Game info */}
      <div className="fixed top-4 left-4 bg-white bg-opacity-20 backdrop-blur-sm rounded-lg p-4 z-20">
        <p className="text-white font-semibold">
          {gameState === 'initial' ? "Click to Play" : `Score: ${score}`}
        </p>
      </div>

      {/* Content */}
      <motion.div
        className="text-center max-w-2xl w-full space-y-6 z-10"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-5xl font-bold">Aditya Alif Nugraha</h1>
        <h2 className="text-2xl">Senior Software Engineer with 5+ years of experience</h2>
        
        <motion.a
          href="mailto:adityaalifnugraha@gmail.com"
          className="inline-block px-6 py-3 bg-white text-purple-600 rounded-full text-lg font-semibold hover:bg-opacity-90 transition-colors duration-300"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={(e) => e.stopPropagation()}
        >
          Connect with me
        </motion.a>

        <motion.div 
          className="bg-white bg-opacity-20 backdrop-blur-sm rounded-lg p-4 flex items-start space-x-3 mt-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          <AlertCircle className="text-white flex-shrink-0 mt-1" />
          <p className="text-left text-sm">
            Site is under construction. In the meantime, please enjoy the Brick Breaker game! 
            {gameState === 'initial' ? " Click anywhere to start." : ""}
            {gameState === 'gameOver' ? " Click anywhere to start again." : ""}
            {gameState === 'won' ? " Congratulations! Click anywhere to play again." : ""}
          </p>
        </motion.div>
      </motion.div>

      {/* Confetti for winning */}
      {gameState === 'won' && <Confetti />}

      {/* Raining poop for losing */}
      {gameState === 'gameOver' && <RainingPoop />}
    </div>
  );
};

export default PersonalWebsite;
