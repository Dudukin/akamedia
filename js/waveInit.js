
var canvas    = document.getElementById('canvas1'),
    ctx       = canvas.getContext('2d'),
    perlin    = new ClassicalNoise(),
    variation = .0025,
    amp       = 300,
    variators = [],
    max_lines = (navigator.userAgent.toLowerCase().indexOf('firefox') > -1) ? 25 : 40,
    canvasWidth,
    canvasHeight,
    start_y;

for (var i = 0, u = 0; i < max_lines; i++, u+=.02) {
  variators[i] = u;
}

function draw(){
  ctx.shadowColor = "rgba(43, 205, 255, 1)";
  ctx.shadowBlur = 0;
  
  for (var i = 0; i <= max_lines; i++){
    ctx.beginPath();
    ctx.moveTo(0, start_y);
    for (var x = 0; x <= canvasWidth; x++) {
      var y = perlin.noise(x*variation+variators[i], x*variation, 0);
      ctx.lineTo(x, start_y + amp*y);
    }
    var color = Math.floor(150*Math.abs(y));
    var alpha = Math.min(Math.abs(y)+0.05, .05);
    ctx.strokeStyle = "rgba(255,255,255,"+alpha+")";
    ctx.stroke();
    ctx.closePath();

    variators[i] += .005;
  }
}

(function init() {
  resizeCanvas();
  animate();
  window.addEventListener('resize', resizeCanvas);
})();

function animate() {
  ctx.clearRect(0, 0, canvasWidth, canvasHeight);
  draw();
  requestAnimationFrame(animate);
}

function resizeCanvas(){
  canvasWidth = document.documentElement.clientWidth,
  canvasHeight = document.documentElement.clientHeight; 

  canvas.setAttribute("width", canvasWidth);
  canvas.setAttribute("height", canvasHeight);

  start_y = canvasHeight/2;
}

var canvas1    = document.getElementById('canvas2'),
    ctx1       = canvas1.getContext('2d'),
    perlin1    = new ClassicalNoise(),
    variation1 = .0025,
    amp1       = 300,
    variators1 = [],
    max_lines1 = (navigator.userAgent.toLowerCase().indexOf('firefox') > -1) ? 25 : 40,
    canvasWidth1,
    canvasHeight1,
    start_y1;

for (var i = 0, u = 0; i < max_lines1; i++, u+=.02) {
  variators1[i] = u;
}

function draw1(){
  ctx1.shadowColor = "rgba(43, 205, 255, 1)";
  ctx1.shadowBlur = 0;
  
  for (var i = 0; i <= max_lines1; i++){
    ctx1.beginPath();
    ctx1.moveTo(0, start_y1);
    for (var x = 0; x <= canvasWidth1; x++) {
      var y = perlin1.noise(x*variation1+variators1[i], x*variation1, 0);
      ctx1.lineTo(x, start_y1 + amp1*y);
    }
    var color = Math.floor(150*Math.abs(y));
    var alpha = Math.min(Math.abs(y)+0.05, .05);
    ctx1.strokeStyle = "rgba(255,255,255,"+alpha+")";
    ctx1.stroke();
    ctx1.closePath();

    variators1[i] += .005;
  }
}

(function init() {
  resizeCanvas1();
  animate1();
  window.addEventListener('resize', resizeCanvas1);
})();

function animate1() {
  ctx1.clearRect(0, 0, canvasWidth1, canvasHeight1);
  draw1();
  requestAnimationFrame(animate1);
}

function resizeCanvas1(){
  canvasWidth1 = document.documentElement.clientWidth,
  canvasHeight1 = document.documentElement.clientHeight; 

  canvas1.setAttribute("width", canvasWidth1);
  canvas1.setAttribute("height", canvasHeight1);

  start_y1 = canvasHeight1/2;
}


var canvas2    = document.getElementById('canvas3'),
    ctx2       = canvas2.getContext('2d'),
    perlin2    = new ClassicalNoise(),
    variation2 = .0025,
    amp2       = 300,
    variators2 = [],
    max_lines2 = (navigator.userAgent.toLowerCase().indexOf('firefox') > -1) ? 25 : 40,
    canvasWidth2,
    canvasHeight2,
    start_y2;

for (var i = 0, u = 0; i < max_lines2; i++, u+=.02) {
  variators2[i] = u;
}

function draw2(){
  ctx2.shadowColor = "rgba(43, 205, 255, 1)";
  ctx2.shadowBlur = 0;
  
  for (var i = 0; i <= max_lines2; i++){
    ctx2.beginPath();
    ctx2.moveTo(0, start_y2);
    for (var x = 0; x <= canvasWidth2; x++) {
      var y = perlin2.noise(x*variation2+variators2[i], x*variation2, 0);
      ctx2.lineTo(x, start_y2 + amp2*y);
    }
    var color = Math.floor(150*Math.abs(y));
    var alpha = Math.min(Math.abs(y)+0.05, .05);
    ctx2.strokeStyle = "rgba(255,255,255,"+alpha+")";
    ctx2.stroke();
    ctx2.closePath();

    variators2[i] += .005;
  }
}

(function init() {
  resizeCanvas2();
  animate2();
  window.addEventListener('resize', resizeCanvas2);
})();

function animate2() {
  ctx2.clearRect(0, 0, canvasWidth2, canvasHeight2);
  draw2();
  requestAnimationFrame(animate2);
}

function resizeCanvas2(){
  canvasWidth2 = document.documentElement.clientWidth,
  canvasHeight2 = document.documentElement.clientHeight; 

  canvas2.setAttribute("width", canvasWidth2);
  canvas2.setAttribute("height", canvasHeight2);

  start_y2 = canvasHeight2/2;
}