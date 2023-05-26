/*
	功能：测试二维码生成功能
	版本：
				2022-12-09 安启 新建
	说明：
	用法（二选一）：
	deno run --allow-read --allow-write --allow-net P:\2022\20220613a\3code\9_tools\deno\imageHelper\createQrCodeTest.ts
	cls && deno run --allow-read --allow-write --allow-net P:\2022\20220613a\3code\9_tools\deno\imageHelper\createQrCodeTest.ts
	
	查看注释
	P: && CD P:\2022\20220613a\3code\9_tools\deno\imageHelper\ && deno doc createQrCodeTest.ts
		
	https://deno.land/x/qrcode@v2.0.0
	Generate QR codes in Deno, as base64-encoded images, completely dependency-free and requires no binary.
	This is a port of zenozeng/node-yaqrcode, which itself is a port of the QR code generator in the d-project.
	import { qrcode } from "https://deno.land/x/qrcode/mod.ts";
	const base64Image = qrcode("bitcoin:ADDRESS?amount=0.5&label=ORDER"); // data:image/gif;base64,...
	const fixedSizeImage = qrcode("bitcoin:ADDRESS?amount=0.5&label=ORDER", { size: 500 });
	deno run https://deno.land/x/qrcode/cli.ts <text>
	deno install qrcode https://deno.land/x/qrcode/cli.ts

	https://deno.land/x/qrcode_terminal@v1.1.1
	Run the Demo
	deno run https://deno.land/x/qrcode_terminal/demo/demo.js
	Examples
	import qrcode from 'https://deno.land/x/qrcode_terminal/mod.js'
	console.log("\n\nScan It Skip To Google 👇\n")
	qrcode.generate("https://www.google.com")

	https://deno.land/x/qrcode_std@v0.0.0/mod.ts
	import * as qrcodeStd from "https://deno.land/x/qrcode_std@v0.0.0/mod.ts";
	The documentation for this module is currently unavailable.

	https://deno.land/x/servant@v0.0.1
	This is a fork of file_server
	The only difference is that this tool displays QR code for every host which It serves.
*/
	
/* 引入第三方库 */
import { qrcode } from "https://deno.land/x/qrcode@v2.0.0/mod.ts";

// import * as qrcodeStd from "https://deno.land/x/qrcode_std@v0.0.0/mod.ts";
import { decode } from "https://deno.land/x/fetchbase64@1.0.0/deps.ts";
import {
  ImageMagick,
  IMagickImage,
  initializeImageMagick,
  MagickFormat,
} from "https://deno.land/x/imagemagick_deno/mod.ts";

const GOAL_PATH: string = 'P:/2022/20220613a/3code/9_tools/deno/imageHelper/2_qrcode/';
const IS_PNG = false;
const MAGICK_FORMAT = IS_PNG ? MagickFormat.Png : MagickFormat.Jpeg;
const FILE_EXTENSION = IS_PNG ? '.png': '.jpg';

await initializeImageMagick();

const homeQrCode = qrcode('http://edu.sonya.cc', { size: 100 });

homeQrCode.then((encodedResult) => {
	const decodeResult: Uint8Array = decode(encodedResult.replace(/^data:image\/\w+;base64,/, ''), 'base64'); 
	// console.log(decodeResult);
	
	ImageMagick.read(decodeResult, (img: IMagickImage) => {
		// img.resize(200, 100);
		img.resize(100, 100);
		//img.blur(20, 6);

		img.write(
			(data: Uint8Array) => Deno.writeFile(GOAL_PATH.concat('home2', FILE_EXTENSION), data),
			MAGICK_FORMAT,
		);
	});
});
