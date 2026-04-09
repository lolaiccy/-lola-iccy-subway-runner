body {
  margin: 0;
  font-family: Arial, sans-serif;
  background: linear-gradient(to bottom, #00c6ff, #0072ff);
  color: white;
  text-align: center;
}

.ui {
  padding: 10px;
}

#game {
  width: 400px;
  height: 500px;
  margin: auto;
  position: relative;
  overflow: hidden;
  border: 3px solid white;

  background: url("assets/bg.png") repeat-y;
  background-size: cover;
  animation: bgScroll 5s linear infinite;
}

@keyframes bgScroll {
  from { background-position-y: 0; }
  to { background-position-y: 500px; }
}

#player {
  width: 60px;
  position: absolute;
  bottom: 0;
  left: 170px;
  transition: left 0.15s;
}

#chaser {
  width: 60px;
  position: absolute;
  bottom: 0;
  left: 170px;
  opacity: 0.4;
}

.obstacle, .coin {
  position: absolute;
  top: -60px;
}

.obstacle {
  width: 50px;
}

.coin {
  width: 30px;
}
