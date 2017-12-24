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
exports.commandId = 'run';
exports.helpCommand = 'help run';
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
        if (argvs.length < 2) {
            agent.handle(exports.helpCommand, msg, rl, client);
            return;
        }
        client.request('watchServer', {
            comd: exports.commandId,
            param: comd,
            context: Context
        }, function (err, data) {
            if (err)
                console.log(err);
            else
                util.formatOutput(exports.commandId, data);
            rl.prompt();
        });
    }
}
exports.Command = Command;
//# sourceMappingURL=run.js.map