#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cli = require("../lib/cli");
const util = require("../lib/util");
const consts_1 = require("../lib/consts");
const optimist_1 = require("optimist");
var extra = optimist_1.argv._;
if (extra && extra.length) {
    showHelp();
}
else {
    if (optimist_1.argv['help']) {
        showHelp();
    }
    else {
        cli.default();
    }
}
function showHelp() {
    var HELP_LOGIN = consts_1.consts.HELP_LOGIN;
    for (var i = 0; i < HELP_LOGIN.length; i++) {
        util.log(HELP_LOGIN[i]);
    }
}
//# sourceMappingURL=pomelo-cli.js.map