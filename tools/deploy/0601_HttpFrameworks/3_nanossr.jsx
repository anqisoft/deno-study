/*
	https://deno.com/deploy/docs/resources-frameworks
	https://dash.deno.com/playground/example-nanossr
	
	https://crux.land/nanossr@0.0.1
	https://crux.land/
	
	::下一句一定不要指定端口（相应库默认指定8000端口）——相应地，修改代码中不符合的部分
	cls && P: && CD P:\2022\20220613a\3code\9_tools\deno\deploy\0601_HttpFrameworks && deno run --allow-net --watch 3_nanossr.jsx
	
	::使用浏览器打开
	http://localhost:8080/
*/

/** @jsx h */
/// <reference no-default-lib="true"/>
/// <reference lib="dom" />
/// <reference lib="dom.asynciterable" />
/// <reference lib="deno.ns" />
import { serve } from "https://deno.land/std@0.114.0/http/server.ts";
import { h, ssr, tw } from "https://crux.land/nanossr@0.0.1";

const Hello = (props) => (
  <div class={tw`bg-white flex h-screen`}>
    <h1 class={tw`text-5xl text-gray-900 m-auto mt-20`}>
      Hello {props.name}!
    </h1>
  </div>
);

console.log("Listening on http://localhost:8000");
serve((req) => {
  const url = new URL(req.url);
  const name = url.searchParams.get("name") ?? "world";
  return ssr(() => <Hello name={name} />);
});

/* 结果：OK */