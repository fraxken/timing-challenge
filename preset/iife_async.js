"use strict";

const utils = require("../src/utils");
const node = require("../src/nodejs");
const ecma = require("../src/ecmascript");

// CODE GENERATED:
// (async res => {
//     for (let i = 0; i < 1000000; i++) { }
//     process.nextTick(() => {
//         console.log("A");
//     });
//     return "H";
// })().then(console.log);

function create() {
    const body = [];
    body.push(ecma.createForStmt(void 0, utils.createLiteral(1e6)));

    const nextTick = node.nextTick([ecma.createArrow(false, utils.ExprStmt(node.log("A")))]);
    body.push(utils.ExprStmt(nextTick));
    body.push(utils.Return(utils.createLiteral("H")));

    const fn = ecma.createArrow(true, ...body);
    fn.params.push(utils.createIdentifier("res"));

    return utils.ExprCall(utils.buildMemberExpr([fn], ["then", [node.tty.log]]));
}

module.exports = {
    mustBeRoot: true,
    create
};
