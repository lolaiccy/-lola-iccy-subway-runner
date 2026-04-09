const player = document.getElementById("player");
const obstacle = document.getElementById("obstacle");

document.addEventListener("keydown", function(e) {
  if (e.code === "Space") {
    jump();
  }
});

function jump() {
  if (!player.classList.contains("jump")) {
    player.classList.add("jump");
    setTimeout(() => {
      player.classList.remove("jump");
    }, 500);
  }
}

// Collision detection
let isAlive = setInterval(function () {
  let playerTop = parseInt(window.getComputedStyle(player).getPropertyValue("bottom"));
  let obstacleLeft = parseInt(window.getComputedStyle(obstacle).getPropertyValue("right"));

  if (obstacleLeft > 330 && obstacleLeft < 370 && playerTop < 40) {
    alert("💀 Game Over!");
    obstacle.style.animation = "none";
    obstacle.style.display = "none";
  }
}, 10);
