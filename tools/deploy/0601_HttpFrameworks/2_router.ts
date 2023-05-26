/*
	https://deno.com/deploy/docs/resources-frameworks
	https://dash.deno.com/playground/example-router
	
	::下一句一定不要指定端口（相应库默认指定8000端口）
	cls && P: && CD P:\2022\20220613a\3code\9_tools\deno\deploy\0601_HttpFrameworks && deno run --allow-net --watch 2_router.ts
	
	::官方案例里面回写Listening on http://localhost:8080，如果上一句不指定端口，则实际使用8000（如占用则使用其它的）
	::deno不允许同时使用 --allow-net=:8080 --allow-net error: The argument '--allow-net[=<allow-net>...]' was provided more than once, but cannot be used multiple times
	
	::如果使用deno run --allow-net=:8080 --watch 2_router.ts，则提示还得加上--allow-net
	::Deno requests net access to "0.0.0.0:8000". Run again with --allow-net to bypass this prompt. Allow? [y/n (y = yes allow, n = no deny)]
		
	::使用浏览器打开
	http://localhost:8080/
*/

import { serve } from "https://deno.land/std@0.114.0/http/server.ts";
import { router } from "https://crux.land/router@0.0.5";

const handler = router({
  "GET@/": (_req) => new Response("Hello get!", { status: 200 }),
  "POST@/": (_req) => new Response("Hello post!", { status: 200 }),
});

console.log("Listening on http://localhost:8000");
await serve(handler);

/* 结果：OK */