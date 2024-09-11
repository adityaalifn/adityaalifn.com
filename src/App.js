import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import Brick from './components/Brick';
import Confetti from './components/Confetti';
import RainingPoop from './components/RainingPoop';
import GameInfo from './components/GameInfo';
import PersonalInfo from './components/PersonalInfo';
import AboutMe from './components/AboutMe';  // Import the new AboutMe component
import { PADDLE_WIDTH, BALL_SIZE, BALL_SPEED } from './utils/gameConstants';
import { initializeBricks, updateBallPosition } from './utils/gameLogic';

const App = () => {
  const [bricks, setBricks] = useState([]);
  const [score, setScore] = useState(0);
  const [gameState, setGameState] = useState('initial');
  const [showScrollIndicator, setShowScrollIndicator] = useState(true);

  const ballRef = useRef(null);
  const paddleRef = useRef(null);
  const containerRef = useRef(null);
  const gameLoopRef = useRef(null);
  const ballPosRef = useRef({ x: 0, y: 0 });
  const ballVelocityRef = useRef({ x: BALL_SPEED, y: BALL_SPEED });
  const paddleXRef = useRef(0);

  useEffect(() => {
    const gameLoop = () => {
      updateBallPosition(gameState, ballPosRef, ballVelocityRef, paddleXRef, ballRef, setBricks, setScore, setGameState, bricks);
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
  }, [gameState, bricks]);

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

    const handleScroll = () => {
      if (window.scrollY > 100) {
        setShowScrollIndicator(false);
      } else {
        setShowScrollIndicator(true);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove);
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [gameState]);

  const startGame = useCallback(() => {
    if (gameState === 'initial' || gameState === 'gameOver' || gameState === 'won') {
      setGameState('playing');
      setScore(0);
      setBricks(initializeBricks());
      
      ballPosRef.current = { x: window.innerWidth / 2, y: window.innerHeight - 100 };
      
      const angle = (Math.random() - 0.5) * Math.PI / 2;
      ballVelocityRef.current = {
        x: BALL_SPEED * Math.sin(angle),
        y: -BALL_SPEED * Math.cos(angle)
      };
      
      if (ballRef.current) {
        ballRef.current.style.transform = `translate(${ballPosRef.current.x}px, ${ballPosRef.current.y}px)`;
      }
    }
  }, [gameState]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-500 to-pink-500 text-white overflow-x-hidden">
      <div 
        ref={containerRef}
        className="min-h-screen flex flex-col items-center justify-center p-4 relative"
      >
        <div className="fixed inset-0 pointer-events-none">
          {bricks.map((brick) => (
            <Brick key={brick.id} {...brick} />
          ))}
          {gameState !== 'initial' && (
            <>
              <div
                ref={paddleRef}
                className="absolute bg-yellow-300 rounded-full"
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
                className="absolute bg-yellow-300 rounded-full"
                style={{
                  width: BALL_SIZE,
                  height: BALL_SIZE,
                  opacity: 0.8,
                }}
              />
            </>
          )}
        </div>

        <GameInfo gameState={gameState} score={score} />
        <PersonalInfo />

        {gameState === 'won' && <Confetti />}
        {gameState === 'gameOver' && <RainingPoop />}

        {showScrollIndicator && (
          <motion.div 
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
            initial={{ y: 0 }}
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          >
            <ChevronDown size={48} className="text-white" />
            <ChevronDown size={48} className="text-white -mt-6" />
          </motion.div>
        )}
      </div>

      <AboutMe />  {/* Use the new AboutMe component here */}

      {/* Full-screen overlay to capture clicks/taps for game interaction */}
      <div 
        className="fixed inset-0 z-50"
        onClick={startGame}
        style={{ pointerEvents: gameState === 'playing' ? 'none' : 'auto' }}
      />
    </div>
  );
};

export default App;
