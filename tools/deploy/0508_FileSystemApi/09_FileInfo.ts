/*
	https://deno.com/deploy/docs/runtime-fs
	
	cls && P: && CD P:\2022\20220613a\3code\9_tools\deno\deploy\0508_FileSystemApi && deno run --allow-all --watch 09_FileInfo.ts
	
*/

const statResult: Promise<Deno.FileInfo> = await Deno.stat("./README.md");
console.log(statResult);

const lstatResult: Promise<Deno.FileInfo> = await Deno.lstat("./README.md");
console.log(lstatResult);
	
const linkResult: Promise<Deno.FileInfo> = await Deno.lstat("./tools_deno.lnk");
console.log(linkResult);
/*
{
  isFile: true,
  isDirectory: false,
  isSymlink: false,
  size: 1535,
  mtime: 2022-09-18T14:12:55.000Z,
  atime: 2022-09-24T03:24:27.228Z,
  birthtime: 2022-09-24T03:24:27.199Z,
  dev: null,
  ino: null,
  mode: null,
  nlink: null,
  uid: null,
  gid: null,
  rdev: null,
  blksize: null,
  blocks: null
}
{
  isFile: true,
  isDirectory: false,
  isSymlink: false,
  size: 1535,
  mtime: 2022-09-18T14:12:55.000Z,
  atime: 2022-09-24T03:24:27.228Z,
  birthtime: 2022-09-24T03:24:27.199Z,
  dev: null,
  ino: null,
  mode: null,
  nlink: null,
  uid: null,
  gid: null,
  rdev: null,
  blksize: null,
  blocks: null
}
{
  isFile: true,
  isDirectory: false,
  isSymlink: false,
  size: 1185,
  mtime: 2022-09-24T07:52:16.119Z,
  atime: 2022-09-24T07:52:16.119Z,
  birthtime: 2022-09-24T07:52:16.118Z,
  dev: null,
  ino: null,
  mode: null,
  nlink: null,
  uid: null,
  gid: null,
  rdev: null,
  blksize: null,
  blocks: null
}
*/

