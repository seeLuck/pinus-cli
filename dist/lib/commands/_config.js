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
exports.commandId = 'config';
exports.helpCommand = 'help config';
class Command {
    constructor(opt) {
    }
    handle(agent, comd, argv, msg, rl, client) {
        if (!comd) {
            agent.handle(exports.helpCommand, msg, rl, client);
            return;
        }
        var Context = agent.getContext();
        var argvs = util.argsFilter(argv);
        if (argvs.length > 2) {
            agent.handle(exports.helpCommand, msg, rl, client);
            return;
        }
        var user = msg['user'] || 'admin';
        if (Context === 'all') {
            util.log('\n' + consts_1.consts.COMANDS_CONTEXT_ERROR + '\n');
            rl.prompt();
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
                util.log('\n' + cliff.inspect(data) + '\n');
            rl.prompt();
        });
    }
}
exports.Command = Command;
//# sourceMappingURL=_config.js.map