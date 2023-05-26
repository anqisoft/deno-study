/*
	https://deno.com/deploy/docs/runtime-fs
	deno run --allow-all "P:/2022/20220613a/3code/9_tools/deno/samples/File System API/realPath.ts"
*/
import { serve } from "https://deno.land/std@0.140.0/http/server.ts";

async function handler(_req) {
  const path = await Deno.realPath("./README.md");

  return new Response(`The fully resolved path for ./README.md is ${path}`);
}

serve(handler);