/*
	https://deno.com/examples/fauna.ts
	
	cls && P: && CD P:\2022\20220613a\3code\9_tools\deno\deploy\0203_PersistDataUsingFaunadb\ && deno run --allow-net=:8000 --watch quotes.ts
	
	// 有效
	curl http://127.0.0.1:8000/quotes
		{"quotes":[{"quote":"Those who can imagine anything, can create the impossible.","author":"Alan Turing"},{"quote":"Any sufficiently advanced technology is equivalent to magic.","author":"Arthur C. Clarke"}]}
	
	// Windows出错——不能用单引号来简化json数据的上传
	curl --dump-header - --request POST --data "{'quote': 'A program that has not been tested does not work.', 'author': 'Bjarne Stroustrup'}" http://127.0.0.1:8000/quotes
		HTTP/1.1 500 Internal Server Error
		content-type: application/json; charset=utf-8
		vary: Accept-Encoding
		content-length: 64
		date: Fri, 23 Sep 2022 21:14:06 GMT

		{"error":"Expected property name or '}' in JSON at position 1"}

	// OK
	curl --dump-header - --request POST --data "{\"quote\": \"A program that has not been tested does not work.\", \"author\": \"Bjarne Stroustrup\"}" http://127.0.0.1:8000/quotes
		HTTP/1.1 201 Created
		content-type: application/json; charset=utf-8
		vary: Accept-Encoding
		content-length: 91
		date: Fri, 23 Sep 2022 21:16:52 GMT

		{"quote":"A program that has not been tested does not work.","author":"Bjarne Stroustrup"}
		
	curl http://127.0.0.1:8000/quotes
		{"quotes":[{"quote":"Those who can imagine anything, can create the impossible.","author":"Alan Turing"},{"quote":"Any sufficiently advanced technology is equivalent to magic.","author":"Arthur C. Clarke"},{"quote":"A program that has not been tested does not work.","author":"Bjarne Stroustrup"}]}
*/


import {
  json,
  serve,
  validateRequest,
} from "https://deno.land/x/sift@0.6.0/mod.ts";

serve({
  "/quotes": handleQuotes,
});

// To get started, let's just use a global array of quotes.
const quotes = [
  {
    quote: "Those who can imagine anything, can create the impossible.",
    author: "Alan Turing",
  },
  {
    quote: "Any sufficiently advanced technology is equivalent to magic.",
    author: "Arthur C. Clarke",
  },
];

async function handleQuotes(request: Request) {
  // Make sure the request is a GET request.
  // const { error } = await validateRequest(request, {
    // GET: {},
	 const { error, body } = await validateRequest(request, {
    GET: {},
    POST: {
       body: ["quote", "author"]
    }
  });
  // validateRequest populates the error if the request doesn't meet
  // the schema we defined.
  if (error) {
    return json({ error: error.message }, { status: error.status });
  }
	
	// Handle POST requests.
	if (request.method === "POST") {
		const { quote, author } = body as { quote: string; author: string };
		quotes.push({ quote, author });
		return json({ quote, author }, { status: 201 });
	}

  // Return all the quotes.
  return json({ quotes });
}