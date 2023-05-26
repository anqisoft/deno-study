/*
	https://deno.com/examples/fauna.ts
	https://dash.deno.com/playground/example-sift
	
	https://github.com/satyarohith/sift
	https://deno.land/x/sift@0.6.0
	
	cls && P: && CD P:\2022\20220613a\3code\9_tools\deno\deploy\0601_HttpFrameworks && deno run --allow-net --watch 4_sift.jsx
	
*/

/** @jsx h */
import { h, json, jsx, serve } from "https://deno.land/x/sift@0.4.0/mod.ts";

const App = () => (
  <div>
    <h1>Hello world!</h1>
  </div>
);

const NotFound = () => (
  <div>
    <h1>Page not found</h1>
  </div>
);

serve({
  "/": () => jsx(<App />),
  "/api": () => json({ message: "Hello world" }),
  404: () => jsx(<NotFound />, { status: 404 }),
});

/* 结果：
error: error sending request for url (https://x.lcas.dev/preact@10.5.12/ssr.js): error trying to connect: dns error: No such host is known. (os error 11001)
    at https://deno.land/x/sift@0.4.0/mod.ts:12:24
*/