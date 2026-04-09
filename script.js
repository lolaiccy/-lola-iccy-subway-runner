// ELEMENTS
const game = document.getElementById("game");
const player = document.getElementById("player");
const scoreEl = document.getElementById("score");
const highScoreEl = document.getElementById("highScore");

const jumpSound = document.getElementById("jumpSound");
const music = document.getElementById("bgMusic");

// GAME STATE
const lanes = [80, 170, 260];
let currentLane = 1;

let score = 0;
let speed = 4;
let jumping = false;
let gameOverState = false;

// HIGH SCORE
let highScore = localStorage.getItem("highScore") || 0;
highScoreEl.innerText = "High Score: " + highScore;

// START MUSIC
music.volume = 0.3;
music.play().catch(() => {}); // avoid autoplay errors

// =========================
// CONTROLS (PC + MOBILE)
// =========================
document.addEventListener("keydown", handleKey);
document.addEventListener("touchstart", handleTouch);

let touchStartX = 0;

function handleTouch(e) {
  let touch = e.touches[0];
  touchStartX = touch.clientX;

  // Tap = jump
  jump();
}

function handleKey(e) {
  if (gameOverState) return;

  if (e.key === "ArrowLeft" || e.key === "a") moveLeft();
  if (e.key === "ArrowRight" || e.key === "d") moveRight();
  if (e.code === "Space") jump();
}

function moveLeft() {
  if (currentLane > 0) currentLane--;
  updatePlayerPosition();
}

function moveRight() {
  if (currentLane < 2) currentLane++;
  updatePlayerPosition();
}

function updatePlayerPosition() {
  player.style.left = lanes[currentLane] + "px";
}

// =========================
// JUMP SYSTEM
// =========================
function jump() {
  if (jumping) return;

  jumping = true;
  jumpSound.currentTime = 0;
  jumpSound.play();

  let height = 0;

  let up = setInterval(() => {
    height += 6;
    player.style.bottom = height + "px";

    if (height >= 120) clearInterval(up);
  }, 16);

  let down = setInterval(() => {
    height -= 6;
    player.style.bottom = height + "px";

    if (height <= 0) {
      clearInterval(down);
      jumping = false;
    }
  }, 16);
}

// =========================
// OBSTACLES
// =========================
function spawnObstacle() {
  if (gameOverState) return;

  const obs = document.createElement("img");
  obs.src = "assets/obstacle.png";
  obs.className = "obstacle";

  let lane = Math.floor(Math.random() * 3);
  obs.style.left = lanes[lane] + "px";

  game.appendChild(obs);

  let top = -60;

  let move = setInterval(() => {
    if (gameOverState) return clearInterval(move);

    top += speed;
    obs.style.top = top + "px";

    // Collision
    if (
      top > 350 &&
      top < 420 &&
      lane === currentLane &&
      parseInt(player.style.bottom || 0) < 50
    ) {
      endGame();
    }

    // Passed
    if (top > 500) {
      obs.remove();
      clearInterval(move);
      score++;
      updateScore();
    }
  }, 16);

  setTimeout(spawnObstacle, 900 + Math.random() * 600);
}

// =========================
// COINS
// =========================
function spawnCoin() {
  if (gameOverState) return;

  const coin = document.createElement("img");
  coin.src = "assets/coin.png";
  coin.className = "coin";

  let lane = Math.floor(Math.random() * 3);
  coin.style.left = lanes[lane] + "px";

  game.appendChild(coin);

  let top = -30;

  let move = setInterval(() => {
    if (gameOverState) return clearInterval(move);

    top += speed;
    coin.style.top = top + "px";

    // Collect
    if (
      top > 350 &&
      top < 420 &&
      lane === currentLane
    ) {
      coin.remove();
      clearInterval(move);
      score += 5;
      updateScore();
    }

    if (top > 500) {
      coin.remove();
      clearInterval(move);
    }
  }, 16);

  setTimeout(spawnCoin, 1200 + Math.random() * 800);
}

// =========================
// SCORE SYSTEM
// =========================
function updateScore() {
  scoreEl.innerText = "Score: " + score;

  if (score > highScore) {
    highScore = score;
    localStorage.setItem("highScore", highScore);
    highScoreEl.innerText = "High Score: " + highScore;
  }

  // Increase difficulty
  if (score % 10 === 0) speed += 0.5;
}

// =========================
// GAME OVER
// =========================
function endGame() {
  gameOverState = true;
  alert("💀 Game Over!\nScore: " + score);
  location.reload();
}

// START GAME
spawnObstacle();
spawnCoin();
