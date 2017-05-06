/**
 * Created by gd on 2017/5/5.
 * 摘录自网络
 */


/*交点线*/
/*export default function () {
  var canvas = document.getElementById("space");
  var ctx = canvas.getContext("2d");
  var cw = canvas.width = window.innerWidth,
    cx = cw / 2;
  var ch = canvas.height = window.innerHeight,
    cy = ch / 2;

  ctx.fillStyle = "#000";
  var linesNum = 16;
  var linesRy = [];
  var requestId = null;

  function Line(flag) {
    this.flag = flag;
    this.a = {};
    this.b = {};
    if (flag == "v") {
      this.a.y = 0;
      this.b.y = ch;
      this.a.x = randomIntFromInterval(0, ch);
      this.b.x = randomIntFromInterval(0, ch);
    } else if (flag == "h") {
      this.a.x = 0;
      this.b.x = cw;
      this.a.y = randomIntFromInterval(0, cw);
      this.b.y = randomIntFromInterval(0, cw);
    }
    this.va = randomIntFromInterval(25, 100) / 100;
    this.vb = randomIntFromInterval(25, 100) / 100;

    this.draw = function () {
      ctx.strokeStyle = "#ccc";
      ctx.beginPath();
      ctx.moveTo(this.a.x, this.a.y);
      ctx.lineTo(this.b.x, this.b.y);
      ctx.stroke();
    }

    this.update = function () {
      if (this.flag == "v") {
        this.a.x += this.va;
        this.b.x += this.vb;
      } else if (flag == "h") {
        this.a.y += this.va;
        this.b.y += this.vb;
      }

      this.edges();
    }

    this.edges = function () {
      if (this.flag == "v") {
        if (this.a.x < 0 || this.a.x > cw) {
          this.va *= -1;
        }
        if (this.b.x < 0 || this.b.x > cw) {
          this.vb *= -1;
        }
      } else if (flag == "h") {
        if (this.a.y < 0 || this.a.y > ch) {
          this.va *= -1;
        }
        if (this.b.y < 0 || this.b.y > ch) {
          this.vb *= -1;
        }
      }
    }

  }

  for (var i = 0; i < linesNum; i++) {
    var flag = i % 2 == 0 ? "h" : "v";
    var l = new Line(flag);
    linesRy.push(l);
  }

  function Draw() {
    requestId = window.requestAnimationFrame(Draw);
    ctx.clearRect(0, 0, cw, ch);

    for (var i = 0; i < linesRy.length; i++) {
      var l = linesRy[i];
      l.draw();
      l.update();
    }
    for (var i = 0; i < linesRy.length; i++) {
      var l = linesRy[i];
      for (var j = i + 1; j < linesRy.length; j++) {
        var l1 = linesRy[j]
        Intersect2lines(l, l1);
      }
    }
  }

  function Init() {
    linesRy.length = 0;
    for (var i = 0; i < linesNum; i++) {
      var flag = i % 2 == 0 ? "h" : "v";
      var l = new Line(flag);
      linesRy.push(l);
    }

    if (requestId) {
      window.cancelAnimationFrame(requestId);
      requestId = null;
    }

    cw = canvas.width = window.innerWidth,
      cx = cw / 2;
    ch = canvas.height = window.innerHeight,
      cy = ch / 2;

    Draw();
  };

  setTimeout(function () {
    Init();

    addEventListener('resize', Init, false);
  }, 15);

  function Intersect2lines(l1, l2) {
    var p1 = l1.a,
      p2 = l1.b,
      p3 = l2.a,
      p4 = l2.b;
    var denominator = (p4.y - p3.y) * (p2.x - p1.x) - (p4.x - p3.x) * (p2.y - p1.y);
    var ua = ((p4.x - p3.x) * (p1.y - p3.y) - (p4.y - p3.y) * (p1.x - p3.x)) / denominator;
    var ub = ((p2.x - p1.x) * (p1.y - p3.y) - (p2.y - p1.y) * (p1.x - p3.x)) / denominator;
    var x = p1.x + ua * (p2.x - p1.x);
    var y = p1.y + ua * (p2.y - p1.y);
    if (ua > 0 && ub > 0) {
      markPoint({
        x: x,
        y: y
      })
    }
  }

  function markPoint(p) {
    ctx.beginPath();
    ctx.arc(p.x, p.y, 2, 0, 2 * Math.PI);
    ctx.fill();
  }

  function randomIntFromInterval(mn, mx) {
    return ~~(Math.random() * (mx - mn + 1) + mn);
  }
}*/


/*星空*/
export default function(){
  window.requestAnimFrame = (function(){   return  window.requestAnimationFrame})();
  var canvas = document.getElementById("space");
  var c = canvas.getContext("2d");

  var numStars = 1900;
  var radius = '0.'+Math.floor(Math.random() * 9) + 1  ;
  var focalLength = canvas.width *2;
  var warp = 0;
  var centerX, centerY;

  var stars = [], star;
  var i;

  var animate = true;

  initializeStars();

  function executeFrame(){

    if(animate)
      requestAnimFrame(executeFrame);
    moveStars();
    drawStars();
  }

  function initializeStars(){
    centerX = canvas.width / 2;
    centerY = canvas.height / 2;

    stars = [];
    for(i = 0; i < numStars; i++){
      star = {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        z: Math.random() * canvas.width,
        o: '0.'+Math.floor(Math.random() * 99) + 1
      };
      stars.push(star);
    }
  }

  function moveStars(){
    for(i = 0; i < numStars; i++){
      star = stars[i];
      star.z--;

      if(star.z <= 0){
        star.z = canvas.width;
      }
    }
  }

  function drawStars(){
    var pixelX, pixelY, pixelRadius;

    // Resize to the screen
    if(canvas.width != window.innerWidth || canvas.width != window.innerWidth){
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initializeStars();
    }
    if(warp==0)
    {c.fillStyle = "rgba(0,10,20,1)";
      c.fillRect(0,0, canvas.width, canvas.height);}
    c.fillStyle = "rgba(209, 255, 255, "+radius+")";
    for(i = 0; i < numStars; i++){
      star = stars[i];

      pixelX = (star.x - centerX) * (focalLength / star.z);
      pixelX += centerX;
      pixelY = (star.y - centerY) * (focalLength / star.z);
      pixelY += centerY;
      pixelRadius = 1 * (focalLength / star.z);

      c.fillRect(pixelX, pixelY, pixelRadius, pixelRadius);
      c.fillStyle = "rgba(209, 255, 255, "+star.o+")";
      //c.fill();
    }
  }


  executeFrame();
}
