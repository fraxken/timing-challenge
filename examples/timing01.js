/* eslint-disable no-param-reassign */
/* eslint-disable id-length */
"use strict";

const EventEmitter = require("events");

async function a(val) {
    console.log("A", val);
}

setImmediate(() => console.log("B"));

const ee = new EventEmitter();
ee.on("foo", async(val) => {
    process.nextTick((val) => a(val), val++);
    await a(val++);
    a(val);
});

new Promise((res) => {
    for (let n = 0; n < 1e9; n++) {
        // ...
    }
    setImmediate(() => console.log("C"));
    process.nextTick(() => res("D"));
    console.log("E");
}).then(console.log);

queueMicrotask(() => console.log("F"));

(async(res) => {
    for (let n = 0; n < 1e6; n++) {
        // ...
    }
    process.nextTick(() => console.log("G"));

    return "H";
})().then(console.log);

process.nextTick(() => console.log("I"));

const promises = [];
let n = 0;
for (; n < 10; n++) {
    promises.push(a(n));
}

setTimeout((val) => ee.emit("foo", val), 1000, n);

console.log("J");

Promise.all(promises);
