

async function getPathOfExistedFile(filename: string): string {
	// 注意：如果文件或文件夹不存在，Deno.realPath将抛出异常 error: Uncaught (in promise) NotFound: The system cannot find the path specified. (os error 3)
	const goalFileFullName: string = await Deno.realPath(filename);
	// 如果有下一句，则输出想要的结果；如果没有，则输出：Promise { <pending> }
	// console.log(goalFileFullName);
	
	// error: Uncaught TypeError: goalFileFullName.replace is not a function
	let path: string = goalFileFullName.replace(/\\/g, '/');
	path = path.substring(0, path.lastIndexOf('/'));
	
	return path;
}

console.log(getPathOfExistedFile('./'));
