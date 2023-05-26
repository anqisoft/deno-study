/*
	https://deno.com/deploy/docs/hello-world
	
	deno run --allow-net=:8000 P:\2022\20220613a\3code\9_tools\deno\deploy\0101_HelloWorld\helloWorld.ts
*/

import { serve } from "https://deno.land/std@0.140.0/http/server.ts";

serve((_req) => {
  return new Response("Hello World from AnQi on 2022-09-23!", {
    headers: { "content-type": "text/plain" },
  });
});