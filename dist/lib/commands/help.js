"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pomelo_logger_1 = require("pomelo-logger");
var logger = pomelo_logger_1.getLogger(__filename);
const util = require("../util");
const consts_1 = require("../consts");
const cliff = require("cliff");
function default_1(opts) {
    return new Command(opts);
}
exports.default = default_1;
;
exports.commandId = 'help';
class Command {
    constructor(opts) {
    }
    handle(agent, comd, argv, msg, rl, client) {
        if (!comd) {
            util.errorHandle(argv, rl);
            return;
        }
        var argvs = util.argsFilter(argv);
        if (argvs.length > 2) {
            util.errorHandle(argv, rl);
            return;
        }
        if (comd === 'help') {
            help();
            rl.prompt();
            return;
        }
        if (consts_1.consts.COMANDS_MAP[comd]) {
            var INFOS = consts_1.consts.COMANDS_MAP[comd];
            for (var i = 0; i < INFOS.length; i++) {
                util.log(INFOS[i]);
            }
            rl.prompt();
            return;
        }
        util.errorHandle(argv, rl);
    }
}
exports.Command = Command;
var help = function () {
    var HELP_INFO_1 = consts_1.consts.HELP_INFO_1;
    for (var i = 0; i < HELP_INFO_1.length; i++) {
        util.log(HELP_INFO_1[i]);
    }
    var COMANDS_ALL = consts_1.consts.COMANDS_ALL;
    util.log(cliff.stringifyRows(COMANDS_ALL));
    var HELP_INFO_2 = consts_1.consts.HELP_INFO_2;
    for (var i = 0; i < HELP_INFO_2.length; i++) {
        util.log(HELP_INFO_2[i]);
    }
};
//# sourceMappingURL=help.js.map