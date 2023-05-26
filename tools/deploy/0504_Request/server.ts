/*
	https://deno.com/deploy/docs/runtime-request
	
	cls && P: && CD P:\2022\20220613a\3code\9_tools\deno\deploy\0504_Request && deno run --allow-net --watch server.ts
	
*/

import { serve } from "https://deno.land/std@0.140.0/http/server.ts";

function handler(_req) {
  // Create a post request
  const request = new Request("https://post.deno.dev", {
    method: "POST",
    body: JSON.stringify({
      message: "Hello world!",
    }),
    headers: {
      "content-type": "application/json",
    },
  });

  console.log(request.method); // POST
  console.log(request.headers.get("content-type")); // application/json

  return fetch(request);
}

serve(handler);

/*
{
  "json": {
    "message": "Hello world!"
  }
}
*/
