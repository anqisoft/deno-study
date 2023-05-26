/*
	https://developer.mozilla.org/en-US/docs/Web/API/textEncoder
	
	cls && P: && CD P:\2022\20220613a\3code\9_tools\deno\deploy\0501_ApiReference && deno run --allow-all --watch 05_textEncoder.ts
	
*/

const encoder = new TextEncoder()
const view = encoder.encode('€')
console.log(view); // Uint8Array(3) [226, 130, 172]

/*
Uint8Array(3) [ 226, 130, 172 ]
*/

