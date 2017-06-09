import {
  fetchAndInstantiateWasm,
  fetchAndCompileWasm,
  getWasm,
  cGroup,
} from '../utils';

export default () => {
  sequentialLoadAndInt();
  parallelLoadAndInit();
};

function sequentialLoadAndInt() {
  let wasmMalloc, wasmFree;

  console.time('sequential');

  fetchAndInstantiateWasm(
    getWasm('7_allocate_dynamic_memory_in_wasm_with_malloc'),
    {
      env: {
        malloc: len => wasmMalloc(len),
        free: addr => wasmFree(addr),
      },
    }
  ).then(module => {
    fetchAndInstantiateWasm(getWasm('memory'), {
      env: {
        memory: module.memory,
      },
    })
      .then(implementation => {
        wasmMalloc = implementation.malloc;
        wasmFree = implementation.free;
      })
      .then(() => {
        cGroup('allocateDynamicMemoryInWasmWithMalloc sequential', () => {
          module.createRecord(2, 1.1, 2.2);
          console.timeEnd('sequential');
        });
      });
  });
}

function parallelLoadAndInit() {
  let wasmMalloc, wasmFree;

  console.time('parallel');

  const wasmFiles = [
    getWasm('memory'),
    getWasm('7_allocate_dynamic_memory_in_wasm_with_malloc'),
  ];

  Promise.all(wasmFiles.map(fetchAndCompileWasm)).then(([memory, program]) => {
    return WebAssembly.instantiate(program, {
      env: {
        malloc: len => wasmMalloc(len),
        free: addr => wasmFree(addr),
      },
    }).then(module => {
      return WebAssembly.instantiate(memory, {
        env: {
          memory: module.exports.memory,
        },
      })
        .then(module => {
          wasmMalloc = module.exports.malloc;
          wasmFree = module.exports.free;
        })
        .then(() => {
          cGroup('allocateDynamicMemoryInWasmWithMalloc parallel', () => {
            module.exports.createRecord(2, 1.1, 2.2);
            console.timeEnd('parallel');
          });
        });
    });
  });
}
