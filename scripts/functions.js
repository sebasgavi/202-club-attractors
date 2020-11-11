const CLIFFORD = (a, b, c, d, x, y) => ({
  x: Math.sin(a * y) + c * Math.cos(a * x),
  y: Math.sin(b * x) + d * Math.cos(b * y)
});

const DEJONG = (a, b, c, d, x, y) => ({
  x: Math.sin(a * y) - Math.cos(b * x),
  y: Math.sin(c * x) - Math.cos(d * y)
});

// const resolver = (a, b, c, d, x, y) => ('' + a + b + c + d + x + y);
// const CLIFFORD = _.memoize(_CLIFFORD, resolver);
// const DEJONG = _.memoize(_DEJONG, resolver);

const getRandomValues = () => {
  const r = () => Math.random() * 4 - 2;
  return { a: r(), b: r(), c: r(), d: r() };
}