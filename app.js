(function init(w) {
	testWasm();
	cCompiled();
	callJsFnFromWasm();
})(window);

function testWasm() {
	fetchAndInstantiateWasm(getWasm('test')).then(({ sqrt }) => {
		cGroup('testWasm', () => {
			console.log('wasmSqrt(25) ->', sqrt(25));
		});
	});
}

function cCompiled() {
	fetchAndInstantiateWasm(getWasm('c_compiled')).then(({ getSqrt }) => {
		cGroup('cCompiled', () => {
			console.log('getSqrt(25) ->', getSqrt(25));
		});
	});
}

function callJsFnFromWasm() {
	fetchAndInstantiateWasm(getWasm('call_js_fn_from_wasm'), {
		env: {
			consoleLog: num => console.log(num),
		},
	}).then(({ getSqrt }) => {
		cGroup('callJsFnFromWasm', () => {
			console.log(getSqrt(5));
		});
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

function safeExecute(fn, errorMessage) {
	try {
		fn();
	} catch (e) {
		console.error(errorMessage);
		console.log(e);
	}
}

function cGroup(groupName, fn) {
	console.group(groupName);
	safeExecute(fn, `${groupName} failed executing, due to the following error:`);
	console.groupEnd();
}
