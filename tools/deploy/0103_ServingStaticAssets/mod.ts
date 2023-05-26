/*
	https://deno.com/deploy/docs/serve-static-assets
	
	注意：必须先切换到当前文件所在目录才行。
	P: && cd P:\2022\20220613a\3code\9_tools\deno\deploy\0103_ServingStaticAssets\
	deno run --allow-net=:8000 --allow-read --watch mod.ts
	
*/

import { serve } from 'https://deno.land/std@0.140.0/http/server.ts';

async function handleRequest(request: Request): Promise<Response> {
  const { pathname } = new URL(request.url);

  // This is how the server works:
  // 1. A request comes in for a specific asset.
  // 2. We read the asset from the file system.
  // 3. We send the asset back to the client.
	
	// 下句用于辅助找Bug（比如，如果不在当前文件所在目录，则会报错）
	// console.log(Deno.cwd());

  // Check if the request is for style.css.
  if (pathname.startsWith('/style.css')) {
    // Read the style.css file from the file system.
    const file = await Deno.readFile(Deno.cwd().concat('./style.css'));
    // Respond to the request with the style.css file.
    return new Response(file, {
      headers: {
        'content-type': 'text/css',
      },
    });
  }

  return new Response(
    `<html>
      <head>
        <link rel='stylesheet' href='style.css' />
      </head>
      <body>
        <h1>Example</h1>
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

/*
	如果不在当前文件所在目录，则会报错（所以，后来才加了代码：P: && cd P:\2022\20220613a\3code\9_tools\deno\deploy\0103_ServingStaticAssets\）
	NotFound: The system cannot find the file specified. (os error 2)
    at async Object.readFile (deno:runtime/js/40_read_file.js:25:20)
    at async Server.handleRequest (file:///P:/2022/20220613a/3code/9_tools/deno/deploy/0103_ServingStaticAssets/mod.ts:26:8)
    at async Server.#respond (https://deno.land/std@0.140.0/http/server.ts:298:18
*/