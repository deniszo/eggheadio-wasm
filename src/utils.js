function fetchAndInstantiateWasm(url, imports = {}) {
	return fetchAndCompileWasm(url)
		.then(module => WebAssembly.instantiate(module, imports))
		.then(instance => instance.exports);
}

function getWasm(fileName) {
	return `/wasm/${fileName}.wasm`;
}

function fetchAndCompileWasm(url) {
	return fetch(url)
		.then(res => {
			if (res.ok) return res.arrayBuffer();
			throw new Error('Unable to fetch WASM.');
		})
		.then(WebAssembly.compile);
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

export {
	fetchAndInstantiateWasm,
	fetchAndCompileWasm,
	getWasm,
	safeExecute,
	cGroup,
};
