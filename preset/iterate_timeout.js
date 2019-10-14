"use strict";

const utils = require("../src/utils");
const node = require("../src/nodejs");
const ecma = require("../src/ecmascript");

// CODE GENERATED:
// for (let i = 0; i < 5; i++) {
//     setTimeout(() => {
//         console.log(i);
//     }, 1);
// }

function create(iteration = 5) {
    const logStmt = utils.ExprStmt(node.log(utils.createIdentifier("i")));

    const nodeTimeOut = utils.ExprStmt(node.timeout([
        ecma.createArrow(false, logStmt)
    ]));

    return ecma.createForStmt([nodeTimeOut], utils.createLiteral(iteration));
}

module.exports = {
    mustBeRoot: false,
    create
};
