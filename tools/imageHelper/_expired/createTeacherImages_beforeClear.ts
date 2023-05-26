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
	
/* 引入第三方库 */
import { qrcode } from "https://deno.land/x/qrcode@v2.0.0/mod.ts";

import * as imagescript from "https://deno.land/x/imagescript@v1.2.14/mod.ts";
// import * as qrcodeStd from "https://deno.land/x/qrcode_std@v0.0.0/mod.ts";
// import * as qrcode from "https://deno.land/x/qrcode@v2.0.0/mod.ts";
import { decode } from "https://deno.land/x/fetchbase64@1.0.0/deps.ts";
import {
  ImageMagick,
  IMagickImage,
  initializeImageMagick,
  MagickFormat,
} from "https://deno.land/x/imagemagick_deno/mod.ts";

await initializeImageMagick();

/** 结果目录 */
const GOAL_PATH: string = 'P:/2022/20220613a/3code/9_tools/deno/imageHelper/2_qrcode/';

const { Image } = imagescript;

// qrcode("bitcoin:ADDRESS?amount=0.5&label=ORDER");
// const fixedSizeImage = qrcode("bitcoin:ADDRESS?amount=0.5&label=ORDER", { size: 500 });
const homeQrCode = qrcode('http://edu.sonya.cc', { size: 100 });
console.log(homeQrCode);

const goalFileFullName = GOAL_PATH.concat('home.png');

// const decodeResult: Uint8Array = await decode(homeQrCode);
// const decodeResult: Uint8Array = await decode(homeQrCode);

// Base64Decoder decoder = new Base64Decoder();
// try {
// 	
// }
// const originalImage = await Image.decode(decodeResult);
// const originalImage = await Image.decode(Buffer.from(homeQrCode.replace(/^data:image\/\w+;base64,/, ''), 'base64'));

// const originalImage = await Image.decode(decodeResult);
// const encoded = await originalImage.encode(1, {creationTime: 0, software: ''});
// await Deno.writeFile(goalFileFullName, encoded);
// await Deno.writeFile(GOAL_PATH.concat('home.png'), encoded);
// await Deno.writeFile(GOAL_PATH.concat('home.png'), homeQrCode);
// await Deno.writeFile(GOAL_PATH.concat('home.png'), decodeResult);

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

// https://github.com/helensy/base64-to-image/blob/master/index.js

/**
 * Change base64Str to image and write image file with 
   the specified file name to the specified file path.
 * @param {String} base64 string (mandatory)
 * @param {String} file path e.g. /opt/temp/uploads/ (mandatory)
 * @return {Object} optionsObj holds image type, image filename, debug e.g.{'fileName':fileName, 'type':type,'debug':true} (optional)
 * @public
 */
function base64ToImage(base64Str, path, optionalObj) {
    if (!base64Str || !path) {
        throw new Error('Missing mandatory arguments base64 string and/or path string');
    }

    var optionalObj = optionalObj || {};
    var imageBuffer = decodeBase64Image(base64Str);
    var imageType = optionalObj.type || imageBuffer.type || 'png';
    var fileName = optionalObj.fileName || 'img-' + Date.now();
    var abs;
    var fileName = '' + fileName;

    if (fileName.indexOf('.') === -1) {
        imageType = imageType.replace('image/', '');
        fileName = fileName + '.' + imageType;
    }

    abs = path + fileName;
    // fs.writeFile(abs, imageBuffer.data, 'base64', function(err) {
    //     if (err && optionalObj.debug) {
    //         console.log("File image write error", err);
    //     }
		// 
    // });
		// await Deno.writeFile(path, imageBuffer.data);
		Deno.writeFile(path, imageBuffer.data);
    // return {
    //     'imageType': imageType,
    //     'fileName': fileName
    // };
};

/**
 * Decode base64 string to buffer.
 *
 * @param {String} base64Str string
 * @return {Object} Image object with image type and data buffer.
 * @public
 */
function decodeBase64Image(base64Str) {
    var matches = base64Str.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
    var image = {};
    if (!matches || matches.length !== 3) {
        throw new Error('Invalid base64 string');
    }

    image.type = matches[1];
    image.data = new Buffer(matches[2], 'base64');

    return image;
}

homeQrCode.then((promise) => {
	// console.log(promise);				// data:image/gif;base64,R0lGODdhYwBjAIAAAAAAAP///ywAAAAAYwBjAAAC/4SPqcF6HF5LsFooo7mu+99h4QSIyIWSJge2LkUuarylbDlX72ffK43T1TSnnrBINB4zyowTdjQxjbKkEnjNPZE/4rRX/drCI+tyKB1uxVhtmezopoPzbvW2na/Vb3T7HLRHZwGnx4fkYQfFZibnhngIJ5j3x/h1GXloGLjYxwk5GEXoZ1YIJLjp2DgaSglo6tUJCquq6rrpmljp6ZOC+YnHe5oZOkZq/NnSu8qMzLjcRKwryvzMak0dnQyy/JsVuwOqCPw4Ph6ODpurWd4Onp5u7r5OXgpf/J3jXFbLmv//DZsyf1SOATyYzRc3gmAM5kM1bJvEad70WbQXZ1dGcP+4ZHUjVfEdsVQaB1ZjlxBjyH4cSwprmXIatIt1XG6EGJMfQ5aSpHn8Y+vlvlkLT8Lr2ArK0ElCI5o0WbPhzRdBjzoFiTLqRy7ukCJjWdXSSIa/ZJJ1GNYhTnmvlJ7FBzOYuIu3rsJlK3cpypBldaKoC0hvPb5YeRSstxUb2zt0f4okOtit1HOF8z6i6Jjx5MuVr+0tqrkvZJJX1KHdifpxVLNS6QVUW7jnxNOBux5O/JmrSslDtQJ9S4/wRm1rf1MzrZvpXc8SLf/Najxtc+Y7fB+PDTvpaOpUo9uOm1q23Ore2+rWtnqsefGNDT9UX/wxe6Os0Wu0Th6mcq/hQav/J60cZu5Jh5xowXUnX2fr5WYgg0W95gJxL4km4XLPRXiYgNJVCFB+grnGXIWh/WfcSiUi6CFn2plIH3bupbjbigpuyN1U22EEIWk6KqRdenM1w+OOqt0GHHzQbTakefZdJ2OPEVU1Hm31nZicT4i1p1mUcI1Y5WxXtnhejb3RhJBYXzbo5IVg/WMmlGKmhhdCPB2J5ky1LThciFmYeU+aSGVZnp1/Poglgs4tqSWMclrnJpOM2rRoeSweuKUsimWYnZ2UjplgOI92mh9yuHkqaZ+W5jZqqLzZpeqPwuVIZpJQBUmrfrTFqaRdiBb55VexCjhlSpRFZiOHNfKJzrAAcEop2ax4amgTYIfqymM8Ki5LLLap3kqltvM0FeOl4IWLqoqA7bdns1biCmy5oK6q5pPftZstq/BuW2+uthKraK273kkjkPHiGCic3eop8FbKpltpl86JC+K7LyoIqKORfuhfmhXjevGgxfK6pLgAFQAAOw==
	// console.log(promise.match); // [Function: match]
	// base64ToImage(promise, GOAL_PATH, { 'fileName': 'home.png', 'type': 'png'});
	// error: Uncaught (in promise) ReferenceError: Buffer is not defined
	// 
  //   at decodeBase64Image (file:///P:/2022/20220613a/3code/9_tools/deno/imageHelper/createTeacherImages.ts:140:1)
  //   at base64ToImage (file:///P:/2022/20220613a/3code/9_tools/deno/imageHelper/createTeacherImages.ts:131:22)
  //   at file:///P:/2022/20220613a/3code/9_tools/deno/imageHelper/createTeacherImages.ts:140:1
	
	// var dataBuffer = Buffer.from(base64Data, 'base64');
	// fs.writeFile("image.png", dataBuffer, function(err) {
	// 		if(err){
	// 			res.send(err);
	// 		}else{
	// 			res.send("保存成功！");
	// 		}
	// });
	// Uncaught (in promise) ReferenceError: Buffer is not defined
	
	// const decodeResult: Uint8Array = await decode(promise); // Uncaught SyntaxError: Unexpected reserved word
	// const decodeResult: Uint8Array = decode(promise); // Uncaught (in promise) InvalidCharacterError: Failed to decode base64
	const decodeResult: Uint8Array = decode(promise.replace(/^data:image\/\w+;base64,/, ''), 'base64'); 
	console.log(decodeResult);
	//await Deno.writeFile(GOAL_PATH.concat('home.png'), decodeResult);
	
	// const originalImage = Image.decode(decodeResult); // Error: Unsupported image type //  at Function.decode (https://deno.land/x/imagescript@v1.2.14/ImageScript.js:1073:22)
	// const encoded = originalImage.encode(1, {creationTime: 0, software: ''});
	// Deno.writeFile(goalFileFullName, encoded);
	
	ImageMagick.read(decodeResult, (img: IMagickImage) => {
		img.resize(100, 100);
		//img.blur(20, 6);

		img.write(
			(data: Uint8Array) => Deno.writeFile(goalFileFullName, data),
			MagickFormat.Jpeg,
		);
	});
});
