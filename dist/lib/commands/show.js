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
exports.commandId = 'show';
exports.helpCommand = 'help show';
class Command {
    constructor(opts) {
    }
    handle(agent, comd, argv, rl, client, msg) {
        if (!comd) {
            agent.handle(exports.helpCommand, msg, rl, client);
            return;
        }
        var Context = agent.getContext();
        var argvs = util.argsFilter(argv);
        var param = "";
        if (argvs.length > 2 && comd !== 'config') {
            agent.handle(exports.helpCommand, msg, rl, client);
            return;
        }
        if (argvs.length > 3 && comd === 'config') {
            agent.handle(exports.helpCommand, msg, rl, client);
            return;
        }
        if (argvs.length === 3 && comd === 'config') {
            param = argvs[2];
        }
        var user = msg['user'] || 'admin';
        if (Context === 'all' && consts_1.consts.CONTEXT_COMMAND[comd]) {
            util.log('\n' + consts_1.consts.COMANDS_CONTEXT_ERROR + '\n');
            rl.prompt();
            return;
        }
        if (!consts_1.consts.SHOW_COMMAND[comd]) {
            agent.handle(exports.helpCommand, msg, rl, client);
            return;
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
//# sourceMappingURL=show.js.map