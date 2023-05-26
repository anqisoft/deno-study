@ECHO OFF

:: https://deno.com/deploy/docs/resources-frameworks
:: https://github.com/lucacasonato/fresh 自动跳转到 https://github.com/denoland/fresh

:: https://github.com/denoland/fresh

deno run -A -r https://fresh.deno.dev deno-fresh-demo
cd deno-fresh-demo
start "" explorer http://localhost:8000
deno task start
