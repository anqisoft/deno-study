/*
	https://deno.com/deploy/docs/resources-frameworks
	https://dash.deno.com/playground/example-oak
	https://oakserver.github.io/oak/deploy
	
	::下一句不要指定端口，因为代码中指定了8080端口
	cls && P: && CD P:\2022\20220613a\3code\9_tools\deno\deploy\0601_HttpFrameworks && deno run --allow-net --no-check --watch 1_oak.ts
	
	::使用浏览器打开
	http://localhost:8080/
*/
import { Application, Router } from "https://deno.land/x/oak/mod.ts";

const router = new Router();
router.get("/", (ctx) => {
  ctx.response.body = "Hello world!";
});

const app = new Application();
app.use(router.routes());
app.use(router.allowedMethods());

app.addEventListener(
  "listen",
  (e) => console.log("Listening on http://localhost:8080"),
);
await app.listen({ port: 8080 });

/* 结果：OK */

/*
https://oakserver.github.io/oak/deploy
A middleware framework for handling HTTP with Deno 🐿️ 🦕

View the Project on GitHub
oakserver/oak
https://github.com/oakserver/oak

oak and Deno Deploy
oak v7.1.0 introduced support for Deno Deploy, and as of v10.0.0 removes the fetch event interface. Using oak with Deno Deploy is just like using oak with the Deno CLI, and most things should “just work”.

This guide focuses on writing oak for a Deno Deploy application, and does not cover in depth the usage of Deno Deploy. The Deno Deploy Docs should be used for that.

Considerations
There are a few considerations when currently with Deno Deploy:

Deno Deploy does not currently support web sockets. Trying to upgrade a connection to a web socket will fail.
The command line utility for Deploy (deployctl) cannot properly type check oak at the moment. You should use --no-check to bypass type checking when using oak with deployctl.
*/