fetch('./test.wasm')
  .then(res => {
    if (res.ok) return res.arrayBuffer();
    throw new Error('Unable to fetch WASM.');
  })
  .then(WebAssembly.compile)
  .then(WebAssembly.instantiate)
  .then(instance => {
    window.wasmSqrt = instance.exports.sqrt;
  });