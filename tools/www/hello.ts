/*
	https://deno.com/deploy/docs/runtime-fs
	
	deno run --allow-net=:8000 P:/2022/20220613a/3code/9_tools/deno/www/hello.ts
*/

import { serve } from "https://deno.land/std@0.140.0/http/server.ts";

serve((_req) => {
  return new Response("Hello World from AnQi!", {
    headers: { "content-type": "text/plain" },
  });
});