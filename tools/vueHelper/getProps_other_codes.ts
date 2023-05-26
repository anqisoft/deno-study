/*
	deno run --allow-read --allow-write P:\2022\20220613a\3code\9_tools\deno\vueHelper\getProps.ts
*/

const SOURCE_PATH: string = 'P:/2022/20220613a/3code/8_components/dishanqian-base/src/components/dishanqian/';
const GOAL_PATH: string = 'P:/2022/20220613a/3code/8_components/doc/dishanqian-base/';

// https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-8.html#top-level-await

// // import { writeAll } from "https://deno.land/std/streams/conversion.ts";
// async function parseVueFile(filename: string) {
	// const originalFileFullName: string = SOURCE_PATH.concat(filename);
	// const originalContent: string = (await Deno.readTextFile(originalFileFullName)).replace('\n</template>', '\n</template>厶').split('厶')[0];
	
	// // await console.log(originalContent.substring(0, 100));
	// // 注意：不能用/gi，如果加上i则表示不区分大小写，会导致in"被误判断
	// const segsArray: Array<string> = originalContent.replace(/[ ,\[\]\(\):\?\{\}]/g, '"').replace(/In"/g, 'In厶').split('厶');
	// // 注意：最后一段需舍弃，所以这里要减2而不是1
	// const maxIndex: number = segsArray.length - 2;
	
	// const result: Array<string> = [];
	// for(let i = 0; i < maxIndex; ++i) {
		// const itemSegs: Array<string> = segsArray[i].split('"');
		// const item: string = itemSegs[itemSegs.length - 1];
		// if (result.indexOf(item) === -1) {
			// result.push(item);
		// }
	// }
	// // console.log(result.join('/'));
	
	// const goalFileFullName: string = GOAL_PATH.concat(filename.replace('.vue', '.props.txt'));
	// /*
		// error: Uncaught (in promise) TypeError: w.write is not a function
    // nwritten += await w.write(arr.subarray(nwritten));
                        // ^
    // at writeAll (https://deno.land/std@0.156.0/streams/conversion.ts:422:25)
    // at parseVueFile (file:///P:/2022/20220613a/3code/9_tools/deno/vueHelper/getProps.ts:29:8)
	// */
	// // await writeAll(goalFileFullName, new TextEncoder().encode(result.join('\n')));
	// await Deno.writeTextFile(goalFileFullName, result.join('\n'));
// }

// import { writeAll } from "https://deno.land/std/streams/conversion.ts";
async function parseVueFile(filename: string) {
	const originalFileFullName: string = SOURCE_PATH.concat(filename);
	
	// 获取"defineProps({"与“\n});”中间的内容
	const originalContent: string = (await Deno.readTextFile(originalFileFullName))
		.replace('defineProps({', '厶').split('厶')[1]
		.replace('\n});', '厶').split('厶')[0]
		// 去掉空格与制表符
		.replace(/[ \t]/g, '')
		// 去掉多行注释
		.replace(/\/\*.+\*\//g, '')
		// 去掉单行注释
		.replace(/\/\/[^\n]+\n/g, '')
		// 去掉空行
		.replace(/\n{2,1000}/g, '\n')
	;
	// console.log(originalContent);
	
	// // await console.log(originalContent.substring(0, 100));
	// // 注意：不能用/gi，如果加上i则表示不区分大小写，会导致in"被误判断
	// const segsArray: Array<string> = originalContent.replace(/[ ,\[\]\(\):\?\{\}]/g, '"').replace(/In"/g, 'In厶').split('厶');
	// // 注意：最后一段需舍弃，所以这里要减2而不是1
	// const maxIndex: number = segsArray.length - 2;
	
	// const result: Array<string> = [];
	// for(let i = 0; i < maxIndex; ++i) {
		// const itemSegs: Array<string> = segsArray[i].split('"');
		// const item: string = itemSegs[itemSegs.length - 1];
		// if (result.indexOf(item) === -1) {
			// result.push(item);
		// }
	// }
	// // console.log(result.join('/'));
	
	// const goalFileFullName: string = GOAL_PATH.concat(filename.replace('.vue', '.props.txt'));
	// /*
		// error: Uncaught (in promise) TypeError: w.write is not a function
    // nwritten += await w.write(arr.subarray(nwritten));
                        // ^
    // at writeAll (https://deno.land/std@0.156.0/streams/conversion.ts:422:25)
    // at parseVueFile (file:///P:/2022/20220613a/3code/9_tools/deno/vueHelper/getProps.ts:29:8)
	// */
	// // await writeAll(goalFileFullName, new TextEncoder().encode(result.join('\n')));
	// await Deno.writeTextFile(goalFileFullName, result.join('\n'));
}

/* 
// https://examples.deno.land/reading-files
// deno run --allow-read https://examples.deno.land/reading-files.ts
const bytes = await Deno.readFile("hello.txt");
const text = await Deno.readTextFile("hello.txt");
const file = await Deno.open("hello.txt");

const buffer = new Uint8Array(5);
const bytesRead = await file.read(buffer);
console.log(`Read ${bytesRead} bytes`);

const pos = await file.seek(6, Deno.SeekMode.Start);
console.log(`Seeked to position ${pos}`);

const buffer2 = new Uint8Array(2);
const bytesRead2 = await file.read(buffer2);
console.log(`Read ${bytesRead2} bytes`);

file.seek(0, Deno.SeekMode.Start);
file.close();

Deno.readFileSync("hello.txt");
Deno.readTextFileSync("hello.txt");
const f = Deno.openSync("hello.txt");
f.seekSync(6, Deno.SeekMode.Start);
const buf = new Uint8Array(5);
f.readSync(buf);
f.close();
*/

/* 
// https://examples.deno.land/writing-files
// deno run --allow-read --allow-write https://examples.deno.land/writing-files.ts

const bytes = new Uint8Array([72, 101, 108, 108, 111]);
await Deno.writeFile('hello.txt', bytes, { mode: 0o644 });

await Deno.writeTextFile('hello.txt', 'Hello World');

const file = await Deno.create('hello.txt');
const written = await file.write(bytes);
console.log(`${written} bytes written.`);

import { writeAll } from 'https://deno.land/std/streams/conversion.ts';
await writeAll(file, new TextEncoder().encode('World!'));

file.close();

Deno.writeFileSync('hello.txt', bytes);
Deno.writeTextFileSync('hello.txt', 'Hello World');
const f = Deno.createSync('hello.txt');
import { writeAllSync } from 'https://deno.land/std/streams/conversion.ts';
writeAllSync(f, new TextEncoder().encode('World!'));
f.close();
*/

// parseVueFile('DsqListPage.vue');
// 'DsqListPage,DsqItemDialog'.split(',').forEach((filename: string) => parseVueFile(filename.concat('.vue')));
'DsqListPage'.split(',').forEach((filename: string) => parseVueFile(filename.concat('.vue')));

