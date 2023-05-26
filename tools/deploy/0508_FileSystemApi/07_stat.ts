/*
	https://deno.com/deploy/docs/runtime-fs
	
	cls && P: && CD P:\2022\20220613a\3code\9_tools\deno\deploy\0508_FileSystemApi && deno run --allow-all --watch 07_stat.ts
	
*/

import { serve } from "https://deno.land/std@0.140.0/http/server.ts";

async function handler(_req) {
  // Get file info of the README.md at the root of the repository.
  const info = await Deno.stat("./README.md");

  // Get the size of the file in bytes.
  const size = info.size;

  return new Response(`README.md is ${size} bytes large`);
}

serve(handler);

/*
README.md is 1535 bytes large
*/

