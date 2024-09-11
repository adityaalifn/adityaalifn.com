import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion } from 'framer-motion';
import { AlertCircle, Mail, Github, Twitter, FileText } from 'lucide-react';

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
  const emojis = Array(20).fill('👎');
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
  const [bricks, setBricks] = useState([]);
  const [score, setScore] = useState(0);
  const [gameState, setGameState] = useState('initial');

  const ballRef = useRef(null);
  const paddleRef = useRef(null);
  const containerRef = useRef(null);
  const gameLoopRef = useRef(null);
  const ballPosRef = useRef({ x: 0, y: 0 });
  const ballVelocityRef = useRef({ x: BALL_SPEED, y: BALL_SPEED });
  const paddleXRef = useRef(0);

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

    let { x, y } = ballPosRef.current;
    let { x: vx, y: vy } = ballVelocityRef.current;

    x += vx;
    y += vy;

    // Wall collisions
    if (x <= 0 || x >= window.innerWidth - BALL_SIZE) vx *= -1;
    if (y <= 0) vy *= -1;

    // Paddle collision
    if (
      y >= window.innerHeight - BALL_SIZE - 10 &&
      x > paddleXRef.current &&
      x < paddleXRef.current + PADDLE_WIDTH
    ) {
      vy *= -1;
      // Adjust x velocity based on where ball hits the paddle
      const hitPosition = (x - paddleXRef.current) / PADDLE_WIDTH;
      vx = BALL_SPEED * (hitPosition - 0.5) * 2;
    }

    // Brick collisions
    setBricks((prevBricks) => {
      let newBricks = [...prevBricks];
      let collision = false;

      for (let i = 0; i < newBricks.length; i++) {
        const brick = newBricks[i];
        if (
          x < brick.x + BRICK_WIDTH &&
          x + BALL_SIZE > brick.x &&
          y < brick.y + BRICK_HEIGHT &&
          y + BALL_SIZE > brick.y
        ) {
          vy *= -1;
          newBricks.splice(i, 1);
          setScore((prev) => prev + 10);
          collision = true;
          break;
        }
      }

      if (collision) {
        return newBricks;
      }
      return prevBricks;
    });

    // Game over condition
    if (y >= window.innerHeight - BALL_SIZE) {
      setGameState('gameOver');
    }

    // Win condition
    if (bricks.length === 0) {
      setGameState('won');
    }

    ballPosRef.current = { x, y };
    ballVelocityRef.current = { x: vx, y: vy };

    // Update ball position in the DOM
    if (ballRef.current) {
      ballRef.current.style.transform = `translate(${x}px, ${y}px)`;
    }
  }, [gameState, bricks.length]);

  useEffect(() => {
    const gameLoop = () => {
      updateBallPosition();
      gameLoopRef.current = requestAnimationFrame(gameLoop);
    };

    if (gameState === 'playing') {
      gameLoopRef.current = requestAnimationFrame(gameLoop);
    }

    return () => {
      if (gameLoopRef.current) {
        cancelAnimationFrame(gameLoopRef.current);
      }
    };
  }, [gameState, updateBallPosition]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (gameState === 'playing') {
        const newX = e.clientX - PADDLE_WIDTH / 2;
        paddleXRef.current = Math.max(0, Math.min(newX, window.innerWidth - PADDLE_WIDTH));
        if (paddleRef.current) {
          paddleRef.current.style.left = `${paddleXRef.current}px`;
        }
      }
    };

    const handleTouchMove = (e) => {
      if (gameState === 'playing' && e.touches[0]) {
        const newX = e.touches[0].clientX - PADDLE_WIDTH / 2;
        paddleXRef.current = Math.max(0, Math.min(newX, window.innerWidth - PADDLE_WIDTH));
        if (paddleRef.current) {
          paddleRef.current.style.left = `${paddleXRef.current}px`;
        }
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, [gameState]);

  const startGame = () => {
    if (gameState === 'initial' || gameState === 'gameOver' || gameState === 'won') {
      setGameState('playing');
      setScore(0);
      initializeBricks();
      
      // Set initial ball position
      ballPosRef.current = { x: window.innerWidth / 2, y: window.innerHeight - 100 };
      
      // Randomize initial ball direction, but always upwards
      const angle = (Math.random() - 0.5) * Math.PI / 2; // Random angle between -45 and 45 degrees
      ballVelocityRef.current = {
        x: BALL_SPEED * Math.sin(angle),
        y: -BALL_SPEED * Math.cos(angle) // Negative to ensure upward movement
      };
      
      // Update ball position in the DOM
      if (ballRef.current) {
        ballRef.current.style.transform = `translate(${ballPosRef.current.x}px, ${ballPosRef.current.y}px)`;
      }
    }
  };

  return (
    <div 
      ref={containerRef}
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
            <div
              ref={paddleRef}
              className="absolute bg-white rounded-full"
              style={{
                left: paddleXRef.current,
                bottom: 10,
                width: PADDLE_WIDTH,
                height: 6,
                opacity: 0.8,
              }}
            />
            <div
              ref={ballRef}
              className="absolute bg-white rounded-full"
              style={{
                width: BALL_SIZE,
                height: BALL_SIZE,
                opacity: 0.8,
              }}
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
            {gameState === 'initial' ? " Click or tap anywhere to start." : ""}
            {gameState === 'gameOver' ? " Click or tap anywhere to start again." : ""}
            {gameState === 'won' ? " Congratulations! Click or tap anywhere to play again." : ""}
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
