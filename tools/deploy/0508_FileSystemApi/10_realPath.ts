/*
	https://deno.com/deploy/docs/runtime-fs
	
	cls && P: && CD P:\2022\20220613a\3code\9_tools\deno\deploy\0508_FileSystemApi && deno run --allow-all --watch 10_realPath.ts
	
*/

import { serve } from "https://deno.land/std@0.140.0/http/server.ts";

async function handler(_req) {
  const path = await Deno.realPath('./README.md');

  return new Response(`The fully resolved path for ./README.md is ${path}`);
}

serve(handler);

/*
The fully resolved path for ./README.md is P:\2022\20220613a\3code\9_tools\deno\deploy\0508_FileSystemApi\README.md
*/

