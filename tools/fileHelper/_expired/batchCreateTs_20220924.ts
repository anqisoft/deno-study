/*
	功能：批量创建ts文件
	版本：
				2022-09-24 安启 新建
	说明：请先正确配置目录、模板、替换信息等参数
	用法（二选一）：
	deno run --allow-read --allow-write --allow-net P:\2022\20220613a\3code\9_tools\deno\fileHelper\batchCreateTs.ts
	cls && deno run --allow-read --allow-write --allow-net P:\2022\20220613a\3code\9_tools\deno\fileHelper\batchCreateTs.ts
	
	::查看注释
	P: && CD P:\2022\20220613a\3code\9_tools\deno\fileHelper\ && deno doc batchCreateTs.ts
*/

import { ensureDir, ensureDirSync } from "https://deno.land/std/fs/mod.ts";

/**
	* 创建文件
	* @params filename 文件名（含目录和扩展名）
	* @params template 内容模板
	* @params replaceInfos 替换项
	* @params filenameMid 文件名加扩展名（不包括路径）
	* @params filenameShort 文件名（不包括路径、扩展名，以及前面的数字和相应的下划线）
	*/
export async function createTsFile(filename: string, template: string, replaceInfos: object, filenameMid: string, filenameShort: string): void {
	let content: string = template;
	for(let key in replaceInfos) {
		switch(key) {
			case '~filename~':
				content = content.replace(/~filename~/g, filename);
				break;
			case '~filenameMid~':
				content = content.replace(/~filenameMid~/g, filenameMid);
				break;
			case '~filenameShort~':
				content = content.replace(/~filenameShort~/g, filenameShort);
				break;
			default:
				break;
		}
	};
	
	// 结果文件全路径名
	// const goalFileFullName: string = GOAL_PATH.concat(filename, '.ts');
	// await Deno.writeTextFile(goalFileFullName, content);
	
	const goalFileFullName: string = filename;
	await Deno.writeTextFile(goalFileFullName, content);
	
	// 输出相关dos命令，方便打开（本命令适用于Windows）
	console.log('notepad "'.concat(goalFileFullName, '"'));
}

/** 目录 */
let goalPath: string = '';
/** 内容模板 */
let template: string = '';
/* 替换信息 */
let replaceInfos: object = {};

// // goalPath = 'P:/2022/20220613a/3code/9_tools/deno/deploy/0508_FileSystemApi/';
// goalPath = 'P:/test/20220613a/3code/9_tools/deno/deploy/0508_FileSystemApi/';
// template = `/*
	// https://deno.com/deploy/docs/runtime-fs
	
	// cls && P: && CD ${goalPath.replace(/\//g, '\\')} && deno run --allow-all --watch ~filenameMid~
	
// */


// /*

// */

// `;
// replaceInfos = {
	// '~filename~': 'filename',
	// '~filenameMid~': 'filenameMid',
	// '~filenameShort~': 'filenameShort',
// };
// await ensureDir(goalPath);
// 'cwd,readDir,readFile,readTextFile,open,File,stat,lstat,FileInfo,realPath'
// .split(',').forEach((name, index) => {
	// const filenameMid = '0'.concat((index + 1).toString()).slice(-2).concat('_', name, '.ts');
	// const filenameShort = name;
	// const filename = goalPath.concat(filenameMid);
	// createTsFile(filename, template, replaceInfos, filenameMid, filenameShort);
// });
// /*
	// notepad "P:/2022/20220613a/3code/9_tools/deno/deploy/0508_FileSystemApi/01_cwd.ts"
	// notepad "P:/2022/20220613a/3code/9_tools/deno/deploy/0508_FileSystemApi/03_readFile.ts"
	// notepad "P:/2022/20220613a/3code/9_tools/deno/deploy/0508_FileSystemApi/02_readDir.ts"
	// notepad "P:/2022/20220613a/3code/9_tools/deno/deploy/0508_FileSystemApi/04_readTextFile.ts"
	// notepad "P:/2022/20220613a/3code/9_tools/deno/deploy/0508_FileSystemApi/06_File.ts"
	// notepad "P:/2022/20220613a/3code/9_tools/deno/deploy/0508_FileSystemApi/05_open.ts"
	// notepad "P:/2022/20220613a/3code/9_tools/deno/deploy/0508_FileSystemApi/07_stat.ts"
	// notepad "P:/2022/20220613a/3code/9_tools/deno/deploy/0508_FileSystemApi/09_FileInfo.ts"
	// notepad "P:/2022/20220613a/3code/9_tools/deno/deploy/0508_FileSystemApi/10_realPath.ts"
	// notepad "P:/2022/20220613a/3code/9_tools/deno/deploy/0508_FileSystemApi/08_lstat.ts"
// */

// // goalPath = 'P:/2022/20220613a/3code/9_tools/deno/deploy/0501_ApiReference/';
// goalPath = 'P:/test/20220613a/3code/9_tools/deno/deploy/0501_ApiReference/';
// template = `/*
	// https://developer.mozilla.org/en-US/docs/Web/API/~filenameShort~
	
	// cls && P: && CD ${goalPath.replace(/\//g, '\\')} && deno run --allow-all --watch ~filenameMid~
	
// */


// /*

// */

// `;
// replaceInfos = {
	// '~filename~': 'filename',
	// '~filenameMid~': 'filenameMid',
	// '~filenameShort~': 'filenameShort',
// };
// await ensureDir(goalPath);
// 'console,atob,btoa,fetch,textEncoder,textDecoder,textEncoderStream,textDecoderStream,performance,crypto,subtleCrypto,webSocket,setTimeout,streams_API,URLPattern'
// .split(',').forEach((name, index) => {
	// const filenameMid = '0'.concat((index + 1).toString()).slice(-2).concat('_', name, '.ts');
	// const filenameShort = name;
	// const filename = goalPath.concat(filenameMid);
	// createTsFile(filename, template, replaceInfos, filenameMid, filenameShort);
// });

// goalPath = 'P:/2022/20220613a/3code/9_tools/deno/deploy/0501_ApiReference/';
goalPath = 'P:/test/20220613a/3code/9_tools/deno/deploy/0501_ApiReference/';
template = `/*
	https://developer.mozilla.org/en-US/docs/Web/API/Deno.~filenameShort~
	
	cls && P: && CD ${goalPath.replace(/\//g, '\\')} && deno run --allow-all --watch ~filenameMid~
	
*/


/*

*/

`;
replaceInfos = {
	'~filename~': 'filename',
	'~filenameMid~': 'filenameMid',
	'~filenameShort~': 'filenameShort',
};
await ensureDir(goalPath);
'console,atob,btoa,fetch,textEncoder,textDecoder,textEncoderStream,textDecoderStream,performance,crypto,subtleCrypto,webSocket,setTimeout,streams_API,URLPattern'
.split(',').forEach((name, index) => {
	const filenameMid = '0'.concat((index + 16).toString()).slice(-2).concat('_', name, '.ts');
	const filenameShort = name;
	const filename = goalPath.concat(filenameMid);
	createTsFile(filename, template, replaceInfos, filenameMid, filenameShort);
});


