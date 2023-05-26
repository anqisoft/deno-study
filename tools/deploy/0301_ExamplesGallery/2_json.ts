/*
	https://deno.com/examples/fauna.ts
	
	cls && P: && CD P:\2022\20220613a\3code\9_tools\deno\deploy\0301_ExamplesGallery\ && deno run --allow-net=:8000 --watch 2_json.ts

*/

import { serve } from "https://deno.land/std@0.140.0/http/server.ts";

function handler(_req: Request) {
  const data = {
    Hello: "World!",
  };
  const body = JSON.stringify(data, null, 2);
  return new Response(body, {
    headers: { "content-type": "application/json; charset=utf-8" },
  });
}

serve(handler);