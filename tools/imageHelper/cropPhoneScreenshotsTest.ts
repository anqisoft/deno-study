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
		fs.readFile(originalFileFullName),
	]);
	const originalImage = await Image.decode(originalImageData);
	
	// 原始图片宽度
	const originalWidth = originalImage.width();
	// 原始图片高度
	const originalHeight = originalImage.height();
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
	await fs.writeFile(goalFileFullName, encoded);
	
	// 输出相关dos命令，方便打开（本命令适用于Windows）
	console.log('explorer "'.concat(goalFileFullName, '"'));
}