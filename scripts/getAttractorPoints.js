const getAttractorPoints = (values, attractorPoints, ratio) => {
  let x = 0;
  let y = 0;

  const { a, b, c, d } = values;

  const points = new Array(attractorPoints * 2);
  let minMax = {
    min: { x: null, y: null },
    max: { x: null, y: null },
  };

  for (let i = 0; i < attractorPoints; i++) {
    const next = attractorEquation(a, b, c, d, x, y);
    x = next.x;
    y = next.y;
    const xMod = x * (1 + ratio);
    const yMod = y;
    if(xMod < minMax.min.x || minMax.min.x === null) minMax.min.x = xMod;
    if(xMod > minMax.max.x || minMax.max.x === null) minMax.max.x = xMod;
    if(yMod < minMax.min.y || minMax.min.y === null) minMax.min.y = yMod;
    if(yMod > minMax.max.y || minMax.max.y === null) minMax.max.y = yMod;
    points.push(xMod);
    points.push(yMod);
  }

  return { points, minMax };
}