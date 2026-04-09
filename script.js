const game = document.getElementById("game");
const player = document.getElementById("player");
const scoreDisplay = document.getElementById("score");

let lanes = [85, 185, 285]; // 3 lanes
let currentLane = 1;
let score = 0;
let speed = 3;
let isGameOver = false;

// Move player
document.addEventListener("keydown", (e) => {
  if (isGameOver) return;

  if (e.key === "ArrowLeft" || e.key.toLowerCase() === "a") {
    if (currentLane > 0) currentLane--;
  }

  if (e.key === "ArrowRight" || e.key.toLowerCase() === "d") {
    if (currentLane < 2) currentLane++;
  }

  if (e.code === "Space") {
    jump();
  }

  player.style.left = lanes[currentLane] + "px";
});

// Jump
function jump() {
  if (!player.classList.contains("jump")) {
    player.classList.add("jump");
    setTimeout(() => {
      player.classList.remove("jump");
    }, 500);
  }
}

// Create obstacles
function createObstacle() {
  if (isGameOver) return;

  const obstacle = document.createElement("div");
  obstacle.classList.add("obstacle");

  let lane = Math.floor(Math.random() * 3);
  obstacle.style.left = lanes[lane] + "px";

  game.appendChild(obstacle);

  let top = -40;

  let move = setInterval(() => {
    if (isGameOver) {
      clearInterval(move);
      return;
    }

    top += speed;
    obstacle.style.top = top + "px";

    // Collision
    let playerBottom = parseInt(window.getComputedStyle(player).getPropertyValue("bottom"));
    let obstacleTop = top;

    if (
      obstacleTop > 220 &&
      obstacleTop < 260 &&
      lane === currentLane &&
      playerBottom < 40
    ) {
      gameOver();
    }

    // Remove obstacle
    if (top > 300) {
      obstacle.remove();
      clearInterval(move);
      score++;
      scoreDisplay.innerText = "Score: " + score;

      // Increase speed gradually
      if (score % 5 === 0) speed += 0.5;
    }
  }, 20);

  // Spawn next obstacle
  setTimeout(createObstacle, 1000 + Math.random() * 1000);
}

// Game over
function gameOver() {
  isGameOver = true;
  alert("💀 Game Over! Score: " + score);
  location.reload();
}

// Start game
createObstacle();
