/*
	参考网址：https://segmentfault.com/a/1190000037751598
	其代码可能有如下缺陷：
	1. req.respond不存在
	2. 如果在本机调试，req.url === '/'不会成立

	注意：必须先切换到本文件所在目录
	cls && P: && cd P:\2022\20220613a\3code\9_tools\deno\deploy\chat && deno run --allow-net --allow-read --allow-write --watch server.ts
	
*/

import { listenAndServe } from 'https://deno.land/std/http/server.ts';
// error: Module not found "https://deno.land/std/ws/mod.ts".
// import { acceptWebSocket, acceptable } from "https://deno.land/std/ws/mod.ts";
import { acceptWebSocket, acceptable } from "https://deno.land/x/abc@v1.3.3/vendor/https/deno.land/std/ws/mod.ts";
import { chat } from "./chat.ts";

import { BufWriter, BufReader } from "https://deno.land/std@0.56.0/io/bufio.ts";
import { StringWriter } from "https://deno.land/std@0.56.0/io/writers.ts";

const stringWriter = new StringWriter();
const bufWriter = new BufWriter(stringWriter);
const bufReader = new BufReader(stringWriter);

listenAndServe({ port: 3000 }, async (request) => {
	const { method } = request;
	const { pathname } = new URL(request.url);
	// console.log(method, pathname);
	
	switch(method) {
		case 'GET':
			switch(pathname) {
				case '/':
					const file = await Deno.readFile(Deno.cwd().concat('./index.htm'));
					return new Response(file, {
						status: 200,
						headers: new Headers({
							"content-type": "text/html",
						}),
						// body: await Deno.open("./index.htm"),
					});
				
					break;
				case '/ws':
					// WebSockets Chat
					if (acceptable(request)) {
						console.log(request, bufWriter, bufReader);
						acceptWebSocket({
							conn: request.conn,
							// bufReader: request.bufWriter,
							// bufWriter: request.bufReader,
							bufReader,
							bufWriter,
							headers: request.headers,
						}).then(chat);
					}
					break;
				default:
					break;
			}
			break;
		default:
			break;
	}
});

console.log("Server running on localhost:3000");

/* 出错信息
error: Uncaught (in promise) TypeError: Cannot read properties of undefined (reading 'write')
	nwritten += await w.write(arr.subarray(nwritten));
											^
	at writeAll (https://deno.land/std@0.99.0/io/util.ts:159:25)
	at BufWriter.flush (https://deno.land/std@0.99.0/io/bufio.ts:470:13)
	at writeResponse (https://deno.land/std@0.99.0/http/_io.ts:292:16)
	at async acceptWebSocket (https://deno.land/std@0.99.0/ws/mod.ts:447:5)
*/