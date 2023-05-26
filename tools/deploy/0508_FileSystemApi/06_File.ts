/*
	https://deno.com/deploy/docs/runtime-fs
	
	cls && P: && CD P:\2022\20220613a\3code\9_tools\deno\deploy\0508_FileSystemApi && deno run --allow-all --watch 06_File.ts
	
	原本未提供样例，基于05_open.ts修改
*/

import { readableStreamFromReader } from "https://deno.land/std@0.140.0/streams/conversion.ts";

// 本机调试时，需要加上Deno.cwd()
// const file = await Deno.open("./README.md");
const file = await Deno.open(`${Deno.cwd()}/README.md`);

// class File {
	// readonly rid: number;

	// close(): void;
	// read(p: Uint8Array): Promise<number | null>;
// }
console.log('rid', file.rid);

try {
	const valueArray = new Uint8Array(2000);

	const content = await file.read(valueArray);
	console.log('content', content);
	
	// import { readableStreamFromReader } from "https://deno.land/std@0.140.0/streams/conversion.ts";
	/* error: The module's source code could not be parsed: 'import', and 'export' cannot be used outside of module code at file:///P:/2022/20220613a/3code/9_tools/deno/deploy/0508_FileSystemApi/06_File.ts:27:3 */
	const body = readableStreamFromReader(file);
	console.log('body', body);
} catch(e) {
	console.log('error', e);
} finally {
	file.close();
}

/*
rid 3
content 1535
body ReadableStream { locked: false }

注意：1535为readm.md文件的字节数
*/

