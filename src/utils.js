"use strict";

// Require Third-party Dependencies
const {
    Expression: {
        ArrowFunctionExpression,
        CallExpression
    },
    Helpers: { CreateMemberExpr, FastCall },
    Literal
} = require("node-estree");

const logExpr = CreateMemberExpr("console", "log");

const log = (body = []) => CallExpression(CreateMemberExpr("console", "log"), body);
const logStr = (message) => log([new Literal(message)]);

const setTimeout = (body = [], ...arg) => FastCall(null, ["setTimeout"])([ArrowFunctionExpression(body), ...arg]);
const nextTick = (body = [], ...arg) => FastCall(null, ["process", "nextTick"])([ArrowFunctionExpression(body), ...arg]);

module.exports = {
    log,
    logStr,
    logExpr,
    setTimeout,
    nextTick
};
