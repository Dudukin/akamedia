

if (document.body.classList.contains('index-page')) {
    console.log('11111')
    var sounds = {
        bg: new Audio(
            "https://projects.thibautfoussard.com/themountains/music/soundtrack.mp3"
        ),
        transition: new Audio(
            "https://projects.thibautfoussard.com/themountains/music/sonar2.mp3"
        )
    },
    lightPositionAmp = 8,
    cameraInteractionEnabled = false,
    initVerticesY = [],
    verticesShuffles = 0,
    mouse = {};

/*
  ============================================
  SRC : Scene - Renderer - Camera
  ============================================
*/

var scene = new THREE.Scene();
//scene.background = new THREE.Color( 0x000000, 1 );

var canvas = document.getElementById("canvas");
var renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true,
    antialias: true
});
renderer.setSize(window.innerWidth, window.innerHeight);
//renderer.setClearColor(0x000000, 1);

var camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    0.01,
    10000
);

camera.position.z = 3;
camera.position.x = 0;
camera.position.y = 1;
camera.rotation.set(0, 0, 0);
scene.add(camera);

/*
  ============================================
  Background color
  ============================================
*/

var gl = canvas.getContext("experimental-webgl");

/*
  ============================================
  Lights
  ============================================
*/
var light_1 = new THREE.PointLight(0xffffff, 10, 8, 2);
light_1.position.set(0, 0, 0);
scene.add(light_1);

var rimlight = new THREE.PointLight(0xffffff, 2, 100);
rimlight.position.set(7.6, 0, -2.4);
rimlight.visible = false;
scene.add(rimlight);

/*
  ============================================
  Objects
  ============================================
*/

var mesh;

function init() {
    canvasWidth = window.innerWidth;
    canvasHeight = window.innerHeight;

    camera.position.initY = 1;
    camera.position.initZ = 4;

    var loader = new THREE.JSONLoader();
    loader.load(
        "https://projects.thibautfoussard.com/themountains/old_1/json/plane_2.json",
        function(geometry, materials) {
            var material = new THREE.MeshPhongMaterial({
                color: 0x1a1a1a,
                reflectivity: 1,
                transparent: true,
                opacity: 1,
                side: THREE.DoubleSide,
                shininess: 100,
                specular: 0x333333,
                shading: THREE.FlatShading
            });
            mesh = new THREE.Mesh(geometry, material);
            mesh.position.x = 0;
            mesh.position.y = 0;
            mesh.position.z = 0;
            scene.add(mesh);

            mesh.geometry.vertices.forEach(function(vertex) {
                initVerticesY.push(vertex.y);
            });
            document.getElementById("wrapper").style.opacity = 1;

            animate();
            document.getElementById("controls").style.display = "block";
            intro();
        }
    );
}

function animate() {
    mesh.geometry.verticesNeedUpdate = true;

    requestAnimationFrame(animate);

    camera.lookAt(scene.position);
    renderer.render(scene, camera);
}

function intro() {
    anime({
        targets: [light_1.position, camera.position],
        z: 6.5,
        easing: "easeInOutQuart",
        duration: 3000
    });

    setTimeout(function() {
        anime({
            targets: ["#note"],
            opacity: 1,
            easing: "easeInQuart",
            duration: 2000
        });
        cameraInteractionEnabled = true;
    }, 2000);
}

function shuffleLight() {
    anime({
        targets: [light_1.color],
        r: 0.1 + Math.random(),
        g: 0.1 + Math.random(),
        b: 0.1 + Math.random(),
        easing: "easeInOutQuart",
        duration: 1000
    });

    anime({
        targets: [rimlight.color],
        r: 0.1 + Math.random(),
        g: 0.1 + Math.random(),
        b: 0.1 + Math.random(),
        easing: "easeInOutQuart",
        duration: 1000
    });

    anime({
        targets: light_1.position,
        y: Math.random(),
        easing: "easeInOutQuart",
        duration: 1000
    });

    anime({
        targets: light_1.intensity,
        intensity: Math.max(Math.random() * 20, 2),
        easing: "easeInOutQuart",
        duration: 1000
    });
}

function shuffleVertices() {
    if (MathAnimations.animation === null)
        updateFOV(Math.floor(Math.random() * 60) + 30);

    verticesShuffles++;
    if (verticesShuffles >= 8) {
        verticesShuffles = 0;
        reset();
        return;
    }
    var randX = 0.1 + Math.random(),
        randY = 0.1 + Math.random(),
        randZ = 0.1 + Math.random(),
        randXYZ = 0.5 + Math.random(),
        heightFactor = 1 + Math.random();

    mesh.geometry.vertices.forEach(function(vertex) {
        var newY =
            perlin(
                vertex.x * randX * randXYZ,
                vertex.y * randY * randXYZ,
                vertex.z * randZ * randXYZ
            ) * heightFactor;
        anime({
            targets: vertex,
            y: newY,
            easing: "easeInOutQuart",
            duration: 2000
        });
    });
}

var MathAnimations = {
    animation: null,
    i: 0,
    animate: function(newAnimation) {
        MathAnimations.animation = newAnimation;
        MathAnimations.i = 0;
        newAnimation();
    },
    sinX: function() {
        if (MathAnimations.animation == MathAnimations.sinX)
            requestAnimationFrame(MathAnimations.animation);
        mesh.geometry.vertices.forEach(function(vertex) {
            var newY = vertex.y + Math.sin(MathAnimations.i / 100 + vertex.x) / 100;
            vertex.y = newY;
        });
        MathAnimations.i++;
    },
    sinZ: function() {
        if (MathAnimations.animation == MathAnimations.sinZ)
            requestAnimationFrame(MathAnimations.animation);
        mesh.geometry.vertices.forEach(function(vertex) {
            var newY = vertex.y + Math.sin(MathAnimations.i / 100 + vertex.z) / 100;
            vertex.y = newY;
        });
        MathAnimations.i++;
    },
    sinXZ: function() {
        if (MathAnimations.animation == MathAnimations.sinXZ)
            requestAnimationFrame(MathAnimations.animation);
        mesh.geometry.vertices.forEach(function(vertex) {
            var newY = Math.sin(MathAnimations.i / 100 + vertex.x * vertex.z) / 3;
            vertex.y = newY;
        });
        MathAnimations.i++;
    }
};

function reset() {
    rimlight.visible = false;
    moveCameraY(1);
    updateFOV(45);
    MathAnimations.animation = null;
    var i = 0;
    mesh.geometry.vertices.forEach(function(vertex) {
        var newY = initVerticesY[i];
        anime({
            targets: vertex,
            y: newY,
            easing: "easeInOutQuart",
            duration: 2000
        });
        i++;
    });
}

(function animateRimLight() {
    anime({
        targets: rimlight,
        intensity: 0.2,
        easing: "easeInOutQuart",
        duration: 4000
    });
    setTimeout(function() {
        anime({
            targets: rimlight,
            intensity: 3,
            easing: "easeInOutQuart",
            duration: 4000
        });
        setTimeout(animateRimLight, 4000);
    }, 4000);
})();

function updateFOV(fov) {
    var fovAnimation = anime({
        targets: camera,
        fov: fov,
        easing: "easeInOutQuart",
        duration: 2000
    });
    fovAnimation.update = function() {
        camera.updateProjectionMatrix();
    };
}

function moveCameraY(y) {
    cameraInteractionEnabled = false;
    var cameraAnimation = anime({
        targets: camera.position,
        y: y,
        easing: "easeInOutQuart",
        duration: 2000
    });
    cameraAnimation.complete = function() {
        cameraInteractionEnabled = true;
        camera.position.initY = y;
    };
}
    window.addEventListener("load", init);

    window.addEventListener("mousemove", function(event) {
        if (!cameraInteractionEnabled) return;
        mouse.x = event.clientX;
        mouse.y = event.clientY;
        light_1.position.x = (mouse.x / canvas.width * 2 - 1) * lightPositionAmp;
        light_1.position.z =
            camera.position.initZ +
            (mouse.y / canvas.height * 2 - 1) * lightPositionAmp;
        camera.position.y =
            camera.position.initY + (mouse.y / canvas.height * 2 - 1) / 10;
        camera.position.x = (mouse.x / canvas.width * 2 - 1) / 10;
    });

    (function initMain() {
        let typed = new Typed("#typed", {
            strings: ['First ^1000 sentence.', 'Our passion is for great innovative content and digital solutions for the new age'],
            typeSpeed: 50,
            backSpeed: 0,
            backDelay: 500,
            startDelay: 3000,
            loop: false,
        });

        let header = document.querySelectorAll('.header')[0];
        let screenBtns = document.querySelectorAll('.screen__btns_wrapper')[0];

        if (header && screenBtns) {
            setTimeout(() => {
                header.classList.remove('header__opacity');
                screenBtns.classList.remove('screen__btns_opacity');
            }, 10000)
        }
    })();

} else if (document.body.classList.contains('page-about')) {
// Ported from Stefan Gustavson's java implementation
// http://staffwww.itn.liu.se/~stegu/simplexnoise/simplexnoise.pdf
// Read Stefan's excellent paper for details on how this code works.
//
// Sean McCullough banksean@gmail.com

/**
 * You can pass in a random number generator object if you like.
 * It is assumed to have a random() method.
 */
var ClassicalNoise = function(r) { // Classic Perlin noise in 3D, for comparison 
  if (r == undefined) r = Math;
  this.grad3 = [[1,1,0],[-1,1,0],[1,-1,0],[-1,-1,0], 
                                 [1,0,1],[-1,0,1],[1,0,-1],[-1,0,-1], 
                                 [0,1,1],[0,-1,1],[0,1,-1],[0,-1,-1]]; 
  this.p = [];
  for (var i=0; i<256; i++) {
    this.p[i] = Math.floor(r.random()*256);
  }
  // To remove the need for index wrapping, double the permutation table length 
  this.perm = []; 
  for(var i=0; i<512; i++) {
    this.perm[i]=this.p[i & 255];
  }
};

ClassicalNoise.prototype.dot = function(g, x, y, z) { 
    return g[0]*x + g[1]*y + g[2]*z; 
};

ClassicalNoise.prototype.mix = function(a, b, t) { 
    return (1.0-t)*a + t*b; 
};

ClassicalNoise.prototype.fade = function(t) { 
    return t*t*t*(t*(t*6.0-15.0)+10.0); 
};

  // Classic Perlin noise, 3D version 
ClassicalNoise.prototype.noise = function(x, y, z) { 
  // Find unit grid cell containing point 
  var X = Math.floor(x); 
  var Y = Math.floor(y); 
  var Z = Math.floor(z); 
  
  // Get relative xyz coordinates of point within that cell 
  x = x - X; 
  y = y - Y; 
  z = z - Z; 
  
  // Wrap the integer cells at 255 (smaller integer period can be introduced here) 
  X = X & 255; 
  Y = Y & 255; 
  Z = Z & 255;
  
  // Calculate a set of eight hashed gradient indices 
  var gi000 = this.perm[X+this.perm[Y+this.perm[Z]]] % 12; 
  var gi001 = this.perm[X+this.perm[Y+this.perm[Z+1]]] % 12; 
  var gi010 = this.perm[X+this.perm[Y+1+this.perm[Z]]] % 12; 
  var gi011 = this.perm[X+this.perm[Y+1+this.perm[Z+1]]] % 12; 
  var gi100 = this.perm[X+1+this.perm[Y+this.perm[Z]]] % 12; 
  var gi101 = this.perm[X+1+this.perm[Y+this.perm[Z+1]]] % 12; 
  var gi110 = this.perm[X+1+this.perm[Y+1+this.perm[Z]]] % 12; 
  var gi111 = this.perm[X+1+this.perm[Y+1+this.perm[Z+1]]] % 12; 
  
  // The gradients of each corner are now: 
  // g000 = grad3[gi000]; 
  // g001 = grad3[gi001]; 
  // g010 = grad3[gi010]; 
  // g011 = grad3[gi011]; 
  // g100 = grad3[gi100]; 
  // g101 = grad3[gi101]; 
  // g110 = grad3[gi110]; 
  // g111 = grad3[gi111]; 
  // Calculate noise contributions from each of the eight corners 
  var n000= this.dot(this.grad3[gi000], x, y, z); 
  var n100= this.dot(this.grad3[gi100], x-1, y, z); 
  var n010= this.dot(this.grad3[gi010], x, y-1, z); 
  var n110= this.dot(this.grad3[gi110], x-1, y-1, z); 
  var n001= this.dot(this.grad3[gi001], x, y, z-1); 
  var n101= this.dot(this.grad3[gi101], x-1, y, z-1); 
  var n011= this.dot(this.grad3[gi011], x, y-1, z-1); 
  var n111= this.dot(this.grad3[gi111], x-1, y-1, z-1); 
  // Compute the fade curve value for each of x, y, z 
  var u = this.fade(x); 
  var v = this.fade(y); 
  var w = this.fade(z); 
   // Interpolate along x the contributions from each of the corners 
  var nx00 = this.mix(n000, n100, u); 
  var nx01 = this.mix(n001, n101, u); 
  var nx10 = this.mix(n010, n110, u); 
  var nx11 = this.mix(n011, n111, u); 
  // Interpolate the four results along y 
  var nxy0 = this.mix(nx00, nx10, v); 
  var nxy1 = this.mix(nx01, nx11, v); 
  // Interpolate the two last results along z 
  var nxyz = this.mix(nxy0, nxy1, w); 

  return nxyz; 
};



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

}

(function burger() {
    let burgerBtn = document.querySelectorAll('.header__menu_btn')[0];
    let menu = document.querySelectorAll('input.burger__menu_toggle')[0];
    let closeBtn = document.querySelectorAll('.burger__menu_close')[0];

    if (burgerBtn && menu && closeBtn) {
      burgerBtn.addEventListener('click', () => {
          menu.checked = true;
      });

      closeBtn.addEventListener('click', () => {
          menu.checked = false;
      });
    }


})();

(function scrollTop() {


  window.onscroll = function() {
    let toTop = document.getElementById('gotop');
    if (window.pageYOffset > 100) {
      toTop.classList.add('gotop__visible');
    } else {
      toTop.classList.remove('gotop__visible');
    }
  };


    let toTop = document.getElementById('gotop');

    if (toTop) {
      toTop.addEventListener('click', function() {
        window.scrollTo({top: 0, behavior: 'smooth'});
      })
    }

})();




