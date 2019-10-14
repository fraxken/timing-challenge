"use strict";

// Require Third-party Dependencies
const meriyah = require("meriyah");
const astring = require("astring");

// Require presets
const one = require("./preset/iterate_timeout");
const two = require("./preset/iife_async");

const nodesRoot = [];
nodesRoot.push(two.create());

console.log(JSON.stringify(nodesRoot, null, 2))

for (const node of nodesRoot) {
    const code = astring.generate(node);
    console.log(code);
}

// const code = `(async() => {

// })().then(console.log)`;
// const { body } = meriyah.parse(code);
// console.log(JSON.stringify(body, null, 4));
