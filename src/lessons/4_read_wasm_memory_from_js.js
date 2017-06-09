import { fetchAndInstantiateWasm, getWasm, cGroup } from '../utils';

export default () => {
  fetchAndInstantiateWasm(getWasm('4_read_wasm_memory_from_js')).then(({
    memory,
    getStrOffset,
  }) => {
    cGroup('readWasmMemoryFromJs', () => {
      const strBuf = new Uint8Array(memory.buffer, getStrOffset(), 11);
      const str = new TextDecoder().decode(strBuf);
      console.log(str);
    });
  });
};
