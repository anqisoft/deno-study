/*
	https://deno.com/examples/fauna.ts
	https://dash.deno.com/playground/example-ssr-jsx-preact
	
	cls && P: && CD P:\2022\20220613a\3code\9_tools\deno\deploy\0301_ExamplesGallery\ && deno run --allow-net=:8000 --watch 8_WildcardDomain.tsx
	
*/

import { serve } from "https://deno.land/std@0.155.0/http/server.ts";

function handler(req: Request) {
  const url = new URL(req.url);
  if (url.hostname === "a.example.com") {
    return new Response("website 1");
  } else if (url.hostname === "b.example.com") {
    return new Response("website 2");
  }
  return new Response("website infinity");
}

serve(handler);