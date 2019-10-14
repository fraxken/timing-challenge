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
    const last = arr.pop();
    const property = Array.isArray(last) ?
        CallExpr(typeof last[0] === "string" ? createIdentifier(last[0]) : last[0], last[1] || []) :
        createIdentifier(last);

    if (arr.length === 0) {
        return property;
    }
    else if (arr.length === 1) {
        const object = Array.isArray(arr[0]) ?
            CallExpr(typeof arr[0][0] === "string" ? createIdentifier(arr[0][0]) : arr[0][0], arr[0][1] || []) :
            createIdentifier(arr[0]);

        return {
            type: "MemberExpression",
            object,
            computed: false,
            property
        };
    }

    return {
        type: "MemberExpression",
        object: buildMemberExpr(...arr),
        computed: false,
        property
    };
}

function ExprStmt(expression) {
    return { type: "ExpressionStatement", expression };
}

function CallExpr(callee, args = []) {
    return { type: "CallExpression", callee, arguments: args };
}

function ExprCall(callee, args) {
    return ExprStmt(CallExpr(callee, args));
}

function BlockStmt(type = "function", body = [], async = false) {
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
        async,
        generator: false
    };

    if (type === "arrow") {
        tmp.expression = true;
        delete tmp.generator;
    }

    return tmp;
}

function Var(name, kind = "let", init = null) {
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

function UpExpr(identifier, operator = "++") {
    return {
        type: "UpdateExpression",
        argument: createIdentifier(identifier),
        operator,
        prefix: false
    };
}

function Await(arg = null) {
    return {
        type: "ExpressionStatement",
        expression: {
            type: "AwaitExpression",
            argument: arg
        }
    };
}

function New(callee, args = []) {
    return {
        type: "ExpressionStatement",
        expression: {
            type: "NewExpression",
            callee,
            arguments: args
        }
    };
}

function Return(arg = null) {
    return {
        type: "ReturnStatement",
        argument: arg
    };
}

module.exports = {
    ExprStmt,
    CallExpr,
    ExprCall,
    Var,
    createLiteral,
    createIdentifier,
    buildMemberExpr,
    BlockStmt,
    Return,
    UpExpr,
    Await,
    New
};
