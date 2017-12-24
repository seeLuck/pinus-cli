"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pomelo_logger_1 = require("pomelo-logger");
var logger = pomelo_logger_1.getLogger(__filename);
const util = require("../util");
const consts_1 = require("../consts");
function default_1(opts) {
    return new Command(opts);
}
exports.default = default_1;
;
exports.commandId = 'dump';
exports.helpCommand = 'help dump';
class Command {
    constructor(opts) {
    }
    handle(agent, comd, argv, msg, rl, client) {
        if (!comd) {
            agent.handle(exports.helpCommand, msg, rl, client);
            return;
        }
        var Context = agent.getContext();
        if (Context === 'all') {
            util.log('\n' + consts_1.consts.COMANDS_CONTEXT_ERROR + '\n');
            rl.prompt();
            return;
        }
        var argvs = util.argsFilter(argv);
        if (argvs.length < 3 || (comd === 'cpu' && argvs.length < 4)) {
            agent.handle(exports.helpCommand, msg, rl, client);
            return;
        }
        var param = {};
        if (comd === 'memory') {
            param = {
                filepath: argvs[2],
                force: (argvs[3] === '--force' ? true : false)
            };
        }
        else if (comd === 'cpu') {
            param = {
                filepath: argvs[2],
                times: argvs[3],
                force: (argvs[4] === '--force' ? true : false)
            };
        }
        client.request('watchServer', {
            comd: comd,
            param: param,
            context: Context
        }, function (err, data) {
            if (err)
                console.log(err);
            else
                util.formatOutput(comd, data);
            rl.prompt();
        });
    }
}
exports.Command = Command;
//# sourceMappingURL=dump.js.map