/*
	https://deno.com/examples/fauna.ts
	
	cls && P: && CD P:\2022\20220613a\3code\9_tools\deno\deploy\0301_ExamplesGallery\ && deno run --allow-net=:8000 --watch 4_getClientIpAddress.ts

	结果：Your IP address is 127.0.0.1
*/

import { ConnInfo, serve } from "https://deno.land/std@0.140.0/http/server.ts";

function handler(_req: Request, connInfo: ConnInfo) {
  const addr = connInfo.remoteAddr as Deno.NetAddr;
  const ip = addr.hostname;
  return new Response(`Your IP address is <b>${ip}</b>`, {
    headers: { "content-type": "text/html" },
  });
}

serve(handler);