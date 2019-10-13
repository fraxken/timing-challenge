"use strict";

// Require Internal
const {
    createCallExpr,
    buildMemberExpr,
    createLiteral,
    createVariable
} = require("./utils");

function setImmediate(args = []) {
    return createCallExpr(buildMemberExpr("setImmediate"), args);
}

function queueMicrotask(args = []) {
    return createCallExpr(buildMemberExpr("queueMicrotask"), args);
}

function nextTick(args = []) {
    return createCallExpr(buildMemberExpr("process", "nextTick"), args);
}

function log(str, ...args) {
    if (typeof str !== "string") {
        throw new TypeError("str must be a string");
    }

    return createCallExpr(buildMemberExpr("console", "log"), [createLiteral(str), ...args]);
}

function createRequire(identifierName, moduleName) {
    const callExpr = createCallExpr(buildMemberExpr("require"), [
        createLiteral(moduleName)
    ], false);

    return createVariable(identifierName, "const", callExpr);
}

module.exports = {
    setImmediate,
    nextTick,
    queueMicrotask,
    log,
    createRequire
};
