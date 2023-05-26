/*
	https://deno.com/deploy/docs/runtime-headers
	
	cls && P: && CD P:\2022\20220613a\3code\9_tools\deno\deploy\0506_Headers && deno run --allow-net --watch server.ts
	
*/

// Create a new headers object from an object literal.
const myHeaders = new Headers({
  accept: "application/json",
});

// Append a header to the headers object.
myHeaders.append("user-agent", "Deno Deploy");

// Print the headers of the headers object.
for (const [key, value] of myHeaders.entries()) {
  console.log(key, value);
}

// You can pass the headers instance to Response or Request constructors.
const request = new Request("https://api.github.com/users/denoland", {
  method: "POST",
  headers: myHeaders,
});

/*
Watcher Process started.
accept application/json
user-agent Deno Deploy
Watcher Process finished. Restarting on file change...
*/
