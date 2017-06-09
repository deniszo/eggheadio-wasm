import { getWasm, cGroup, fetchAndInstantiateWasm } from '../utils';

export default () => {
	fetchAndInstantiateWasm(getWasm('1_create_and_run_native_wasm_fn')).then(({
		sqrt,
	}) => {
		cGroup('testWasm', () => {
			console.log('wasmSqrt(25) ->', sqrt(25));
		});
	});
};
