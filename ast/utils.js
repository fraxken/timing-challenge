"use strict";

// CONSTANTS
const kBlockType = new Map([
    ["arrow", "ArrowFunctionExpression"],
    ["function", "FunctionDeclaration"]
]);

function createLiteral(value) {
    return { type: "Literal", value };
}

function createIdentifier(name) {
    return { type: "Identifier", name };
}

function buildMemberExpr(...arr) {
    if (arr.length === 0) {
        throw new Error("unable to process an empty array!");
    }
    else if (arr.length === 1) {
        return createIdentifier(arr[0]);
    }
    else if (arr.length === 2) {
        return {
            type: "MemberExpression",
            object: createIdentifier(arr[0]),
            computed: false,
            property: createIdentifier(arr[1])
        };
    }
    else {
        const last = arr.pop();

        return {
            type: "MemberExpression",
            object: buildMemberExpr(...arr),
            computed: false,
            property: createIdentifier(last)
        };
    }
}

function createCallExpr(callee, args = [], asExpr = true) {
    const expression = {
        type: "CallExpression", callee, arguments: args
    };

    return asExpr ? { type: "ExpressionStatement", expression } : expression;
}

function createBlock(type, body = []) {
    if (!kBlockType.has(type)) {
        throw new Error(`unknown block type ${type}`);
    }

    const tmp = {
        type: kBlockType.get(type),
        params: [],
        body: {
            type: "BlockStatement",
            body
        },
        async: false,
        generator: false
    };

    if (type === "arrow") {
        tmp.expression = true;
        delete tmp.generator;
    }

    return tmp;
}

function createVariable(name, kind = "let", init = null) {
    if (typeof name !== "string") {
        throw new TypeError("name must be a string");
    }

    return {
        type: "VariableDeclaration",
        kind,
        declarations: [
            {
                type: "VariableDeclarator",
                init,
                id: {
                    type: "Identifier",
                    name
                }
            }
        ]
    };
}

function createUpdateExpr(identifier, operator = "++") {
    return {
        type: "UpdateExpression",
        argument: createIdentifier(identifier),
        operator,
        prefix: false
    };
}

function createAwait(arg = null) {
    return {
        type: "ExpressionStatement",
        expression: {
            type: "AwaitExpression",
            argument: arg
        }
    };
}

function createNew(callee, args = []) {
    return {
        type: "ExpressionStatement",
        expression: {
            type: "NewExpression",
            callee,
            arguments: args
        }
    };
}

module.exports = {
    createVariable,
    createLiteral,
    createIdentifier,
    buildMemberExpr,
    createCallExpr,
    createBlock,
    createUpdateExpr,
    createAwait,
    createNew
};
