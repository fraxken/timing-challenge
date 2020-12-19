"use strict";

// Require Third-party Dependencies
const astring = require("astring");
const { Program } = require("node-estree");

// Require presets
const one = require("./preset/iterate_timeout");
const two = require("./preset/iife_async");

const AST = new Program();

AST.add(one.generate());
AST.add(two.generate());
// console.log(JSON.stringify(AST.body, null, 4));
console.log(astring.generate(AST.toJSON()));
