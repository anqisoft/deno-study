/*
	https://developer.mozilla.org/en-US/docs/Web/API/fetch_API
	https://developer.mozilla.org/en-US/docs/Web/API/fetch
	
	::代码不是deno的，暂时无法调试，需修改
	cls && P: && CD P:\2022\20220613a\3code\9_tools\deno\deploy\0501_ApiReference && deno run --allow-all --watch 04_fetch.ts
	
*/

const myImage = document.querySelector('img');

const myRequest = new Request('flowers.jpg');

fetch(myRequest)
  .then((response) => {
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return response.blob();
  })
  .then((response) => {
    myImage.src = URL.createObjectURL(response);
  });

/*
error: Uncaught ReferenceError: document is not defined
*/

