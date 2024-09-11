import React from 'react';

const GameInfo = ({ gameState, score }) => (
  <div className="fixed top-4 left-4 bg-white bg-opacity-20 backdrop-blur-sm rounded-lg p-4 z-20">
    <p className="text-white font-semibold">
      {gameState === 'initial' ? "Click to Play" : `Score: ${score}`}
    </p>
  </div>
);

export default GameInfo;
