/*
	https://deno.com/deploy/docs/runtime-fetch
	
	cls && P: && CD P:\2022\20220613a\3code\9_tools\deno\deploy\0503_FetchApi && deno run --allow-net --watch server.ts
	
*/

import { serve } from "https://deno.land/std@0.140.0/http/server.ts";

async function handler(req: Request): Promise<Response> {
  const resp = await fetch("https://api.github.com/users/denoland", {
    // The init object here has an headers object containing a
    // header that indicates what type of response we accept.
    // We're not specifying the method field since by default
    // fetch makes a GET request.
    headers: {
      accept: "application/json",
    },
  });
  return new Response(resp.body, {
    status: resp.status,
    headers: {
      "content-type": "application/json",
    },
  });
}

serve(handler);

/*
{"login":"denoland","id":42048915,"node_id":"MDEyOk9yZ2FuaXphdGlvbjQyMDQ4OTE1","avatar_url":"https://avatars.githubusercontent.com/u/42048915?v=4","gravatar_id":"","url":"https://api.github.com/users/denoland","html_url":"https://github.com/denoland","followers_url":"https://api.github.com/users/denoland/followers","following_url":"https://api.github.com/users/denoland/following{/other_user}","gists_url":"https://api.github.com/users/denoland/gists{/gist_id}","starred_url":"https://api.github.com/users/denoland/starred{/owner}{/repo}","subscriptions_url":"https://api.github.com/users/denoland/subscriptions","organizations_url":"https://api.github.com/users/denoland/orgs","repos_url":"https://api.github.com/users/denoland/repos","events_url":"https://api.github.com/users/denoland/events{/privacy}","received_events_url":"https://api.github.com/users/denoland/received_events","type":"Organization","site_admin":false,"name":"Deno","company":null,"blog":"https://deno.land","location":null,"email":"support@deno.com","hireable":null,"bio":null,"twitter_username":"deno_land","public_repos":68,"public_gists":0,"followers":0,"following":0,"created_at":"2018-08-02T22:47:41Z","updated_at":"2022-09-18T07:08:25Z"}
*/
