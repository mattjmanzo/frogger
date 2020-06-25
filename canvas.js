const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
canvas.height = window.innerHeight / 1.2;
canvas.width = window.innerWidth;

const livesDOM = document.querySelector(".lives span");

const levelDOM = document.querySelector(".level span");

let leveled = false;

const frogImage = new Image();
frogImage.src = "frog.png";
frogImage.onload = animate;
function drawFrog() {
  ctx.drawImage(frogImage, frog.x, frog.y, frog.width, frog.height);
}

let level = 1;
let lives = 5;

function passLevel() {
  if (frog.y + frog.height < canvas.height / 9) {
    level++;
    leveled = true;
    setTimeout(() => {
      frog.x = canvas.width / 2 - 75;
      frog.y = canvas.height - 150;
      leveled = false;
    }, 500);
    if (level == 6) {
      alert("You Won! Congratulations!");
      location.reload();
    }
    levelDOM.innerText = level;
  }
}

const frog = {
  x: canvas.width / 2 - 75,
  y: canvas.height - 150,
  width: 150,
  height: 150,
};

// Modify details to drawCar1
// const carImage1 = new Image();
// carImage1.src = "car1.png";
function drawCar(car) {
  car.x += car.speed;
  ctx.drawImage(car.carImage, car.x, car.y, car.width, car.height);
}

// const carImage2 = new Image();
// carImage2.src = "car2.png";
// function drawCar2(car) {
//   car.x -= car.speed;
//   ctx.drawImage(carImage2, car.x, car.y, car.width, car.height);
// }

function drawCars() {
  cars.forEach((car) => drawCar(car));
}

const cars = [];
// creates a new car every 1000 milliseconds
setInterval(function () {
  const carImage1 = new Image();
  carImage1.src = "car1.png";
  let start = canvas.height / 9;
  let laneHeight = canvas.height / 1.4 / 4;
  let first = Math.random() < 0.5;
  let lane;
  if (first) {
    lane = start + laneHeight * 0 + laneHeight / 2 - 25;
  } else {
    lane = start + laneHeight * 2 + laneHeight / 2 - 25;
  }
  cars.push({
    carImage: carImage1,
    x: 0,
    y: lane, // y: start + laneHeight * Math.floor(Math.random() * 4) + laneHeight / 2 - 25,
    width: 50,
    height: 50,
    speed: 1 + 1.5 * level,
  });
}, 2000);

setInterval(function () {
  const carImage2 = new Image();
  carImage2.src = "car2.png";
  let start = canvas.height / 9;
  let laneHeight = canvas.height / 1.4 / 4;
  let first = Math.random() < 0.5;
  let lane;
  if (first) {
    lane = start + laneHeight * 1 + laneHeight / 2 - 25;
  } else {
    lane = start + laneHeight * 3 + laneHeight / 2 - 25;
  }
  cars.push({
    carImage: carImage2,
    x: canvas.width + 100,
    y: lane, // y: start + laneHeight * Math.floor(Math.random() * 4) + laneHeight / 2 - 25,
    width: 50,
    height: 50,
    speed: (1 + 1.5 * level) * -1,
  });
}, 2000);

function drawHighway() {
  ctx.fillStyle = "#3a4049";
  ctx.fillRect(0, canvas.height / 9, canvas.width, canvas.height / 1.4);
}

function drawPond() {
  ctx.fillStyle = "#add8e6";
  ctx.fillRect(0, 0, canvas.width, canvas.height / 4);
}

function drawLanes() {
  let start = canvas.height / 9;
  let laneHight = canvas.height / 1.4 / 4;
  ctx.fillStyle = "#FFF";
  for (let i = 1; i < 4; i++) {
    for (let j = 0; j < 15; j++) {
      ctx.fillRect(
        j * (canvas.width / 15) + j * 15 + (i % 2) * 15,
        start + laneHight * i,
        canvas.width / 15,
        5
      );
    }
  }
}

function drawGrass() {
  ctx.fillStyle = "#50C878";
  ctx.fillRect(0, 560, canvas.width, canvas.height / 4);
}

document.body.onkeydown = function (event) {
  console.log(event.key);

  switch (event.key) {
    case "ArrowLeft":
      frog.x -= 40;
      break;

    case "ArrowRight":
      frog.x += 40;
      break;

    case "ArrowUp":
      frog.y -= 40;
      break;

    case "ArrowDown":
      frog.y += 40;
      break;
  }
};

function collisionDetection() {
  cars.forEach((car) => {
    if (
      frog.x <= car.x + car.width - 35 && // collision of frog if hit on left side
      frog.x + frog.width >= car.x + 50 && // collision of frog if hit on right side
      frog.y <= car.y + car.height - 60 && // collision of frog if hit on top side
      frog.y + frog.height >= car.y - 30 // collision of frog if hit on bottom side
    ) {
      frog.x = canvas.width / 2 - 75;
      frog.y = canvas.height - 150;
      lives--;
      if (lives == 0) {
        alert("Game Over! Try Again!");
        location.reload();
      }
      livesDOM.innerText = lives;
    }
  });
}

function animate() {
  window.requestAnimationFrame(animate);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawPond();
  drawHighway();
  drawLanes();
  drawGrass();
  drawFrog();
  drawCars();
  if (!leveled) passLevel();
  collisionDetection();
}
