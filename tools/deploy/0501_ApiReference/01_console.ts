/*
	https://developer.mozilla.org/en-US/docs/Web/API/console
	
	cls && P: && CD P:\2022\20220613a\3code\9_tools\deno\deploy\0501_ApiReference && deno run --allow-all --watch 01_console.ts
	
*/

console.log("Failed to open the specified link");

const someObject = { str: "Some text", id: 5 };
console.log(someObject);

const car = "Dodge Charger";
// const someObject = { str: "Some text", id: 5 };
console.info("My first car was a", car, ". The object is:", someObject);

for (let i = 0; i < 5; i++) {
  console.log("Hello, %s. You've called me %d times.", "Bob", i + 1);
}

console.log(
  "This is %cMy stylish message",
  "color: yellow; font-style: italic; background-color: blue;padding: 2px"
);

console.log(
  "Multiple styles: %cred %corange",
  "color: red",
  "color: orange",
  "Additional unformatted message"
);

console.log("This is the outer level");
console.group("First group");
console.log("In the first group");
console.group("Second group");
console.log("In the second group");
console.warn("Still in the second group");
console.groupEnd();
console.log("Back to the first group");
console.groupEnd();
console.debug("Back to the outer level");

console.time("answer time");
alert("Click to continue");
console.timeLog("answer time");
alert("Do a bunch of other stuff…");
console.timeEnd("answer time");

function foo() {
  function bar() {
    console.trace();
  }
  bar();
}
foo();

/*
Failed to open the specified link
{ str: "Some text", id: 5 }
My first car was a Dodge Charger . The object is: { str: "Some text", id: 5 }
Hello, Bob. You've called me 1 times.
Hello, Bob. You've called me 2 times.
Hello, Bob. You've called me 3 times.
Hello, Bob. You've called me 4 times.
Hello, Bob. You've called me 5 times.
This is My stylish message
Multiple styles: red orange Additional unformatted message
This is the outer level
First group
    In the first group
    Second group
        In the second group
        Still in the second group
    Back to the first group
Back to the outer level
Click to continue [Enter]
answer time: 9898ms
Do a bunch of other stuff… [Enter]
answer time: 12778ms
Trace
    at bar (file:///P:/2022/20220613a/3code/9_tools/deno/deploy/0501_ApiReference/01_console.ts:52:13)
    at foo (file:///P:/2022/20220613a/3code/9_tools/deno/deploy/0501_ApiReference/01_console.ts:54:3)
    at file:///P:/2022/20220613a/3code/9_tools/deno/deploy/0501_ApiReference/01_console.ts:56:1
*/

