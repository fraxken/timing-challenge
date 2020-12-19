"use strict";

// Require Third-party Dependencies
const {
    Expression: {
        ArrowFunctionExpression,
        CallExpression,
        BinaryExpression,
        UpdateExpression,
        ExpressionStatement,
        MemberExpression
    },
    Statements: { ForStatement, Block, Return },
    Identifier,
    Literal,
    VariableDeclaration
} = require("node-estree");

// Require Internal Dependencies
const { logExpr, logStr, nextTick } = require("../src/utils.js");

// CODE TO GENERATE:
// (async res => {
//     for (let i = 0; i < 1000000; i++) { }
//     process.nextTick(() => {
//         console.log("A");
//     });
//     return "H";
// })().then(console.log);

function generate() {
    const iifeBody = [
        nextTick([logStr("A")]),
        Return(new Literal("H"))
    ];
    {
        const id = new Identifier("i");
        const init = VariableDeclaration.createOne("let", id.name, new Literal(0));
        const test = BinaryExpression("<", id, new Literal(1e6));
        const update = UpdateExpression("++", void 0, id);

        iifeBody.unshift(ForStatement(init, test, update, Block()));
    }

    const IIFE = MemberExpression(CallExpression(
        ArrowFunctionExpression(iifeBody, void 0, true)
    ), new Identifier("then"));

    return ExpressionStatement(CallExpression(IIFE, [logExpr]));
}

module.exports = {
    level: "medium",
    mustBeRoot: true,
    generate
};
