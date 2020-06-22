const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
canvas.height = window.innerHeight / 1.2;
canvas.width = window.innerWidth / 1.2;

const frogImage = new Image();
frogImage.src = "frog.png";
frogImage.onload = animate;
function drawFrog() {
  ctx.drawImage(frogImage, frog.x, frog.y, frog.width, frog.height);
}

const frog = {
  x: canvas.width / 2 - 75,
  y: canvas.height - 150,
  width: 150,
  height: 150,
};

const carImage = new Image();
carImage.src = "car.png";
// carImage.onload = animate;
function drawCar() {
  car.x += car.speed;
  ctx.drawImage(carImage, car.x, car.y, car.width, car.height);
}

const cars = [];
setInterval(function () {
  cars.push({
    x: 0,
    y: 150 * Math.floor(Math.random() * 3),
    width: 50,
    height: 50,
    speed: Math.random() * 10,
  });
}, 3000);

const car = {
  x: 0,
  y: 300,
  width: 50,
  height: 50,
  speed: 5,
};

function drawHighway() {
  ctx.fillStyle = "gray";
  ctx.fillRect(0, canvas.height / 4, canvas.width, canvas.height / 2);
}
// Use switch keys - up, down, left, right and spacebar (to jump) to allow the frog to move

document.body.onkeydown = function (event) {
  console.log(event.key);

  switch (event.key) {
    case "ArrowLeft":
      frog.x -= 10;
      break;

    case "ArrowRight":
      frog.x += 10;
      break;

    case "ArrowUp":
      frog.y -= 10;
      break;

    case "ArrowDown":
      frog.y += 10;
      break;

    case " ":
      break;
  }
};

// Create animation loop with cars going left to right across 4 lines at randomized times
function animate() {
  window.requestAnimationFrame(animate);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawHighway();
  drawFrog();
  drawCar();
  console.log("hi");
}
