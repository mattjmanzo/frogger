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

// define variable of level at level 0
// write function increaseLevel so that once y coordinate of frog >= y coordinate of edge of highway, move onto next level --> level++

// write a reset function that clears cars array and updates frog coordinates to initial coordinates

const frog = {
  x: canvas.width / 2 - 75,
  y: canvas.height - 150,
  width: 150,
  height: 150,
};

const carImage = new Image();
carImage.src = "car.png";
// carImage.onload = animate;
function drawCar(car) {
  car.x += car.speed;
  ctx.drawImage(carImage, car.x, car.y, car.width, car.height);
}

function drawCars() {
  cars.forEach((car) => drawCar(car));
}

const cars = [];
setInterval(function () {
  cars.push({
    x: 0,
    y: 150 * Math.floor(Math.random() * 3),
    width: 50,
    height: 50,
    speed: 5 + Math.random() * 10,
  });
}, 3000);

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
  drawCars();
  console.log("hi");
}
