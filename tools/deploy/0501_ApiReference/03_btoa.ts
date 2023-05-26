/*
	https://developer.mozilla.org/en-US/docs/Web/API/btoa
	
	cls && P: && CD P:\2022\20220613a\3code\9_tools\deno\deploy\0501_ApiReference && deno run --allow-all --watch 03_btoa.ts
	
*/

// example1
const encodedData = btoa("Hello, world"); // encode a string
const decodedData = atob(encodedData); // decode the string
console.log(decodedData); // => Hello, world

// example2
const ok = "a";
console.log(ok.codePointAt(0).toString(16)); //   61: occupies < 1 byte

const notOK = "✓";
console.log(notOK.codePointAt(0).toString(16)); // 2713: occupies > 1 byte

console.log(btoa(ok)); // YQ==
try {
	console.log(btoa(notOK)); // error: Uncaught InvalidCharacterError: The string to be encoded contains characters outside of the Latin1 range.
} catch(e) {
	console.log(e); // DOMException: The string to be encoded contains characters outside of the Latin1 range.
}

// example3
// convert a Unicode string to a string in which
// each 16-bit unit occupies only one byte
function toBinary(string) {
  const codeUnits = Uint16Array.from(
    { length: string.length },
    (element, index) => string.charCodeAt(index)
  );
  const charCodes = new Uint8Array(codeUnits.buffer);

  let result = "";
  charCodes.forEach((char) => {
    result += String.fromCharCode(char);
  });
  return result;
}

// a string that contains characters occupying > 1 byte
const myString = "☸☹☺☻☼☾☿";

const converted = toBinary(myString);
const encoded = btoa(converted);
console.log(encoded); // OCY5JjomOyY8Jj4mPyY=

// example4
// convert a Unicode string to a string in which
// each 16-bit unit occupies only one byte
function toBinary2(string) {
  const codeUnits = Uint16Array.from(
    { length: string.length },
    (element, index) => string.charCodeAt(index)
  );
  const charCodes = new Uint8Array(codeUnits.buffer);

  let result = "";
  charCodes.forEach((char) => {
    result += String.fromCharCode(char);
  });
  return result;
}

// a string that contains characters occupying > 1 byte
const myString2 = "☸☹☺☻☼☾☿";

const converted2 = toBinary2(myString2);
const encoded2 = btoa(converted2);
console.log(encoded2); // OCY5JjomOyY8Jj4mPyY=

/*
Hello, world
61
2713
YQ==
error: Uncaught InvalidCharacterError: The string to be encoded contains characters outside of the Latin1 range.
console.log(btoa(notOK)); // error
            ^
    at btoa (deno:ext/web/05_base64.js:57:15)
    at file:///P:/2022/20220613a/3code/9_tools/deno/deploy/0501_ApiReference/03_btoa.ts:21:13
*/