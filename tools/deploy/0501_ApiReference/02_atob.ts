/*
	https://developer.mozilla.org/en-US/docs/Web/API/atob
	
	cls && P: && CD P:\2022\20220613a\3code\9_tools\deno\deploy\0501_ApiReference && deno run --allow-all --watch 02_atob.ts
	
*/

const encodedData = btoa('Hello, world'); // encode a string
const decodedData = atob(encodedData); // decode the string
console.log(decodedData);

/*
Hello, world
*/

