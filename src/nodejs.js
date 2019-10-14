"use strict";

// Require Internal
const {
    CallExpr,
    buildMemberExpr,
    createLiteral,
    Var
} = require("./utils");

const tty = {
    log: buildMemberExpr("console", "log"),
    error: buildMemberExpr("console", "error")
};

function setImmediate(args = []) {
    return CallExpr(buildMemberExpr("setImmediate"), args);
}

function queueMicrotask(args = []) {
    return CallExpr(buildMemberExpr("queueMicrotask"), args);
}

function nextTick(args = []) {
    return CallExpr(buildMemberExpr("process", "nextTick"), args);
}

function timeout(args = [], time = createLiteral(1), ...vars) {
    return CallExpr(buildMemberExpr("setTimeout"), [...args, time, ...vars]);
}

function log(str, ...args) {
    return CallExpr(tty.log, [typeof str === "string" ? createLiteral(str) : str, ...args]);
}

function createRequire(identifierName, moduleName) {
    const callExpr = createCallExpr(buildMemberExpr("require"), [
        createLiteral(moduleName)
    ], false);

    return Var(identifierName, "const", callExpr);
}

module.exports = {
    setImmediate,
    nextTick,
    timeout,
    queueMicrotask,
    log,
    createRequire,
    tty
};
