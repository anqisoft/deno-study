@ECHO OFF

deno upgrade >00_deno_upgrade.txt

deno -h >00_deno_h.txt
:: Skip the -q and --unstable
deno -V >00_deno_version.txt

