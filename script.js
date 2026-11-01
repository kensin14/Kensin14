const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const playerScoreEl = document.getElementById('playerScore');
const cpuScoreEl = document.getElementById('cpuScore');

const state = {
  leftPaddle: {
    x: 30,
    y: canvas.height / 2 - 55,
    width: 14,
    height: 110,
    speed: 7,
  },
  rightPaddle: {
    x: canvas.width - 44,
    y: canvas.height / 2 - 55,
    width: 14,
    height: 110,
    speed: 5.5,
  },
  ball: {
    x: canvas.width / 2,
    y: canvas.height / 2,
    radius: 10,
    speedX: 5,
    speedY: 4,
  },
  scores: {
    player: 0,
    cpu: 0,
  },
};

const keys = {
  ArrowUp: false,
  ArrowDown: false,
};

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function randomBetween(min, max) {
  return Math.random() * (max - min) + min;
}

function resetBall(direction) {
  const angle = randomBetween(-1.1, 1.1);
  const speed = 5.5;

  state.ball.x = canvas.width / 2;
  state.ball.y = canvas.height / 2;
  state.ball.speedX = Math.cos(angle) * speed * direction;
  state.ball.speedY = Math.sin(angle) * speed;
}

function updateScoreboard() {
  playerScoreEl.textContent = state.scores.player;
  cpuScoreEl.textContent = state.scores.cpu;
}

function moveLeftPaddle() {
  let delta = 0;

  if (keys.ArrowUp) delta -= state.leftPaddle.speed;
  if (keys.ArrowDown) delta += state.leftPaddle.speed;

  state.leftPaddle.y = clamp(
    state.leftPaddle.y + delta,
    0,
    canvas.height - state.leftPaddle.height
  );
}

function moveRightPaddle() {
  const targetY = state.ball.y - state.rightPaddle.height / 2;
  const nextY = state.rightPaddle.y + (targetY - state.rightPaddle.y) * 0.12;
  state.rightPaddle.y = clamp(nextY, 0, canvas.height - state.rightPaddle.height);
}

function checkPaddleCollision(paddle, ball) {
  const nearestX = clamp(ball.x, paddle.x, paddle.x + paddle.width);
  const nearestY = clamp(ball.y, paddle.y, paddle.y + paddle.height);
  const dx = ball.x - nearestX;
  const dy = ball.y - nearestY;

  return dx * dx + dy * dy <= ball.radius * ball.radius;
}

function updateBall() {
  state.ball.x += state.ball.speedX;
  state.ball.y += state.ball.speedY;

  if (state.ball.y - state.ball.radius <= 0) {
    state.ball.y = state.ball.radius;
    state.ball.speedY *= -1;
  }

  if (state.ball.y + state.ball.radius >= canvas.height) {
    state.ball.y = canvas.height - state.ball.radius;
    state.ball.speedY *= -1;
  }

  if (
    state.ball.x - state.ball.radius <= state.leftPaddle.x + state.leftPaddle.width &&
    state.ball.x - state.ball.radius >= state.leftPaddle.x &&
    state.ball.y >= state.leftPaddle.y &&
    state.ball.y <= state.leftPaddle.y + state.leftPaddle.height &&
    state.ball.speedX < 0
  ) {
    state.ball.x = state.leftPaddle.x + state.leftPaddle.width + state.ball.radius;
    const impact = (state.ball.y - (state.leftPaddle.y + state.leftPaddle.height / 2)) / (state.leftPaddle.height / 2);
    state.ball.speedX = Math.abs(state.ball.speedX) + 0.3;
    state.ball.speedY = impact * 7;
  }

  if (
    state.ball.x + state.ball.radius >= state.rightPaddle.x &&
    state.ball.x + state.ball.radius <= state.rightPaddle.x + state.rightPaddle.width &&
    state.ball.y >= state.rightPaddle.y &&
    state.ball.y <= state.rightPaddle.y + state.rightPaddle.height &&
    state.ball.speedX > 0
  ) {
    state.ball.x = state.rightPaddle.x - state.ball.radius;
    const impact = (state.ball.y - (state.rightPaddle.y + state.rightPaddle.height / 2)) / (state.rightPaddle.height / 2);
    state.ball.speedX = -(Math.abs(state.ball.speedX) + 0.3);
    state.ball.speedY = impact * 7;
  }

  if (state.ball.x + state.ball.radius < 0) {
    state.scores.cpu += 1;
    updateScoreboard();
    resetBall(1);
  }

  if (state.ball.x - state.ball.radius > canvas.width) {
    state.scores.player += 1;
    updateScoreboard();
    resetBall(-1);
  }
}

function drawMiddleLine() {
  ctx.strokeStyle = 'rgba(148, 163, 184, 0.35)';
  ctx.setLineDash([10, 14]);
  ctx.beginPath();
  ctx.moveTo(canvas.width / 2, 0);
  ctx.lineTo(canvas.width / 2, canvas.height);
  ctx.stroke();
  ctx.setLineDash([]);
}

function drawPaddle(paddle) {
  ctx.fillStyle = '#f8fafc';
  ctx.fillRect(paddle.x, paddle.y, paddle.width, paddle.height);
}

function drawBall() {
  ctx.beginPath();
  ctx.arc(state.ball.x, state.ball.y, state.ball.radius, 0, Math.PI * 2);
  ctx.fillStyle = '#fbbf24';
  ctx.fill();
  ctx.closePath();
}

function render() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawMiddleLine();
  drawPaddle(state.leftPaddle);
  drawPaddle(state.rightPaddle);
  drawBall();
}

function gameLoop() {
  moveLeftPaddle();
  moveRightPaddle();
  updateBall();
  render();
  requestAnimationFrame(gameLoop);
}

window.addEventListener('keydown', (event) => {
  if (event.key in keys) {
    keys[event.key] = true;
  }
});

window.addEventListener('keyup', (event) => {
  if (event.key in keys) {
    keys[event.key] = false;
  }
});

canvas.addEventListener('mousemove', (event) => {
  const rect = canvas.getBoundingClientRect();
  const mouseY = event.clientY - rect.top;
  state.leftPaddle.y = clamp(
    mouseY - state.leftPaddle.height / 2,
    0,
    canvas.height - state.leftPaddle.height
  );
});

updateScoreboard();
resetBall(1);
requestAnimationFrame(gameLoop);

