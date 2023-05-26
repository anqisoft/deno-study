/*
	功能：截取手机截图有效部分（只去顶、只去底、去顶去底，这三种情况）——因刚开始使用deno，暂不支持遍历文件夹
	版本：
				2022-09-23 安启 新建
	说明：使用前请先确定您的手机截图需去掉的顶底高度，并且以同一种方式截图（建议长截图时不进行裁切，这样可以
				保持原样。能一次性截图的，去顶底；不能一次性截图的，分别去顶和去底，必要再用工具合并成同一图片）。
	用法（二选一）：
	deno run --allow-read --allow-write --allow-net P:\2022\20220613a\3code\9_tools\deno\imageHelper\cropPhoneScreenshots.ts
	cls && deno run --allow-read --allow-write --allow-net P:\2022\20220613a\3code\9_tools\deno\imageHelper\cropPhoneScreenshots.ts
	
	查看注释
	P: && CD P:\2022\20220613a\3code\9_tools\deno\imageHelper\ && deno doc cropPhoneScreenshots.ts
	
	基础库：
		deno第三方库ImageScript
			文档：https://deno.land/x/imagescript@v1.2.14 https://imagescript.dreadful.tech/ImageScript.js
			源码：https://github.com/matmen/ImageScript/
	参考网址：https://github.com/matmen/ImageScript/tree/master/tests
	
	注意：deno直接用Deno.readFile与Deno.writeFile，不需要引入上述参考网址里面的fs
*/

/* 引入第三方库 */
import * as imagescript from "https://deno.land/x/imagescript@v1.2.14/mod.ts";
const { Image } = imagescript;

/** 需去掉的顶部高度 */
const CROP_HEIGHT_OF_HEADER: number = 215;
/** 需去掉的底部高度 */
const CROP_HEIGHT_OF_FOOTER: number = 127;

/** 源目录 */
const SOURCE_PATH: string = 'P:/2022/20220613a/3code/9_tools/deno/imageHelper/0_original/';
/** 结果目录 */
const GOAL_PATH: string = 'P:/2022/20220613a/3code/9_tools/deno/imageHelper/1_goal/';

/** 裁切方式 */
export enum CropKind {
	/** 不裁切 */
	none: 0,
	/** 只去顶 */
	onlyHeader: 1,
	/** 只去底 */
	onlyFooter: 2,
	/** 去顶去底 */
	both: 3,
}

/**
	* 解析SFC格式的vue文件 
	* @params filename 文件名（不包含目录）
	*/
export async function crop(filename: string, cropKind: CropKind): void {
	// 如果不需要裁切，则跳过
	if (cropKind === CropKind.none) { return; }
	
	// 原始文件全路径名
	const originalFileFullName: string = SOURCE_PATH.concat(filename);
	
	// 读取原始图片
	const [originalImageData] = await Promise.all([
		Deno.readFile(originalFileFullName),
	]);
	const originalImage = await Image.decode(originalImageData);
	
	// 原始图片宽度
	const originalWidth = originalImage.width;
	// 原始图片高度
	const originalHeight = originalImage.height;
	// console.log(originalWidth, originalHeight);
	
	// crop(x, y, width, height)
	const x = 0;
	const y = cropKind === CropKind.onlyFooter ? 0 : CROP_HEIGHT_OF_HEADER;
	const width = originalWidth;
	const height = originalHeight - y - (cropKind === CropKind.onlyHeader ? 0 : CROP_HEIGHT_OF_FOOTER);
	const goalImage: Image = originalImage.crop(x, y, width, height);
	
	// 结果文件全路径名
	const goalFileFullName: string = GOAL_PATH.concat(filename);
	// 写入结果
	const encoded = await goalImage.encode(1, {creationTime: 0, software: ''});
	await Deno.writeFile(goalFileFullName, encoded);
	
	// 输出相关dos命令，方便打开（本命令适用于Windows）
	// console.log('explorer "'.concat(goalFileFullName, '"'));
}

/* 调用相关代码 */
for(let i = 1; i < 11; ++i) {
	crop('both ('.concat(i.toString(), ').jpg'), CropKind.both);
}

