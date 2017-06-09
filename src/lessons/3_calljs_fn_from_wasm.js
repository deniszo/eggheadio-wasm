import { fetchAndInstantiateWasm, getWasm, cGroup } from '../utils';

export default () => {
  fetchAndInstantiateWasm(getWasm('3_call_js_fn_from_wasm'), {
    env: {
      consoleLog: num => console.log(num),
    },
  }).then(({ getSqrt }) => {
    cGroup('callJsFnFromWasm', () => {
      console.log(getSqrt(5));
    });
  });
};
