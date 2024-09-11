import { BRICK_WIDTH, BRICK_HEIGHT, BALL_SIZE, PADDLE_WIDTH, BALL_SPEED } from './gameConstants';

export const initializeBricks = () => {
  const newBricks = [];
  const colors = ['#8B5CF6', '#6D28D9', '#5B21B6', '#4C1D95', '#3B0764'];
  const rows = 5;
  const cols = Math.floor((window.innerWidth * 0.8) / (BRICK_WIDTH + 10));
  const totalWidth = cols * (BRICK_WIDTH + 10) - 10;
  const startX = (window.innerWidth - totalWidth) / 2;

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
  return newBricks;
};

export const updateBallPosition = (
  gameState,
  ballPosRef,
  ballVelocityRef,
  paddleXRef,
  ballRef,
  setBricks,
  setScore,
  setGameState,
  bricks
) => {
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
};
