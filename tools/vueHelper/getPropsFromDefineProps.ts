/*
	功能：统计SFC格式的vue3文件（使用setup语法糖）中所定义的所有props名称（以defineProps({...});段处理）
	版本：
				2022-09-22 安启 新建（根据getPropsFromTemplate.ts改写）
	用法（二选一）：
	deno run --allow-read --allow-write P:\2022\20220613a\3code\9_tools\deno\vueHelper\getPropsFromDefineProps.ts
	cls && deno run --allow-read --allow-write P:\2022\20220613a\3code\9_tools\deno\vueHelper\getPropsFromDefineProps.ts
	
	deno doc P:\2022\20220613a\3code\9_tools\deno\vueHelper\getPropsFromDefineProps.ts
	
*/

/** 源目录 */
const SOURCE_PATH: string = 'P:/2022/20220613a/3code/8_components/dishanqian-base/src/components/dishanqian/';
/** 结果目录 */
const GOAL_PATH: string = 'P:/2022/20220613a/3code/8_components/doc/dishanqian-base/';

/**
	* 解析SFC格式的vue文件 
	* @params filename 文件名（不包含目录）
	*/
export async function parseVueFile(filename: string): void {
	// 原始文件全路径名
	const originalFileFullName: string = SOURCE_PATH.concat(filename);
	
	// 获取"defineProps({"与“\n});”中间的内容
	const originalContent: string = (await Deno.readTextFile(originalFileFullName))
	
		// 去掉前面的段
		.replace('defineProps({', '厶').split('厶')[1]
		// 去掉后面的段（注意：后面需要保留一个\n，避免最后一行为单行注释时无法替换）
		.replace('\n});', '\n厶').split('厶')[0]
		
		// 统一换行符
		.replace(/\r\n/g, '\n').replace(/\r/g, '\n')
		
		// 去掉空格与制表符
		.replace(/[ \t]/g, '')
		
		// 去掉多行注释
		.replace(/\/\*.*\*\//g, '')
		// 去掉单行注释
		.replace(/\/\/[^\n]*\n/g, '')
		
		// 去掉空行
		.replace(/\n{2,1000}/g, '\n')
	;
	// console.log(originalContent);
	
	// 定义结果数组
	const propArray: Array<string> = [];
	
	// 以\n拆分
	const lineArray: Array<string> = originalContent.split('\n');
	lineArray.forEach((line: string) => {
		if (line.length) {
			const prop: string = line.split(':')[0];
			if (propArray.indexOf(prop) === -1) {
				propArray.push(prop);
			}
		}
	});
	// console.log(propArray.join('/'));
	
	// 结果文件全路径名
	const goalFileFullName: string = GOAL_PATH.concat(filename.replace('.vue', '.props.txt'));
	// 写入结果
	await Deno.writeTextFile(goalFileFullName, propArray.join('\n'));
	// 输出相关dos命令，方便打开
	console.log('notepad "'.concat(goalFileFullName, '"'));
}

/* 调用相关代码（单个文件直接调用，或列出文件名清单再调用） */
// parseVueFile('DsqListPage.vue');
// parseVueFile('DsqItemDialog.vue');

'DsqListPage,DsqItemDialog'.split(',').forEach((filename: string) => parseVueFile(filename.concat('.vue')));
