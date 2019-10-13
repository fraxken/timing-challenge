"use strict";

// Require Third-party Dependencies
const meriyah = require("meriyah");
const astring = require("astring");

// Require Internal Dependencies
const { createFunction, createForStmt, all } = require("./ast/ecmascript");
const { setImmediate, nextTick, log, createRequire } = require("./ast/built-in");
const {
    createCallExpr,
    createIdentifier,
    createVariable,
    createLiteral,
    buildMemberExpr
} = require("./ast/utils");

// const nodesRoot = [];
// nodesRoot.push(createRequire("EventEmitter", "events"));
// const fn = createFunction("callMe", [log("A", createIdentifier("val"))], true);
// fn.params.push(createIdentifier("val"));
// nodesRoot.push(fn);

// nodesRoot.push(createVariable("promises", "const", {
//     type: "ArrayExpression", elements: []
// }));

// const fnExpr = createCallExpr(buildMemberExpr("callMe"), [createIdentifier("i")], false);
// const callExpr = createCallExpr(buildMemberExpr("promises", "push"), [fnExpr]);
// const forStmt = createForStmt([callExpr], createLiteral(5));
// nodesRoot.push(forStmt);
// nodesRoot.push(all([createIdentifier("promises")]));

// console.log(JSON.stringify(ast, null, 4));
// for (const node of nodesRoot) {
//     const code = astring.generate(node);
//     console.log(code);
// }

const code = `new Promise((res) => {
}).then(console.log)`;
const { body } = meriyah.parse(code);
console.log(JSON.stringify(body, null, 4));
