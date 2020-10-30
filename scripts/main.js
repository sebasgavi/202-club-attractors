const app = new PIXI.Application({
  width: window.innerWidth, height: window.innerHeight, backgroundColor: 0,
});
document.body.appendChild(app.view);


let quantity = 10000;

let x = 0;
let y = 0;

let a = Math.random() * 4 - 2;
let b = Math.random() * 4 - 2;
let c = Math.random() * 4 - 2;
let d = Math.random() * 4 - 2;

//a = 1.054615436469314;
//b = -1.8967270448703388;
//c = -1.252268354929564;
//d = 0;

const getPath = (a, b, c, d) => {
  let path = [];
  for (let i = 0; i < quantity; i++) {
    x = Math.sin(a * y) - Math.cos(b * x);
    y = Math.sin(c * x) - Math.cos(d * y);
    path.push(x);
    path.push(y);
  }
  return path;
}

const path = getPath(a, b, c, d);

console.log(a,b,c,d)

app.ticker.add(() => {
  const buffer = mesh.geometry.getBuffer('aVertexPosition');
  d = d + 0.01;
  buffer.update(new Float32Array(getPath(a, b, c, d)));
});




const renderer = app.renderer;

const geometry = new PIXI.Geometry().addAttribute('aVertexPosition', path, 2);

window.addEventListener('click', () => {
  const buffer = mesh.geometry.getBuffer('aVertexPosition');
  d = d + 0.01;
  buffer.update(new Float32Array(getPath(a, b, c, d)));
});

const vertexSrc = `
precision mediump float;

attribute vec2 aVertexPosition;

uniform mat3 translationMatrix;
uniform mat3 projectionMatrix;

void main() {
  gl_PointSize = 2.0;
  gl_Position = vec4((projectionMatrix * translationMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);
}`;

const fragmentSrc = `
precision mediump float;

void main() {
  gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0);
}`;

const shader = PIXI.Shader.from(vertexSrc, fragmentSrc, null);
const mesh = new PIXI.Mesh(geometry, shader);
mesh.drawMode = PIXI.DRAW_MODES.POINTS;

mesh.scale.x = 200;
mesh.scale.y = 200;
mesh.position.x = 500;
mesh.position.y = 500;

app.stage.addChild(mesh);
