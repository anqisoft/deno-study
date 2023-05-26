/*
	https://deno.com/examples/fauna.ts
	
	cls && P: && CD P:\2022\20220613a\3code\9_tools\deno\deploy\0301_ExamplesGallery\ && deno run --allow-net=:8000 --watch 1_helloWorld.ts

*/
import { serve } from "https://deno.land/std@0.140.0/http/server.ts";

function handler(_req: Request): Response {
  return new Response("Hello, World");
}

serve(handler);