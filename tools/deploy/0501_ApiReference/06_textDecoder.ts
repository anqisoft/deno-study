/*
	https://developer.mozilla.org/en-US/docs/Web/API/textDecoder
	
	cls && P: && CD P:\2022\20220613a\3code\9_tools\deno\deploy\0501_ApiReference && deno run --allow-all --watch 06_textDecoder.ts
	
*/

let utf8decoder = new TextDecoder(); // default 'utf-8' or 'utf8'

let u8arr = new Uint8Array([240, 160, 174, 183]);
let i8arr = new Int8Array([-16, -96, -82, -73]);
let u16arr = new Uint16Array([41200, 47022]);
let i16arr = new Int16Array([-24336, -18514]);
let i32arr = new Int32Array([-1213292304]);

console.log(utf8decoder.decode(u8arr));
console.log(utf8decoder.decode(i8arr));
console.log(utf8decoder.decode(u16arr));
console.log(utf8decoder.decode(i16arr));
console.log(utf8decoder.decode(i32arr));

// example2
let win1251decoder = new TextDecoder('windows-1251');
let bytes = new Uint8Array([207, 240, 232, 226, 229, 242, 44, 32, 236, 232, 240, 33]);
console.log(win1251decoder.decode(bytes)); // Привет, мир!

/*
𠮷
𠮷
𠮷
𠮷
𠮷
Привет, мир!
*/

