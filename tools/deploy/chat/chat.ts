/*
	https://segmentfault.com/a/1190000037751598
*/
// error: Module not found "https://deno.land/std/ws/mod.ts".
// import { isWebSocketCloseEvent } from 'https://deno.land/std/ws/mod.ts';
import { isWebSocketCloseEvent } from "https://deno.land/x/abc@v1.3.3/vendor/https/deno.land/std/ws/mod.ts";
import { v4 } from 'https://deno.land/std/uuid/mod.ts';

const users = new Map();

function broadcast(message, senderId) {
  if (!message) {
    return false;
  }
  users.forEach(user => {
    user.send(senderId ? `[${senderId}]: ${message}` : message);
  });
}

export async function chat(ws) {
  const userId = v4.generate();

  users.set(userId, ws);
  broadcast(`> User with the id ${userId} is connected`);
  for await (const event of ws) {
    const message = typeof event === 'string' ? event : '';

    broadcast(message, userId);

    if (!message && isWebSocketCloseEvent(event)) {
      users.delete(userId);
      broadcast(`> User with the id ${userId} is disconnected`);
      break;
    }
  }
}
