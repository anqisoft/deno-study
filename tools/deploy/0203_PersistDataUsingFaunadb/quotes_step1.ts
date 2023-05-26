/*
	https://deno.com/examples/fauna.ts
	
	P: && CD P:\2022\20220613a\3code\9_tools\deno\deploy\0203_PersistDataUsingFaunadb\ && deno run --allow-net=:8000 --watch quotes_step1.ts
	
	// 有效
	curl http://127.0.0.1:8000/quotes
		{"quotes":[{"quote":"Those who can imagine anything, can create the impossible.","author":"Alan Turing"},{"quote":"Any sufficiently advanced technology is equivalent to magic.","author":"Arthur C. Clarke"}]}
	
	// Windows出错
	curl --dump-header - --request POST --data '{"quote": "A program that has not been tested does not work.", "author": "Bjarne Stroustrup"}' http://127.0.0.1:8000/quotes
		curl: (3) URL using bad/illegal format or missing URL
		curl: (3) URL using bad/illegal format or missing URL
		curl: (3) unmatched close brace/bracket in URL position 18:
		Bjarne Stroustrup}'
		
	curl --dump-header - --request POST --data "{'quote': 'A program that has not been tested does not work.', 'author': 'Bjarne Stroustrup'}" http://127.0.0.1:8000/quotes
		HTTP/1.1 405 Method Not Allowed
		content-type: application/json; charset=utf-8
		vary: Accept-Encoding
		content-length: 51
		date: Fri, 23 Sep 2022 21:08:28 GMT

		{"error":"method POST is not allowed for the URL"}

	curl --dump-header --request POST --data "{'quote': 'A program that has not been tested does not work.', 'author': 'Bjarne Stroustrup'}" http://127.0.0.1:8000/quotes
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
  const { error } = await validateRequest(request, {
    GET: {},
  });
  // validateRequest populates the error if the request doesn't meet
  // the schema we defined.
  if (error) {
    return json({ error: error.message }, { status: error.status });
  }

  // Return all the quotes.
  return json({ quotes });
}