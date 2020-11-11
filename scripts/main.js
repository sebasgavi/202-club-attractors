let attractorEquation = CLIFFORD;

const form = document.querySelector('form');

function init (values) {
  setValuesToForm(values || getRandomValues());
  render();
}

function render () {
  const { quantity, ratio, alpha, ...values } = getValuesFromForm(form);
  const { points, minMax } = getAttractorPoints(values, quantity, ratio);
  updateShader(points, alpha);
  positionMesh(minMax);
}

form.random.addEventListener('click', () => init());
form.addEventListener('input', render);
window.addEventListener('resize', render);

init();

/* init({
  a: -1.026870711035163,
  b: -1.2525820670885945,
  c: -1.9620089158704292,
  d: 1.0269860848926875,
}); */

// localStorage
const lsValuesSavedKey = '--attractors--values--saved';
const lsValuesSaved = localStorage.getItem(lsValuesSavedKey);
console.log(lsValuesSaved)
if(lsValuesSaved) init(JSON.parse(lsValuesSaved));
form.save.addEventListener('click', () => {
  localStorage.setItem(lsValuesSavedKey, JSON.stringify(getValuesFromForm(form)));
});