/*
	https://deno.com/examples/fauna.ts
	
	cls && P: && CD P:\2022\20220613a\3code\9_tools\deno\deploy\0301_ExamplesGallery\ && deno run --allow-net=:8000 --watch 5_HandlingFormSubmissions.ts

	结果：OK
*/

import { serve } from "https://deno.land/std@0.140.0/http/server.ts";

const html = `
<form method="POST" action="/">
  <input type="text" name="name" placeholder="Your name">
  <button type="submit">Submit</button>
</form>
`;

async function handler(req: Request): Promise<Response> {
  switch (req.method) {
    case "GET": {
      return new Response(html, {
        headers: { "content-type": "text/html; charset=utf-8" },
      });
    }

    case "POST": {
      const body = await req.formData();
      const name = body.get("name") || "anonymous";
      return new Response(`Hello ${name}!`);
    }

    default:
      return new Response("Invalid method", { status: 405 });
  }
}

serve(handler);