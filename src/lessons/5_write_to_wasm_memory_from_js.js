import { fetchAndInstantiateWasm, getWasm, cGroup } from '../utils';

export default () => {
	let mem;

	fetchAndInstantiateWasm(getWasm('5_write_to_wasm_memory_from_js'), {
		env: {
			consoleLog(offset, len) {
				const strBuf = new Uint8Array(mem.buffer, offset, len);
				console.log(new TextDecoder().decode(strBuf));
			},
		},
	}).then(({ memory, getInStrOffset, toLowerCase }) => {
		cGroup('writeToWasmMemoryFromJs', () => {
			mem = memory;

			writeString(mem.buffer, 'Hello Web Assembly', getInStrOffset());
			toLowerCase();
		});
	});
};

function writeString(buf, str, offset) {
	const strBuf = new TextEncoder().encode(str);
	const outBuf = new Uint8Array(buf, offset, strBuf.length);

	for (let i = 0; i < strBuf.length; i++) {
		outBuf[i] = strBuf[i];
	}
}
