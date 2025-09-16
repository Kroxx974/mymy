const canvas = document.getElementById("overlayCanvas");
const ctx = canvas.getContext("2d");

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    draw();
}
function interpolateColor(c1, c2, t) {
  function hexToRgb(hex) {
    let n = parseInt(hex.slice(1), 16);
    return [n >> 16 & 255, n >> 8 & 255, n & 255];
  }
  let [r1,g1,b1,a1] = hexToRgb(c1);
  let [r2,g2,b2,a2] = hexToRgb(c2);
  let r = Math.round(r1 + (r2 - r1) * t);
  let g = Math.round(g1 + (g2 - g1) * t);
  let b = Math.round(b1 + (b2 - b1) * t);
  let a = Math.round(a1 + (a2 - a1) * t);
  return `rgb(${r},${g},${b},${a})`;
}
function makeLogGradient(cx, cy, r) {
  const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, r);

  const stops = 50; // plus il y en a, plus c’est fluide
  for (let i = 0; i <= stops; i++) {
    // progress linéaire entre 0 et 1
    let t = i / stops;

    // appliquer une loi logarithmique :
    // log(1 + 9t) / log(10) → compresse les valeurs vers 0
    let logT = Math.log(1 + 1 * t) / Math.log(2);

    grad.addColorStop(logT, `rgb(0,0,0,${t})`);
  }

  return grad;
}

window.addEventListener("resize", resizeCanvas);
resizeCanvas();

// Exemple : cercle semi-transparent
function draw() {
    let RAYON = 200
  // 1) remplir tout avec une couleur semi-transparente
  ctx.save();
  ctx.fillStyle = 'rgba(0,0,0,1)'; // overlay semi-transparent
  ctx.fillRect(0,0,canvas.width,canvas.height);

  // 2) passer en mode "destination-out" et dessiner le cercle pour effacer
  ctx.globalCompositeOperation = 'destination-out';
  ctx.beginPath();
  ctx.arc(mouse.absolute_x, mouse.absolute_y, RAYON*0.88, 0, Math.PI * 2);
  ctx.fill();

  // 3) remettre le composite par défaut
  ctx.globalCompositeOperation = 'source-over';
  ctx.restore();
  gradient = makeLogGradient(mouse.absolute_x, mouse.absolute_y,RAYON) 
 
  ctx.fillStyle = gradient;
  ctx.fill();
}
//  ██████   █████  ███    ███ ███████     ██       ██████   ██████  ██████  
// ██       ██   ██ ████  ████ ██          ██      ██    ██ ██    ██ ██   ██ 
// ██   ███ ███████ ██ ████ ██ █████       ██      ██    ██ ██    ██ ██████  
// ██    ██ ██   ██ ██  ██  ██ ██          ██      ██    ██ ██    ██ ██      
//  ██████  ██   ██ ██      ██ ███████     ███████  ██████   ██████  ██      
                                                                          
// Boucle de jeu
let lastTime = 0;
function gameLoop(timestamp) {
    const dt = (timestamp - lastTime) * 0.001;
    lastTime = timestamp;
    draw();
    requestAnimationFrame(gameLoop);
}
requestAnimationFrame(gameLoop);
