/*
	功能：周计划助手（Windows）
	版本：
				2022-09-26 安启 新建
	说明：请先正确配置目录、模板、替换信息等参数
	缺陷：所生成的配套批处理文件的编码为utf-8，目前还没能找到办法修改为ANSI
	用法（二选一）：
	deno run --allow-read --allow-write --allow-net P:\2022\20220613a\3code\9_tools\deno\fileHelper\pdcaHelper.ts
	cls && deno run --allow-read --allow-write --allow-net P:\2022\20220613a\3code\9_tools\deno\fileHelper\pdcaHelper.ts
	
	::查看注释
	P: && CD P:\2022\20220613a\3code\9_tools\deno\fileHelper\ && deno doc pdcaHelper.ts
	
	相关网址：
	https://deno.com/deploy/docs/runtime-fs cwd/readDir/readFile/readTextFile/open/stat/lstat/realPath
	https://deno.land/std@0.157.0/fs/mod.ts
		copy/copySync/detect/emptyDir/emptyDirSync/ensureDir/ensureDirSync/ensureFile/ensureFileSync/
		ensureLink/ensureLinkSync/ensureSymlink/ensureSymlinkSync/
		exists（过时）/existsSync（过时）/expandGlob/expandGlobSync/format/move/moveSync/walk/walkSync
	
	https://www.cnblogs.com/livelab/p/14111142.html
*/

import { ensureFile } from 'https://deno.land/std/fs/mod.ts';

/** PDCA根目录 */
const PDCA_ROOT_PATH = 'P:/0/000000/PDCA/';
/** 家庭计划模板文件 */
const PDCA_FAMILY_TEMPLATE = PDCA_ROOT_PATH.concat('templates/family.txt');
/** 工作计划模板文件 */
const PDCA_WORK_TEMPLATE = PDCA_ROOT_PATH.concat('templates/work.txt');
/** 计划转总结的批处理文件路径 */
const BAT_FILE_FULL_NAME = PDCA_ROOT_PATH.concat('convertPlanToLog.bat');

/** 创建计划文件（如果文件夹不存在，则自动创建） */
export async function createPlanFiles(): void {
	const now = new Date();
	const yearSeg = now.getFullYear().toString();
	const monthSeg = '0'.concat((now.getMonth() + 1).toString()).substr(-2);
	const goalPath = PDCA_ROOT_PATH.concat(yearSeg, '/', monthSeg, '/');
	
	let sunday = new Date();
	sunday.setTime(now.getTime()  + 1000 * 60 * 60 * 24 * 6);
	const period = yearSeg.concat(
		monthSeg, '0'.concat((now.getDate()).toString()).substr(-2),
		'-', '0'.concat((sunday.getMonth() + 1).toString()).substr(-2), '0'.concat((sunday.getDate()).toString()).substr(-2),
	);
	const familyFilename = goalPath.concat(period, '家庭计划.txt');
	const workFilename = goalPath.concat(period, '工作计划.txt');
	
	// 如果文件不存在，则自动创建0字节的文件（如果文件夹不存在，则自动创建文件夹）
	await ensureFile(familyFilename);
	await ensureFile(workFilename);
	
	let familyContent = await Deno.readTextFile(PDCA_FAMILY_TEMPLATE);
	familyContent.replace(/~period~/g, period);
	
	let workContent = await Deno.readTextFile(PDCA_WORK_TEMPLATE);
	workContent.replace(/~period~/g, period);
	
	// 写入文件
	if ((await Deno.stat(familyFilename)).size === 0) { await Deno.writeTextFile(familyFilename, familyContent); }
	if ((await Deno.stat(workFilename)).size === 0) { await Deno.writeTextFile(workFilename, workContent); }
	
	const batContent = `@ECHO OFF
COPY "${familyFilename}" "${familyFilename.replace('计划.txt', '总结.txt')}"
COPY "${workFilename}" "${workFilename.replace('计划.txt', '总结.txt')}"
`.replace(/\//g, "\\");
	await Deno.writeTextFile(BAT_FILE_FULL_NAME, batContent);
	
	// 输出相关dos命令，方便打开（本命令适用于Windows）
	console.log('notepad "'.concat(familyFilename.replace(/\//g, "\\"), '"'));
	console.log('notepad "'.concat(workFilename.replace(/\//g, "\\"), '"'));
	console.log('notepad "'.concat(BAT_FILE_FULL_NAME.replace(/\//g, "\\"), '"'));
}

createPlanFiles();

