/*

	https://www.cnblogs.com/livelab/p/14111142.html
	https://deno.land/std@0.157.0/fs/mod.ts
	
	cls
	rd /Q /S p:\notExists\
	dir    p:\notExists
	
	deno run --allow-all P:\2022\20220613a\3code\9_tools\deno\fileHelper\createFileNotExists.ts
	dir /a/b/o/n/s p:\notExists
	
*/

import { ensureDir, ensureDirSync } from "https://deno.land/std/fs/mod.ts";
// import { sleep } from "https://deno.land/x/sleep/mod.ts";

await ensureDir('p:/notExists/test/');
// await sleep(5)
await Deno.writeTextFile('p:/notExists/test/test.ts', 'only test');
