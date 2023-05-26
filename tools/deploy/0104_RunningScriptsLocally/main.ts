/*
	https://deno.com/deploy/docs/running-scripts-locally

	// OK
	deno run --allow-net=:8000 https://deno.com/examples/hello.js
	http://localhost:8000/
	
	cls && P: && cd P:\2022\20220613a\3code\9_tools\deno\deploy\0104_RunningScriptsLocally\ && deno run --allow-net=:8000 --watch ./main.ts
	
*/

// console.log('show the content of main.ts');

import { serve } from 'https://deno.land/std@0.140.0/http/server.ts';

async function handleRequest(request: Request): Promise<Response> {
  return new Response(
    `<html>
      <head>
        <title>test main.ts</title>
      </head>
      <body>
        <h1>Example of main.ts</h1>
      </body>
    </html>`,
    {
      headers: {
        'content-type': 'text/html; charset=utf-8',
      },
    },
  );
}

serve(handleRequest);