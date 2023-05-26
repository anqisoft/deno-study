/*
	https://deno.com/deploy/docs/runtime-fs
	
	cls && P: && CD P:\2022\20220613a\3code\9_tools\deno\deploy\0508_FileSystemApi && deno run --allow-all --watch 03_readFile.ts
	
*/

import { serve } from "https://deno.land/std@0.140.0/http/server.ts";

async function handler(_req) {
  // Let's read the README.md file available at the root
  // of the repository to explore the available methods.

  // Relative paths are relative to the root of the repository
  const readmeRelative = await Deno.readFile("./README.md");
  // Absolute paths.
  // The content of the repository is available under at Deno.cwd().
  const readmeAbsolute = await Deno.readFile(`${Deno.cwd()}/README.md`);
  // File URLs are also supported.
  const readmeFileUrl = await Deno.readFile(
    new URL(`file://${Deno.cwd()}/README.md`),
  );

  // Decode the Uint8Array as string.
  const readme = new TextDecoder().decode(readmeRelative);
  return new Response(readme);
}

serve(handler);

/*
# deno-nvim

A plugin to improve deno experience

## Installation

using `packer.nvim`

```lua
use 'neovim/nvim-lspconfig'
use 'sigmasd/deno-nvim'
```

## Setup

This plugin automatically sets up nvim-lspconfig for deno for you, so don't do
that manually, as it causes conflicts.

Put this in your init.lua or any lua file that is sourced.<br>

Example config:

```lua
require("deno-nvim").setup({
  server = {
    on_attach = ...,
    capabilites = ...
  },
})
```

## Usage

<details>
  <summary>
	<b>deno test with code lens</b>
  </summary>

<p>use <i>vim.lsp.codelens</i> to activate this </p>
  <img src="https://github.com/sigmaSd/nvim-deno-demos/raw/master/test.gif"/>
</details>

<details>
  <summary>
	<b>auto complete import from deno registeries</b>
  </summary>
  <img src="https://github.com/sigmaSd/nvim-deno-demos/raw/master/auto_import.gif"/>
</details>

<details>
  <summary>
	<b>deno task</b>
  </summary>
  <img src="https://github.com/sigmaSd/nvim-deno-demos/raw/master/task.gif"/>
</details>

## Important

There is currently a bug in neovim that prevent deno lsp form working 100 %
correctly see (https://github.com/neovim/neovim/pull/19967) and
(https://github.com/denoland/deno/issues/15786). If you're comfortable with
hacks you can use (https://github.com/neovim/neovim/pull/19773/files)

## More stuff

You can checkout https://github.com/sigmaSd/conjure-deno for deno repl
integration in nvim

## Credits

Thanks to https://github.com/simrat39/rust-tools.nvim for the nice readable and
commented codebase.
*/

