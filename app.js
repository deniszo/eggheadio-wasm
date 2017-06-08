(function init(w) {
	testWasm(w);
})(window);

function testWasm(window) {
	fetchAndInstantiateWasm('./test.wasm').then(storeSqrtRef);

	function storeSqrtRef({ sqrt }) {
		window.wasmSqrt = sqrt;
	}
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
