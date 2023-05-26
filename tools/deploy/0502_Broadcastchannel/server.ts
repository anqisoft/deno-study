/*
	https://deno.com/deploy/docs/runtime-broadcast-channel
	https://denochat.deno.dev/
	https://developer.mozilla.org/en-US/docs/Web/API/EventTarget
	https://github.com/lucacasonato/deploy_chat
	
	::因不完整而无效
	cls && P: && CD P:\2022\20220613a\3code\9_tools\deno\deploy\0502_Broadcastchannel && deno run --allow-net --watch server.ts
	
	:;会有错误提示
	cls && P: && CD P:\2022\20220613a\3code\9_tools\deno\projects\deploy_chat && deployctl run --no-check --watch main.ts
	
	::会有错误提示
	cls && P: && CD P:\2022\20220613a\3code\9_tools\deno\projects\deploy_chat && deployctl run --no-check --watch --project=chat main.ts
	
	cls && P: && CD P:\2022\20220613a\3code\9_tools\deno\projects\deploy_chat && deno run --allow-net --watch main.ts
	
	::使用浏览器打开
	http://localhost:8080/
*/

import { serve } from "https://deno.land/std@0.140.0/http/server.ts";

const messages = [];
// Create a new broadcast channel named earth.
const channel = new BroadcastChannel("earth");
// Set onmessage event handler.
channel.onmessage = (event: MessageEvent) => {
  // Update the local state when other instances
  // send us a new message.
  messages.push(event.data);
};

function handler(req: Request): Response {
  const { pathname, searchParams } = new URL(req.url);

  // Handle /send?message=<message> endpoint.
  if (pathname.startsWith("/send")) {
    const message = searchParams.get("message");
    if (!message) {
      return new Response("?message not provided", { status: 400 });
    }

    // Update local state.
    messages.push(message);
    // Inform all other active instances of the deployment
    // about the new message.
    channel.postMessage(message);
    return new Response("message sent");
  }

  // Handle /messages request.
  if (pathname.startsWith("/messages")) {
    return new Response(JSON.stringify(messages), {
      "content-type": "application/json",
    });
  }

  return new Response("not found", { status: 404 });
}

serve(handler);

/* 结果： */

/*

deployctl run --no-check --watch main.ts
deployctl 1.3.0
Command line tool for Deno Deploy.

To deploy a local script:
  deployctl deploy --project=helloworld ./main.ts

To deploy a remote script:
  deployctl deploy --project=helloworld https://deno.land/x/deploy/examples/hello.js

SUBCOMMANDS:
    deploy    Deploy a script with static files to Deno Deploy
    upgrade   Upgrade deployctl to the given version (defaults to latest)
*/