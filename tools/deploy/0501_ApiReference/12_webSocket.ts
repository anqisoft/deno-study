/*
	https://developer.mozilla.org/en-US/docs/Web/API/webSocket
	
	cls && P: && CD P:\2022\20220613a\3code\9_tools\deno\deploy\0501_ApiReference && deno run --allow-all --watch 12_webSocket.ts
	
*/

// 需改写代码
// Create WebSocket connection.
const socket = new WebSocket('ws://localhost:8080');

// Connection opened
socket.addEventListener('open', (event) => {
    socket.send('Hello Server!');
});

// Listen for messages
socket.addEventListener('message', (event) => {
    console.log('Message from server ', event.data);
});

/*

*/

