"use strict";

// Require Internal
const {
    BlockStmt,
    New,
    createLiteral,
    createIdentifier,
    ExprCall,
    buildMemberExpr
} = require("./utils");

function createFunction(name, body = [], async = true) {
    const tmp = BlockStmt("function", body);
    tmp.async = async;
    tmp.id = { name, type: "Identifier" };

    return tmp;
}

function createArrow(async = false, ...body) {
    return BlockStmt("arrow", [...body], async);
}

function createForStmt(body = [], testRight = createLiteral(10), id = createIdentifier("i")) {
    return {
        type: "ForStatement",
        body: {
            type: "BlockStatement",
            body
        },
        init: {
            type: "VariableDeclaration",
            kind: "let",
            declarations: [
                {
                    type: "VariableDeclarator",
                    init: {
                        type: "Literal",
                        value: 0
                    },
                    id
                }
            ]
        },
        test: {
            type: "BinaryExpression",
            left: id,
            right: testRight,
            operator: "<"
        },
        update: {
            type: "UpdateExpression",
            argument: id,
            operator: "++",
            prefix: false
        }
    };
}

function all(args = []) {
    return ExprCall(buildMemberExpr("Promise", "all"), args);
}

function Promise(body = []) {
    const arrow = BlockStmt("arrow", body);
    arrow.params.push(createIdentifier("resolve"), createIdentifier("reject"));

    return New(createIdentifier("Promise"), [arrow]);
}

module.exports = {
    createForStmt,
    createFunction,
    createArrow,
    Promise,
    all
};
