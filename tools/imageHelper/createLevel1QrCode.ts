/*
	功能：生成抛砖引玉清单页分享图片
	版本：
				2022-12-20 安启 新建
	说明：
	用法（二选一）：
	deno run --allow-read --allow-write --allow-net P:\2022\20220613a\3code\9_tools\deno\imageHelper\createLevel1QrCode.ts
	cls && deno run --allow-read --allow-write --allow-net P:\2022\20220613a\3code\9_tools\deno\imageHelper\createLevel1QrCode.ts
	
	查看注释
	P: && CD P:\2022\20220613a\3code\9_tools\deno\imageHelper\ && deno doc createLevel1QrCode.ts
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

const GOAL_PATH: string = 'P:/ecs_person/websites/sonya.cc/edu_git/src/images/';
const IS_PNG = true;
const MAGICK_FORMAT = IS_PNG ? MagickFormat.Png : MagickFormat.Jpeg;
const FILE_EXTENSION = IS_PNG ? '.png': '.jpg';

await initializeImageMagick();

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
	{ name: 'home' , link: '' },
	{ name: 'about' , link: 'about' },
]
.forEach(({name, link }) => {
	create(name, `http://edu.sonya.cc/${link.length ? '?go='.concat(link) : '' }`);
	
	for(let i = 0; i < 1000000; ++i) {
		// do nothing.
	}
});