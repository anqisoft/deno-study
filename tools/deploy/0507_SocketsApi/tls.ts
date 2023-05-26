/*
	https://deno.com/deploy/docs/runtime-sockets
	
	cls && P: && CD P:\2022\20220613a\3code\9_tools\deno\deploy\0507_SocketsApi && deno run --allow-net --watch tls.ts
	
*/

import { serve } from "https://deno.land/std@0.140.0/http/server.ts";

async function handler(_req) {
  // Make a TLS connection to example.com
  const connection = await Deno.connectTls({
    port: 443,
    hostname: "example.com",
  });

  // Send raw HTTP GET request.
  const request = new TextEncoder().encode(
    "GET / HTTP/1.1\nHost: example.com\r\n\r\n",
  );
  const _bytesWritten = await connection.write(request);

  // Read 15 bytes from the connection.
  const buffer = new Uint8Array(15);
  await connection.read(buffer);
  connection.close();

  // Return the bytes as plain text.
  return new Response(buffer, {
    headers: {
      "content-type": "text/plain;charset=utf-8",
    },
  });
}

serve(handler);

/*
HTTP/1.1 200 OK
*/
