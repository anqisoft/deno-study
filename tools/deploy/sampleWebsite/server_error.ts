/*
	参考网址：https://segmentfault.com/a/1190000037751598
	其代码可能有如下缺陷：
	1. req.respond不存在
	2. 如果在本机调试，req.url === '/'不会成立
	3. 使用了默认不存在的fromFileUrl方法

	注意：必须先切换到本文件所在目录
	P: && cd P:\2022\20220613a\3code\9_tools\deno\deploy\sampleWebsite\
	deno run --allow-net --allow-read --watch server_error.ts
	
*/

import { listenAndServe } from 'https://deno.land/std/http/server.ts';

// // 基于参考网址，需增加下一句，否则将提示找不到fromFileUrl
// import * as mod from 'https://deno.land/std@v0.50.0/path/posix.ts';
// const { fromFileUrl } = mod;
// 
// const file_url = fromFileUrl(new URL('./index.htm', import.meta.url));

/* 原始代码 */
// import { listenAndServe } from 'https://deno.land/std/http/server.ts';
// const file_url = fromFileUrl(new URL('../static/index.html', import.meta.url));
// listenAndServe(
  // {
    // port: 3000,
  // },
  // async req => {
    // if (req.method === 'GET' && req.url === '/') {
      // req.respond({
        // status: 200,
        // headers: new Headers({
          // 'content-type': 'text/html',
        // }),
        // body: await Deno.readTextFile(file_url),
      // });
    // }
  // }
// );

// console.log('Server running on localhost:3000');

import { readableStreamFromReader } from "https://deno.land/std@0.157.0/streams/mod.ts";

listenAndServe(
  { port: 3001 },
  async (request) => {
		// console.log(request);
		// Request {
			// bodyUsed: false,
			// headers: Headers {
			// accept: "image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8",
			// "accept-encoding": "gzip, deflate, br",
			// "accept-language": "en,zh-CN;q=0.9,zh;q=0.8",
			// connection: "keep-alive",
			// host: "localhost:3001",
			// referer: "http://localhost:3001/",
			// "sec-ch-ua": '"Chromium";v="104", " Not A;Brand";v="99", "Google Chrome";v="104"',
			// "sec-ch-ua-mobile": "?0",
			// "sec-ch-ua-platform": '"Windows"',
			// "sec-fetch-dest": "image",
			// "sec-fetch-mode": "no-cors",
			// "sec-fetch-site": "same-origin",
			// "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/104.0.0.0 Sa..."
		// },
			// method: "GET",
			// redirect: "follow",
			// url: "http://localhost:3001/favicon.ico"
		// }
		
		const { pathname } = new URL(request.url);
		// pathname => / 或 /favicon.ico
		// request.respond => undefined
		// console.log(pathname, request.respond);
		
		if (request.method === 'GET' && (pathname === '/' || pathname === '/index.htm')) {
      // return new Response({
        // status: 200,
        // headers: new Headers({
          // 'content-type': 'text/html',
        // }),
				
        // body: await Deno.open('./index.htm'),
				
        // body: await Deno.open(Deno.cwd().concat('./index.htm')),
      // });
			
			// const file = await Deno.readFile(Deno.cwd().concat('./index.htm'));
			// console.log(file);
			
			/* [object Object] */
			// return new Response({
				// headers: {
					// 'content-type': 'text/html',
				// },
				// body: file,
			// });
			
			/* [object Object] */
			const file2 = await Deno.open(Deno.cwd().concat('./index.htm'), { read: true });
			const readableStream = readableStreamFromReader(file2);
			return new Response({
				headers: {
					'content-type': 'text/html',
				},
				body: readableStream,
			});
		}
  }
);

console.log('Server running on localhost:3001');