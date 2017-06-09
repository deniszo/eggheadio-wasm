import lesson1 from './lessons/1_create_and_run_native_wasm_fn.js';
import lesson2 from './lessons/2_compiled_c_code_into_wasm.js';
import lesson3 from './lessons/3_calljs_fn_from_wasm.js';

(() => {
	lesson1();
	lesson2();
	lesson3();
})(window);
