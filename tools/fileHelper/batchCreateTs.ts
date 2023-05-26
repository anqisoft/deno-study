/*
	功能：批量创建用于deno的相关ts文件
	版本：
				2022-09-24 安启 新建
				2022-09-25 安启 升级：replaceInfos中直接配置正则替换信息；跳过已存在的文件；文件目录如果不存在，则自动创建
	说明：请先正确配置目录、模板、替换信息等参数
	用法（二选一）：
	deno run --allow-read --allow-write --allow-net P:\2022\20220613a\3code\9_tools\deno\fileHelper\batchCreateTs.ts
	cls && deno run --allow-read --allow-write --allow-net P:\2022\20220613a\3code\9_tools\deno\fileHelper\batchCreateTs.ts
	
	::查看注释
	P: && CD P:\2022\20220613a\3code\9_tools\deno\fileHelper\ && deno doc batchCreateTs.ts
	
	相关网址：
	https://deno.com/deploy/docs/runtime-fs cwd/readDir/readFile/readTextFile/open/stat/lstat/realPath
	https://deno.land/std@0.157.0/fs/mod.ts
		copy/copySync/detect/emptyDir/emptyDirSync/ensureDir/ensureDirSync/ensureFile/ensureFileSync/
		ensureLink/ensureLinkSync/ensureSymlink/ensureSymlinkSync/
		exists（过时）/existsSync（过时）/expandGlob/expandGlobSync/format/move/moveSync/walk/walkSync
	
	https://www.cnblogs.com/livelab/p/14111142.html
*/

import { ensureDir, ensureFile } from 'https://deno.land/std/fs/mod.ts';

/**
	* 获取文件目录
	* @params filename 文件名（含目录和扩展名）
	* @returns 文件所在目录（以/作为分隔符）
	*/
export function getPath(filename: string): string {
	const path: string = filename.replace(/\\/g, '/');
	return path.substring(0, path.lastIndexOf('/'));
}

/**
	* 创建文件（如果文件夹不存在，则自动创建）
	* @params filenameFull 文件名（含目录和扩展名）
	* @params template 内容模板
	* @params replaceInfos 正则替换
	*/
export async function createTsFile(filenameFull: string, template: string, replaceInfos: object): void {
	// 结果文件全路径名	
	const goalFileFullName: string = filenameFull.indexOf(':') > -1 ? filenameFull : Deno.cwd().concat(filenameFull);
	
	// 如果文件夹不存在，则自动创建——代码是自动创建0字节的文件及其文件夹
	await ensureFile(goalFileFullName);
	
	// 注意：
	// 1. Deno.stat(goalFileFullName)得到的是Promise，所以要加await
	// 2. 不能通过!(await Deno.stat(goalFileFullName)).size来判断是否已有内容，必须判断其是否大于0
	if ((await Deno.stat(goalFileFullName)).size > 0) { return; }
	
	// // 确保文件夹存在——ensureFile已经确保文件夹存在了，无需再判断或创建目录
	// await ensureDir(getPath(goalFileFullName));
	
	// 正则替换
	let content: string = template;
	for(let key in replaceInfos) { 
		const outerValue = replaceInfos[key];
		content = content.replace(outerValue.reg, outerValue.value); 
	};
	
	// console.log(goalFileFullName, content);
	// 写入文件
	await Deno.writeTextFile(goalFileFullName, content);
	
	// 输出相关dos命令，方便打开（本命令适用于Windows）
	console.log('notepad "'.concat(goalFileFullName, '"'));
}
// getPath('P:\\2022\\20220613a\\3code\\9_tools\\deno\\fileHelper\\');

/** 目录 */
let goalPath: string = '';
/** 内容模板 */
let template: string = '';
/** 序号偏移值 */
let noOffset: number = 1;

// 第一批，Deno官方自带的文件系统API
goalPath = 'P:/test/20220613a/3code/9_tools/deno/deploy/0508_FileSystemApi/';
template = `/*
	https://deno.com/deploy/docs/runtime-fs
	
	cls && P: && CD ~path~ && deno run --allow-all --watch ~filenameWithNo~
	
*/


/*

*/ Result:

`;
await ensureDir(goalPath);
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
goalPath = 'P:/test/20220613a/3code/9_tools/deno/deploy/0501_ApiReference/';
template = `/*
	https://developer.mozilla.org/en-US/docs/Web/API/~filenameShort~
	
	cls && P: && CD ~path~ && deno run --allow-all --watch ~filenameWithNo~
	
*/


/*

*/

`;
const filenameFromMozillaArray: Array<string> = 'console,atob,btoa,fetch,textEncoder,textDecoder,textEncoderStream'.
concat(',textDecoderStream,performance,crypto,subtleCrypto,webSocket,setTimeout,streams_API,URLPattern').split(',');
await ensureDir(goalPath);
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
goalPath = 'P:/test/20220613a/3code/9_tools/deno/deploy/0501_ApiReference/';
template = `/*
	https://developer.mozilla.org/en-US/docs/Web/API/Deno.~filenameShort~
	
	cls && P: && CD ${goalPath.replace(/\//g, '\\')} && deno run --allow-all --watch ~filenameWithNo~
	
*/


/*

*/

`;
await ensureDir(goalPath);
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


/*
	cls && rd /s/q P:\test\ && deno run --allow-read --allow-write --allow-net P:\2022\20220613a\3code\9_tools\deno\fileHelper\batchCreateTs.ts
	或​
  cls && ​deno run --allow-read --allow-write --allow-net P:\2022\20220613a\3code\9_tools\deno\fileHelper\batchCreateTs.ts
*/

