/*
	https://deno.com/examples/fauna.ts
	
	cls && P: && CD P:\2022\20220613a\3code\9_tools\deno\deploy\0301_ExamplesGallery\ && deno run --allow-net=:8000 --watch 7_ServerSideRenderingWithJSX.ts
	
	// OK
	https://dash.deno.com/playground/example-ssr-jsx-preact
	
*/

/** @jsx h */
import { serve } from "https://deno.land/std@0.140.0/http/server.ts";
import { h } from "https://esm.sh/preact@10.5.15";
import { renderToString } from "https://esm.sh/preact-render-to-string@5.1.19?deps=preact@10.5.15";

// function handler(_req: Request): Response {
function handler(_req) {
  const page = h(`
    <div>
      <h1>Current time</h1>
      <p>{new Date().toLocaleString()}</p>
    </div>
  `);
  const html = renderToString(page);
  return new Response(html, {
    headers: { "content-type": "text/html; charset=utf-8" },
  });
}

serve(handler);

/*
	error: The module's source code could not be parsed: Expected ',', got 'time' at file:///P:/2022/20220613a/3code/9_tools/deno/deploy/0301_ExamplesGallery/7_ServerSideRenderingWithJSX.ts:20:19
*/