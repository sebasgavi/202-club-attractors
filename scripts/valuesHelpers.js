const getValuesFromForm = (form) => ({
  a: parseFloat(form.a.value),
  b: parseFloat(form.b.value),
  c: parseFloat(form.c.value),
  d: parseFloat(form.d.value),
  quantity: parseInt(form.quantity.value),
  ratio: parseFloat(form.ratio.value),
  alpha: parseFloat(form.alpha.value),
});

const setValuesToForm = ({ a, b, c, d, quantity, ratio, alpha }) => {
  form.a.value = a;
  form.b.value = b;
  form.c.value = c;
  form.d.value = d;
  if(quantity) form.quantity.value = quantity;
  if(ratio) form.ratio.value = ratio;
  if(alpha) form.alpha.value = alpha;
}