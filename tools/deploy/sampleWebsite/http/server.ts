/*
	https://segmentfault.com/a/1190000037751598
	
	deno run --allow-net P:\2022\20220613a\3code\9_tools\deno\deploy\sampleWebsite\http\server.ts
*/

import { listenAndServe } from 'https://deno.land/std/http/server.ts';
// const file_url = fromFileUrl(new URL('./index.htm', import.meta.url));
listenAndServe(
  {
    port: 3000,
  },
  async req => {
    if (req.method === 'GET' && req.url === '/') {
      req.respond({
        status: 200,
        headers: new Headers({
          'content-type': 'text/html',
        }),
        // body: await Deno.readTextFile(file_url),
        body: await Deno.readTextFile('./index.htm'),
      });
    }
  }
);

console.log('Server running on localhost:3000');