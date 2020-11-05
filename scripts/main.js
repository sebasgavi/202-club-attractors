// creando la app base de Pixi
const app = new PIXI.Application({
  width: window.innerWidth, height: window.innerHeight, backgroundColor: 0,
});

// agregar canvas al body
document.body.appendChild(app.view);

// cuántos puntos queremos crear
let quantity = 100000;

// coordenadas iniciales
let x = 0;
let y = 0;

// attractors
let a = Math.random() * 4 - 2;
let b = Math.random() * 4 - 2;
let c = Math.random() * 4 - 2;
let d = Math.random() * 4 - 2;

// a = -1.026870711035163;
// b = -1.2525820670885945;
// c = -1.9620089158704292;
// d = 1.0269860848926875;

// a = 1.9308497170974048;
// b = -1.3369783808997528;
// c = 1.079082528028275;
// d = -1.39798222128411;

// con los 4 números, calcule la posición de los puntos
const getPath = (a, b, c, d, end = quantity) => {
  // las variables x y y deben volver a 0
  x = 0;
  y = 0;
  // arreglo para guardar posiciones
  let path = [];
  // loop para crear los puntos
  for (let i = 0; i < end; i++) {
    // magia negra
    x = Math.sin(a * y) - Math.cos(b * x);
    y = Math.sin(c * x) - Math.cos(d * y);
    // agregamos las coordenadas al arreglo
    path.push(x);
    path.push(y);
  }
  // retorna el arreglo de posición
  return path;
}

// creamos el path inicial
const path = getPath(a, b, c, d);

console.log(a,b,c,d)

// se repite 60 veces por segundo, o lo más rápido que pueda
app.ticker.add(() => {
  return;
  // pedir el buffer de memoria en el que está guardada la información de los puntos
  const buffer = mesh.geometry.getBuffer('aVertexPosition');
  // modificamos alguno de los números
  d = d + 0.01;
  // creamos las nuevas coordenadas de los puntos
  const newPath = new Float32Array(getPath(a, b, c, d));
  // actualizamos el buffer con los nuevos puntos
  buffer.update(newPath);
});

// la forma en 3D en la que queda guardada la información de las coordenadas
const geometry = new PIXI.Geometry().addAttribute('aVertexPosition', path, 2);

// setear colores aleatorios
const colors = [];
for (let index = 0; index < quantity; index++) {
  colors.push(Math.random());
  colors.push(Math.random());
  colors.push(Math.random());
}
geometry.addAttribute('aVertexColors', colors, 3);

// vertex shader
// es el encargado de decirle a la GPU las posiciones de los puntos
const vertexSrc = `
precision mediump float;

attribute vec2 aVertexPosition;

uniform mat3 translationMatrix;
uniform mat3 projectionMatrix;

varying vec3 vTextureCoord;
attribute vec3 aVertexColors;

void main() {
  gl_PointSize = 1.0;
  gl_Position = vec4((projectionMatrix * translationMatrix * vec3(aVertexPosition, 1.0)).xy, .0, 1.0);
  vTextureCoord = aVertexColors;
}`;

// fragment shader
// es el encargado de decirle a la GPU de qué color pintar cada pixel
const fragmentSrc = `
precision mediump float;

varying vec3 vTextureCoord;

void main() {
  gl_FragColor = vec4(1.0);
}`;

// compilamos el shader
const shader = PIXI.Shader.from(vertexSrc, fragmentSrc, null);
// le aplicamos el shader a la geometría
const mesh = new PIXI.Mesh(geometry, shader);
// le decimos a la geometría que solo dibuje los puntos
mesh.drawMode = PIXI.DRAW_MODES.POINTS;

// le aplicamos algunas tranformaciones al mesh
mesh.scale.x = 200;
mesh.scale.y = 200;
mesh.position.x = 500;
mesh.position.y = 500;

// agregamos el mesh al stage
app.stage.addChild(mesh);



const form = document.querySelector('form');

function init () {
  a = Math.random() * 4 - 2;
  b = Math.random() * 4 - 2;
  c = Math.random() * 4 - 2;
  d = Math.random() * 4 - 2;
  form.a.value = a;
  form.b.value = b;
  form.c.value = c;
  form.d.value = d;
  render();
}

function render () {
  const a = form.a.value;
  const b = form.b.value;
  const c = form.c.value;
  const d = form.d.value;

  const buffer = mesh.geometry.getBuffer('aVertexPosition');
  const newPath = new Float32Array(getPath(a, b, c, d));
  buffer.update(newPath);
}

form.btn.addEventListener('click', init);
form.addEventListener('input', render);

init();