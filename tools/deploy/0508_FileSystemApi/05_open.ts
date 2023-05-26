/*
	https://deno.com/deploy/docs/runtime-fs
	
	cls && P: && CD P:\2022\20220613a\3code\9_tools\deno\deploy\0508_FileSystemApi && deno run --allow-all --watch 05_open.ts
	
*/

import { serve } from "https://deno.land/std@0.140.0/http/server.ts";
import { readableStreamFromReader } from "https://deno.land/std@0.140.0/streams/conversion.ts";

async function handler(_req) {
  // Open the README.md file available at the root of the repository.
	// 本机调试时，需要加上Deno.cwd()
  // const file = await Deno.open("./README.md");
  const file = await Deno.open(`${Deno.cwd()}/README.md`);

  // Turn the `Deno.File` into a `ReadableStream`. This will automatically close
  // the file handle when the response is done sending.
  const body = readableStreamFromReader(file);

  return new Response(body);
}

serve(handler);

/*
成功，内容省略
*/

