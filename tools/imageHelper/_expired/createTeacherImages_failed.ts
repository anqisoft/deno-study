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
	
	基础库：
		deno第三方库ImageScript
			文档：https://deno.land/x/imagescript@v1.2.14 https://imagescript.dreadful.tech/ImageScript.js
			源码：https://github.com/matmen/ImageScript/
	参考网址：https://github.com/matmen/ImageScript/tree/master/tests
	
	注意：deno直接用Deno.readFile与Deno.writeFile，不需要引入上述参考网址里面的fs
	
	// https://deno.land/x/qrcode_terminal@v1.1.1
	
	// https://deno.land/x/qrcode_std@v0.0.0/mod.ts The documentation for this module is currently unavailable.
*/

console.log('test2');
	
/* 引入第三方库 */
import * as imagescript from "https://deno.land/x/imagescript@v1.2.14/mod.ts";
// import * as qrcodeStd from "https://deno.land/x/qrcode_std@v0.0.0/mod.ts";
// import * as qrcode from "https://deno.land/x/qrcode@v2.0.0/mod.ts";
import { qrcode } from "https://deno.land/x/qrcode@v2.0.0/mod.ts";
import { decode } from "https://deno.land/x/fetchbase64@1.0.0/deps.ts";



/** 结果目录 */
const GOAL_PATH: string = 'P:/2022/20220613a/3code/9_tools/deno/imageHelper/2_qrcode/';

const { Image } = imagescript;

// qrcode("bitcoin:ADDRESS?amount=0.5&label=ORDER");
// const fixedSizeImage = qrcode("bitcoin:ADDRESS?amount=0.5&label=ORDER", { size: 500 });
const homeQrCode = qrcode('http://edu.sonya.cc', { size: 100 });
console.log(homeQrCode);

const decodeResult: Uint8Array = await decode(homeQrCode);
// const decodeResult: Uint8Array = await decode(homeQrCode);

// Base64Decoder decoder = new Base64Decoder();
// try {
// 	
// }
// const originalImage = await Image.decode(decodeResult);
// const originalImage = await Image.decode(Buffer.from(homeQrCode.replace(/^data:image\/\w+;base64,/, ''), 'base64'));

// const encoded = await originalImage.encode(1, {creationTime: 0, software: ''});
// await Deno.writeFile(goalFileFullName, encoded);
// await Deno.writeFile(GOAL_PATH.concat('home/png'), encoded);
// await Deno.writeFile(GOAL_PATH.concat('home/png'), homeQrCode);
await Deno.writeFile(GOAL_PATH.concat('home/png'), decodeResult);

// var base64Data = homeQrCode.replace(/^data:image\/\w+;base64,/, "");
// // 返回一个被 string 的值初始化的新的 Buffer 实例,原始二进制数据存储在 Buffer 类的实例中，        一个 Buffer 类似于一个整数数组，但它对应于 V8 堆内存之外的一块原始内存。
// var dataBuffer = Buffer.from(base64Data, 'base64');
// fs.writeFile("image.png", dataBuffer, function(err) {
// 		if(err){
// 			res.send(err);
// 		}else{
// 			res.send("保存成功！");
// 		}
// });
// 
// 
// console.log('2');