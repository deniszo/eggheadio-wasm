import lesson1 from './lessons/1_create_and_run_native_wasm_fn';
import lesson2 from './lessons/2_compiled_c_code_into_wasm';
import lesson3 from './lessons/3_calljs_fn_from_wasm';
import lesson4 from './lessons/4_read_wasm_memory_from_js';
import lesson5 from './lessons/5_write_to_wasm_memory_from_js';
import lesson7 from './lessons/7_allocate_dynamic_memory_in_wasm_with_malloc';

(() => {
	lesson1();
	lesson2();
	lesson3();
	lesson4();
	lesson5();
	lesson7();
})(window);
