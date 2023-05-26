/*
	https://deno.com/examples/fauna.ts
	
	cls && P: && CD P:\2022\20220613a\3code\9_tools\deno\deploy\0301_ExamplesGallery\ && deno run --allow-net=:8000 --watch 3_redirects.ts

	结果：成功跳转
	Example Domain
	This domain is for use in illustrative examples in documents. You may use this domain in literature without prior coordination or asking for permission.

	More information...
*/

import { serve } from "https://deno.land/std@0.140.0/http/server.ts";

function handler(_req: Request) {
  return Response.redirect("https://example.com", 307);
}

serve(handler);