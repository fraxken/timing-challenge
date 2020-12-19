/* eslint-disable no-param-reassign */
"use strict";

// Require Third-party Dependencies
const {
    Expression: {
        BinaryExpression,
        UpdateExpression
    },
    Statements: { ForStatement, Block },
    Identifier,
    Literal,
    VariableDeclaration
} = require("node-estree");

// Require Internal Dependencies
const { log, setTimeout } = require("../src/utils.js");

// CODE TO GENERATE:
// for (let i = 0; i < 5; i++) {
//     setTimeout(() => {
//         console.log(i);
//     }, 1);
// }

function generate(start = 0, end = 5) {
    if (start > end) {
        end = start;
    }

    const id = new Identifier("i");
    const forBlockBody = [
        setTimeout([log([id])], new Literal(1))
    ];

    return ForStatement(
        VariableDeclaration.createOne("let", id.name, new Literal(start)),
        BinaryExpression("<", id, new Literal(end)),
        UpdateExpression("++", void 0, id),
        Block(forBlockBody)
    );
}

module.exports = {
    level: "easy",
    mustBeRoot: false,
    generate
};
