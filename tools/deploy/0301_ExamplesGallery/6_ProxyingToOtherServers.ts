/*
	https://deno.com/examples/fauna.ts
	
	cls && P: && CD P:\2022\20220613a\3code\9_tools\deno\deploy\0301_ExamplesGallery\ && deno run --allow-net=:8000 --allow-net --watch 6_ProxyingToOtherServers.ts
	
	最初没加--allow-net
	eno requests net access to "example.com". Run again with --allow-net to bypass this prompt. Allow? [y/n (y = yes allow, n = no deny)]  y

	结果：OK
*/

import { serve } from "https://deno.land/std@0.140.0/http/server.ts";

async function handler(req: Request): Promise<Response> {
  const url = new URL(req.url);
  url.protocol = "https:";
  url.hostname = "example.com";
  url.port = "443";
  return await fetch(url.href, {
    headers: req.headers,
    method: req.method,
    body: req.body,
  });
}

serve(handler);