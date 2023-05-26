/*
	功能：批量创建用于deno的相关ts文件
	版本：
				2022-09-25 安启 新建
	用法（二选一）：
	deno run --allow-read --allow-write --allow-net P:\2022\20220613a\3code\9_tools\deno\fileHelper\apply_batchCreateTs_20220925.ts
	
	cls && deno run --allow-read --allow-write --allow-net P:\2022\20220613a\3code\9_tools\deno\fileHelper\apply_batchCreateTs_20220925.ts
	
*/

import { getPath, createTsFile } from './batchCreateTs.ts';

/** 目录 */
let goalPath: string = '';
/** 内容模板 */
let template: string = '';
/** 序号偏移值 */
let noOffset: number = 1;

// 第一批，Deno官方自带的文件系统API
goalPath = 'P:/2022/20220613a/3code/9_tools/deno/deploy/0508_FileSystemApi/';
template = `/*
	https://deno.com/deploy/docs/runtime-fs
	
	cls && P: && CD ~path~ && deno run --allow-all --watch ~filenameWithNo~
	
*/


/*

*/ Result:

`;
await 'cwd,readDir,readFile,readTextFile,open,File,stat,lstat,FileInfo,realPath'
.split(',').forEach((name, index) => {
	const filenameWithNo = '0'.concat((index + noOffset).toString()).slice(-2).concat('_', name, '.ts');
	const filenameShort = name;
	const filenameFull = goalPath.concat(filenameWithNo);
	createTsFile(filenameFull, template, {
		filenameFull: { reg: /~filenameFull~/g, value: filenameFull },
		filenameWithNo: { reg: /~filenameWithNo~/g, value: filenameWithNo },
		filenameShort: { reg: /~filenameShort~/g, value: filenameShort },
		path: { reg: /~path~/g, value: getPath(filenameFull).replace(/\//g, '\\') },
	});
});

// 第二批：参考Web API（developer.mozilla.org）
goalPath = 'P:/2022/20220613a/3code/9_tools/deno/deploy/0501_ApiReference/';
template = `/*
	https://deno.com/deploy/docs/runtime-api
	https://developer.mozilla.org/en-US/docs/Web/API/~filenameShort~
	
	cls && P: && CD ~path~ && deno run --allow-all --watch ~filenameWithNo~
	
*/


/*

*/

`;
const filenameFromMozillaArray: Array<string> = 'console,atob,btoa,fetch,textEncoder,textDecoder,textEncoderStream'.
concat(',textDecoderStream,performance,crypto,subtleCrypto,webSocket,setTimeout,streams_API,URLPattern').split(',');
await filenameFromMozillaArray.forEach((name, index) => {
	const filenameWithNo = '0'.concat((index + noOffset).toString()).slice(-2).concat('_', name, '.ts');
	const filenameShort = name;
	const filenameFull = goalPath.concat(filenameWithNo);
	createTsFile(filenameFull, template, {
		filenameFull: { reg: /~filenameFull~/g, value: filenameFull },
		filenameWithNo: { reg: /~filenameWithNo~/g, value: filenameWithNo },
		filenameShort: { reg: /~filenameShort~/g, value: filenameShort },
		path: { reg: /~path~/g, value: getPath(filenameFull).replace(/\//g, '\\') },
	});
});
noOffset = filenameFromMozillaArray.length + 1;

// 第三批：参考Web API（来自于deno官网）
goalPath = 'P:/2022/20220613a/3code/9_tools/deno/deploy/0501_ApiReference/';
template = `/*
	https://deno.com/deploy/docs/runtime-api
	https://doc.deno.land/deno/stable/~/Deno.~filenameShort~
	
	cls && P: && CD ~path~ && deno run --allow-all --watch ~filenameWithNo~
	
*/


/*

*/

`;
'console,atob,btoa,fetch,textEncoder,textDecoder,textEncoderStream,textDecoderStream,performance,crypto,subtleCrypto'
.concat(',webSocket,setTimeout,streams_API,URLPattern')
.split(',').forEach((name, index) => {
	const filenameWithNo = '0'.concat((index + noOffset).toString()).slice(-2).concat('_', name, '.ts');
	const filenameShort = name;
	const filenameFull = goalPath.concat(filenameWithNo);
	createTsFile(filenameFull, template, {
		filenameFull: { reg: /~filenameFull~/g, value: filenameFull },
		filenameWithNo: { reg: /~filenameWithNo~/g, value: filenameWithNo },
		filenameShort: { reg: /~filenameShort~/g, value: filenameShort },
		path: { reg: /~path~/g, value: getPath(filenameFull).replace(/\//g, '\\') },
	});
});
noOffset = 1;

// 第四批：文件操作标准库（来自于deno官网）
goalPath = 'P:/2022/20220613a/3code/9_tools/deno/deploy/0701_std_fs/';
template = `/*
	https://deno.land/std/fs/mod.ts
	https://deno.land/std/fs/mod.ts?s=~filenameShort~
	
	cls && P: && CD ~path~ && deno run --allow-all --watch ~filenameWithNo~
	
*/


/*

*/

`;
'copy,copySync,detect,emptyDir,emptyDirSync,ensureDir,ensureDirSync,ensureFile,ensureFileSync,ensureLink,ensureLinkSync'
.concat(
	',ensureSymlink,ensureSymlinkSync,exists_deprecated,existsSync_deprecated,expandGlob,expandGlobSync,format',
	',move,moveSync,walk,walkSync',
).split(',').forEach((name, index) => {
	const filenameWithNo = '0'.concat((index + noOffset).toString()).slice(-2).concat('_', name, '.ts');
	const filenameShort = name.replace('_deprecated', '');
	const filenameFull = goalPath.concat(filenameWithNo);
	createTsFile(filenameFull, template, {
		filenameFull: { reg: /~filenameFull~/g, value: filenameFull },
		filenameWithNo: { reg: /~filenameWithNo~/g, value: filenameWithNo },
		filenameShort: { reg: /~filenameShort~/g, value: filenameShort },
		path: { reg: /~path~/g, value: getPath(filenameFull).replace(/\//g, '\\') },
	});
});
