/*
	https://deno.com/deploy/docs/runtime-fs
	
	cls && P: && CD P:\2022\20220613a\3code\9_tools\deno\deploy\0508_FileSystemApi && deno run --allow-all --watch 04_readTextFile.ts
	
*/

import { serve } from "https://deno.land/std@0.140.0/http/server.ts";

async function handler(_req, event) {
	// 本机调试时，需要加上Deno.cwd()
  // const readme = await Deno.readTextFile('./README.md');
  const readme = await Deno.readTextFile(`${Deno.cwd()}/README.md`);
  _req.respondWith(new Response(readme));
}

serve(handler);

/*
Internal Server Error


如果在handler中增加参数event，并使用event.respondWith(new Response(readme)); 将提示：
TypeError: event.respondWith is not a function
    at Server.handler (file:///P:/2022/20220613a/3code/9_tools/deno/deploy/0508_FileSystemApi/04_readTextFile.ts:14:9)
    at async Server.#respond (https://deno.land/std@0.140.0/http/server.ts:298:18)
*/

