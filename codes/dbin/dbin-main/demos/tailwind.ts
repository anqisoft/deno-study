import dbin from "../mod.ts";

const binfile = await dbin({
  pattern:
    "https://github.com/tailwindlabs/tailwindcss/releases/download/{version}/tailwindcss-{target}",
  version: "v3.1.8",
  targets: [
    { name: "linux-x64", os: "linux", arch: "x86_64" },
    { name: "linux-arm64", os: "linux", arch: "aarch64" },
    { name: "macos-x64", os: "darwin", arch: "x86_64" },
    { name: "macos-arm64", os: "darwin", arch: "aarch64" },
    { name: "windows-x64.exe", os: "windows", arch: "x86_64" },
  ],
  dest: "./_bin/tailwind",
});

const process = Deno.run({ cmd: [binfile, "-h"] });
await process.status();
process.close();
