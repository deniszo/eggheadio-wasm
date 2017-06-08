(function init(w) {
	testWasm(w);
	cCompiled(w);
})(window);

function testWasm(window) {
	fetchAndInstantiateWasm(getWasm('test')).then(exports => {
		window.wasmSqrt = exports.sqrt;
	});
}

function cCompiled(window) {
	fetchAndInstantiateWasm(getWasm('c_compiled')).then(exports => {
		window.getSqrt = exports.getSqrt;
	});
}

function fetchAndInstantiateWasm(url, imports = {}) {
	return fetch(url)
		.then(res => {
			if (res.ok) return res.arrayBuffer();
			throw new Error('Unable to fetch WASM.');
		})
		.then(WebAssembly.compile)
		.then(module => WebAssembly.instantiate(module, imports))
		.then(instance => instance.exports);
}

function getWasm(fileName) {
	return `./wasm/${fileName}.wasm`;
}
