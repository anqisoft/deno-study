/*
	功能：统计SFC格式的vue3文件（使用setup语法糖）中所定义的所有props名称（以<template></template>段处理）
	版本：
				2022-09-22 安启 归档
	用法（二选一）：
	deno run --allow-read --allow-write P:\2022\20220613a\3code\9_tools\deno\vueHelper\getPropsFromTemplate.ts
	cls && deno run --allow-read --allow-write P:\2022\20220613a\3code\9_tools\deno\vueHelper\getPropsFromTemplate.ts
	
*/

/** 源目录 */
const SOURCE_PATH: string = 'P:/2022/20220613a/3code/8_components/dishanqian-base/src/components/dishanqian/';
/** 结果目录 */
const GOAL_PATH: string = 'P:/2022/20220613a/3code/8_components/doc/dishanqian-base/';

/**
	* 解析SFC格式的vue文件 
	* @params filename 文件名（不包含目录）
	*/
async function parseVueFile(filename: string): void {
	// 原始文件全路径名
	const originalFileFullName: string = SOURCE_PATH.concat(filename);
	
	// 获取"<template>"与“\n</template>”中间的内容
	const originalContent: string = (await Deno.readTextFile(originalFileFullName)).replace('\n</template>\n', '厶').split('厶')[1].replace('\n</template>', '\n</template>厶').split('厶')[0];
	
	// await console.log(originalContent.substring(0, 100));
	// 注意：不能用/gi，如果加上i则表示不区分大小写，会导致in"被误判断
	const segsArray: Array<string> = originalContent.replace(/[ ,\[\]\(\):\?\{\}]/g, '"').replace(/In"/g, 'In厶').split('厶');
	// 注意：最后一段需舍弃，所以这里要减2而不是1
	const maxIndex: number = segsArray.length - 2;
	
	const result: Array<string> = [];
	for(let i = 0; i < maxIndex; ++i) {
		const itemSegs: Array<string> = segsArray[i].split('"');
		const item: string = itemSegs[itemSegs.length - 1];
		if (result.indexOf(item) === -1) {
			result.push(item);
		}
	}
	
	const goalFileFullName: string = GOAL_PATH.concat(filename.replace('.vue', '.props.txt'));
	
	await Deno.writeTextFile(goalFileFullName, result.join('\n'));
}

// parseVueFile('DsqListPage.vue');
// 'DsqListPage,DsqItemDialog'.split(',').forEach((filename: string) => parseVueFile(filename.concat('.vue')));
'DsqListPage'.split(',').forEach((filename: string) => parseVueFile(filename.concat('.vue')));

