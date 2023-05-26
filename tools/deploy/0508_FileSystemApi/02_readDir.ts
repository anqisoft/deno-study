/*
	https://deno.com/deploy/docs/runtime-fs
	
	cls && P: && CD P:\2022\20220613a\3code\9_tools\deno\deploy\0508_FileSystemApi && deno run --allow-all --watch 02_readDir.ts
	
*/

import { serve } from "https://deno.land/std@0.140.0/http/server.ts";

async function handler(_req) {
  // List the posts in the `blog` directory located at the root
  // of the repository.
  const posts = [];
	
	// 由于当前目录无blog子目录，改名
  // for await (const post of Deno.readDir(`./blog`)) {
  for await (const post of Deno.readDir(`./`)) {
    posts.push(post);
  }

  // Return JSON.
  return new Response(JSON.stringify(posts, null, 2), {
    headers: {
      "content-type": "application/json",
    },
  });
}

serve(handler);

/*
[
  {
    "name": "01_cwd.ts",
    "isFile": true,
    "isDirectory": false,
    "isSymlink": false
  },
  {
    "name": "02_readDir.ts",
    "isFile": true,
    "isDirectory": false,
    "isSymlink": false
  },
  {
    "name": "03_readFile.ts",
    "isFile": true,
    "isDirectory": false,
    "isSymlink": false
  },
  {
    "name": "04_readTextFile.ts",
    "isFile": true,
    "isDirectory": false,
    "isSymlink": false
  },
  {
    "name": "05_open.ts",
    "isFile": true,
    "isDirectory": false,
    "isSymlink": false
  },
  {
    "name": "06_File.ts",
    "isFile": true,
    "isDirectory": false,
    "isSymlink": false
  },
  {
    "name": "07_stat.ts",
    "isFile": true,
    "isDirectory": false,
    "isSymlink": false
  },
  {
    "name": "08_lstat.ts",
    "isFile": true,
    "isDirectory": false,
    "isSymlink": false
  },
  {
    "name": "09_FileInfo.ts",
    "isFile": true,
    "isDirectory": false,
    "isSymlink": false
  },
  {
    "name": "0_empty.ts",
    "isFile": true,
    "isDirectory": false,
    "isSymlink": false
  },
  {
    "name": "10_realPath.ts",
    "isFile": true,
    "isDirectory": false,
    "isSymlink": false
  },
  {
    "name": "README.md",
    "isFile": true,
    "isDirectory": false,
    "isSymlink": false
  }
]
*/

