// creando la app base de Pixi
const app = new PIXI.Application({
  width: window.innerWidth, height: window.innerHeight, backgroundColor: 0xffffff,
});

// agregar canvas al body
document.body.appendChild(app.view);

// la forma en 3D en la que queda guardada la información de las coordenadas
const geometry = new PIXI.Geometry().addAttribute('aVertexPosition', [], 2);

// vertex shader
// es el encargado de decirle a la GPU las posiciones de los puntos
const vertexSrc = `
precision mediump float;
attribute vec2 aVertexPosition;
uniform mat3 translationMatrix;
uniform mat3 projectionMatrix;
void main() {
  gl_PointSize = 1.0;
  gl_Position = vec4((projectionMatrix * translationMatrix * vec3(aVertexPosition, 1.0)).xy, .0, 1.0);
}`;

// fragment shader
// es el encargado de decirle a la GPU de qué color pintar cada pixel
const fragmentSrc = `
precision mediump float;
uniform float colorAlpha;
void main() {
  gl_FragColor = vec4(vec3(0.0), colorAlpha);
}`;

// compilamos el shader
const shader = PIXI.Shader.from(vertexSrc, fragmentSrc, null);
// le aplicamos el shader a la geometría
const mesh = new PIXI.Mesh(geometry, shader);
// le decimos a la geometría que solo dibuje los puntos
mesh.drawMode = PIXI.DRAW_MODES.POINTS;

mesh.shader.uniforms.colorAlpha = 1;

const updateShader = (points, colorAlpha) => {
  const buffer = mesh.geometry.getBuffer('aVertexPosition');
  const newPath = new Float32Array(points);
  buffer.update(newPath);
  mesh.shader.uniforms.colorAlpha = colorAlpha;
}

// agregamos el mesh al stage
app.stage.addChild(mesh);
