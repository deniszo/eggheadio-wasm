import { fetchAndInstantiateWasm, getWasm, cGroup } from '../utils';

export default () => {
  fetchAndInstantiateWasm(getWasm('2_compiled_c_code_into_wasm')).then(({
    getSqrt,
  }) => {
    cGroup('cCompiled', () => {
      console.log('getSqrt(25) ->', getSqrt(25));
    });
  });
};
