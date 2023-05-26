/*
	功能：生成良师益友相关图片
	版本：
				2022-12-09 安启 新建
	说明：
	用法（二选一）：
	deno run --allow-read --allow-write --allow-net P:\2022\20220613a\3code\9_tools\deno\imageHelper\createTeacherImages.ts
	cls && deno run --allow-read --allow-write --allow-net P:\2022\20220613a\3code\9_tools\deno\imageHelper\createTeacherImages.ts
	
	查看注释
	P: && CD P:\2022\20220613a\3code\9_tools\deno\imageHelper\ && deno doc createTeacherImages.ts
*/
	
/* 引入第三方库 */
import { qrcode } from 'https://deno.land/x/qrcode@v2.0.0/mod.ts';

// import * as qrcodeStd from 'https://deno.land/x/qrcode_std@v0.0.0/mod.ts';
import { decode } from 'https://deno.land/x/fetchbase64@1.0.0/deps.ts';
import {
  ImageMagick,
  IMagickImage,
  initializeImageMagick,
  MagickFormat,
} from 'https://deno.land/x/imagemagick_deno/mod.ts';

const GOAL_PATH: string = 'P:/ecs_person/websites/sonya.cc/edu_git/src/images/1home/teachers/';
const IS_PNG = true;
const MAGICK_FORMAT = IS_PNG ? MagickFormat.Png : MagickFormat.Jpeg;
const FILE_EXTENSION = IS_PNG ? '.png': '.jpg';

await initializeImageMagick();

// // Randomize failed. Sometimes, all are right.
// [
//   { name: 'khanacademy', link: 'https://www.khanacademy.org/' },
//   { name: 'mozilla', link: 'https://developer.mozilla.org/en-US/' },
//   { name: 'typescript', link: 'https://www.typescriptlang.org/' },
//   { name: 'deno', link: 'https://deno.land/' },
//   { name: 'canonCreativePark', link: 'https://creativepark.canon/sc/index.html' },
//   { name: 'unicef', link: 'https://www.unicef.cn/' },
//   { name: 'cctf', link: 'https://www.cctf.org.cn/' },
//   { name: 'kidsNationalGeographic', link: 'https://kids.nationalgeographic.com/' },
//   { name: 'vuejs', link: 'https://vuejs.org/' },
//   { name: 'threejs', link: 'https://threejs.org/' },
//   { name: 'fontawesome', link: 'https://fontawesome.com/' },
//   { name: 'echarts', link: 'https://echarts.apache.org/' },
//   { name: 'element-plus', link: 'https://element-plus.gitee.io/en-US/' },
// ].forEach(({ name, link }) => {
// 	qrcode(link, { size: 100 }).then((encodedResult) => {
// 		const decodeResult: Uint8Array = decode(encodedResult.replace(/^data:image\/\w+;base64,/, ''), 'base64'); 
// 		
// 		ImageMagick.read(decodeResult, (img: IMagickImage) => {
// 			img.resize(100, 100);
// 
// 			img.write(
// 				(data: Uint8Array) => Deno.writeFile(GOAL_PATH.concat(name, FILE_EXTENSION), data),
// 				MAGICK_FORMAT,
// 			);
// 		});
// 	});
// });

// https://www.atatus.com/blog/introduction-to-async-await-in-typescript/
// function createQrCode(name: string, link: string) {
// }

async function create(name: string, link: string) {
	// console.log(`create('${name}', '${link}')`);
	const encodedResult = await qrcode(link, { size: 100 });
	// console.log(encodedResult);
	
	const decodeResult: Uint8Array = decode(encodedResult.replace(/^data:image\/\w+;base64,/, ''), 'base64'); 
	
	await ImageMagick.read(decodeResult, (img: IMagickImage) => {
		img.resize(100, 100);

		img.write(
			(data: Uint8Array) => Deno.writeFile(GOAL_PATH.concat(name, FILE_EXTENSION), data),
			MAGICK_FORMAT,
		);
	});
}

[
  { name: 'khanacademy', link: 'https://www.khanacademy.org/' },
  { name: 'mozilla', link: 'https://developer.mozilla.org/en-US/' },
  { name: 'typescript', link: 'https://www.typescriptlang.org/' },
  { name: 'deno', link: 'https://deno.land/' },
  { name: 'canonCreativePark', link: 'https://creativepark.canon/sc/index.html' },
  { name: 'unicef', link: 'https://www.unicef.cn/' },
  { name: 'cctf', link: 'https://www.cctf.org.cn/' },
  { name: 'kidsNationalGeographic', link: 'https://kids.nationalgeographic.com/' },
  { name: 'vuejs', link: 'https://vuejs.org/' },
  { name: 'threejs', link: 'https://threejs.org/' },
  { name: 'fontawesome', link: 'https://fontawesome.com/' },
  { name: 'echarts', link: 'https://echarts.apache.org/' },
  { name: 'element-plus', link: 'https://element-plus.gitee.io/en-US/' },
].forEach(({ name, link }) => { create(name, link); });
