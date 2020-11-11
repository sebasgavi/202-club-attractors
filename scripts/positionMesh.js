// le aplicamos algunas tranformaciones al mesh
const positionMesh = ({ min, max }) => {
  const padding = 50;
  const canvasSize = { x: window.innerWidth - form.clientWidth - padding*2, y: window.innerHeight - padding*2 };
  const shapeSize = { x: max.x - min.x, y: max.y - min.y };
  const scaleMult = { x: canvasSize.x / shapeSize.x, y: canvasSize.y / shapeSize.y };
  const canvasRatio = canvasSize.x / canvasSize.y;
  const shapeRatio = shapeSize.x / shapeSize.y;
  const isWide = shapeRatio > canvasRatio;
  const scale = isWide ? scaleMult.x : scaleMult.y;
  mesh.scale.x = scale;
  mesh.scale.y = scale;
  mesh.position.x = (min.x * scale) * -1;
  mesh.position.y = (min.y * scale) * -1;
  positionHelper(isWide ? 'x' : 'y', padding, canvasSize, shapeSize, scale);
}

const positionHelper = (axis, padding, canvasSize, shapeSize, scale) => {
  const otherAxis = axis === 'x' ? 'y' : 'x';
  mesh.position[axis] += padding;
  mesh.position[otherAxis] += (canvasSize[otherAxis] - shapeSize[otherAxis] * scale) / 2 + padding;
}