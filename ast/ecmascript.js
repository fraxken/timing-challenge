"use strict";

// Require Internal
const { createBlock, createLiteral, createCallExpr, buildMemberExpr } = require("./utils");

function createFunction(name, body = [], async = true) {
    const tmp = createBlock("function", body);
    tmp.async = async;
    tmp.id = { name, type: "Identifier" };

    return tmp;
}

function createArrow(async = false, ...body) {
    return createBlock("arrow", [...body], async);
}

function createForStmt(body = [], testRight = createLiteral(10)) {
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
                    id: {
                        type: "Identifier",
                        name: "i"
                    }
                }
            ]
        },
        test: {
            type: "BinaryExpression",
            left: {
                type: "Identifier",
                name: "i"
            },
            right: testRight,
            operator: "<"
        },
        update: {
            type: "UpdateExpression",
            argument: {
                type: "Identifier",
                name: "i"
            },
            operator: "++",
            prefix: false
        }
    };
}

function all(args = []) {
    return createCallExpr(buildMemberExpr("Promise", "all"), args);
}

module.exports = {
    createForStmt,
    createFunction,
    createArrow,
    all
};
