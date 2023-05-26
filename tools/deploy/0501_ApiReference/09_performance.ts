/*
	https://developer.mozilla.org/en-US/docs/Web/API/performance
	
	cls && P: && CD P:\2022\20220613a\3code\9_tools\deno\deploy\0501_ApiReference && deno run --allow-all --watch 09_performance.ts
	
*/

// 官方未提供代码
import { serve } from 'https://deno.land/std@0.140.0/http/server.ts';

function handler(req: Request): Response {
	// console.log(window.performance); // => Performance {}
  // return new Response('ok, please see the console.', { status: 201 });
	
  return new Response('<html><head><title>test</title><script>alert(window.performance);</script></head><body>body</body></html>', { status: 201 });
	// 变成页面直接输出相应文本，而不是所希望的转成html代码
}

serve(handler);

/*
Listening on http://localhost:8000/
Performance {}
*/

/*
打开https://developer.mozilla.org/en-US/docs/Web/API/Performance页面，开启开发人员工具后，console中直接输入
console.log(window.performance);
得到：

Performance {timeOrigin: 1664006141075.3, onresourcetimingbufferfull: null, timing: PerformanceTiming, navigation: PerformanceNavigation, memory: MemoryInfo, …}
eventCounts: EventCounts
size: 36
[[Prototype]]: EventCounts
memory: MemoryInfo
jsHeapSizeLimit: 2172649472
totalJSHeapSize: 17622806
usedJSHeapSize: 15286682
[[Prototype]]: MemoryInfo
navigation: PerformanceNavigation
redirectCount: 0
type: 0
[[Prototype]]: PerformanceNavigation
onresourcetimingbufferfull: null
timeOrigin: 1664006141075.3
timing: PerformanceTiming
connectEnd: 1664006141085
connectStart: 1664006141085
domComplete: 1664006142016
domContentLoadedEventEnd: 1664006141386
domContentLoadedEventStart: 1664006141386
domInteractive: 1664006141366
domLoading: 1664006141334
domainLookupEnd: 1664006141085
domainLookupStart: 1664006141085
fetchStart: 1664006141085
loadEventEnd: 1664006142017
loadEventStart: 1664006142016
navigationStart: 1664006141075
redirectEnd: 0
redirectStart: 0
requestStart: 1664006141094
responseEnd: 1664006141332
responseStart: 1664006141326
secureConnectionStart: 0
unloadEventEnd: 0
unloadEventStart: 0
[[Prototype]]: PerformanceTiming
[[Prototype]]: Performance
*/