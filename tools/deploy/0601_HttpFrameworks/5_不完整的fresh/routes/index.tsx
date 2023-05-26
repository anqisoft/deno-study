/*
	https://deno.com/deploy/docs/resources-frameworks
	
	https://github.com/lucacasonato/fresh
	https://github.com/denoland/fresh
	
	::不完整，无法直接调试
	cls && P: && CD P:\2022\20220613a\3code\9_tools\deno\deploy\0601_HttpFrameworks\routes\ && deno run --allow-net=:8000 --watch index.tsx
*/

import Counter from "../islands/Counter.tsx";

export default function Home() {
  return (
    <div>
      <p>
        Welcome to `fresh`. Try update this message in the ./routes/index.tsx
        file, and refresh.
      </p>
      <Counter />
    </div>
  );
}
