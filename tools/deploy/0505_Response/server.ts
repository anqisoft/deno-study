/*
	https://deno.com/deploy/docs/runtime-response
	
	cls && P: && CD P:\2022\20220613a\3code\9_tools\deno\deploy\0505_Response && deno run --allow-net --watch server.ts
	
*/

import { serve } from "https://deno.land/std@0.140.0/http/server.ts";

function handler(_req) {
  // Create a response with html as its body.
  const response = new Response("<html> Hello </html>", {
    status: 200,
    headers: {
      "content-type": "text/html",
    },
  });

  console.log(response.status); // 200
  console.log(response.headers.get("content-type")); // text/html

  return response;
}

serve(handler);

/*
Hello
*/
