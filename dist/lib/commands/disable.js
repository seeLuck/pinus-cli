"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pinus_logger_1 = require("pinus-logger");
var logger = pinus_logger_1.getLogger(__filename);
const util = require("../util");
const consts_1 = require("../consts");
function default_1(opts) {
    return new Command(opts);
}
exports.default = default_1;
;
exports.commandId = 'disable';
exports.helpCommand = 'help disable';
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
        if (argvs.length > 3) {
            agent.handle(exports.helpCommand, msg, rl, client);
            return;
        }
        var param = argvs[2];
        if (comd === 'module') {
            client.command(exports.commandId, param, null, function (err, data) {
                if (err)
                    console.log(err);
                else {
                    if (data === 1) {
                        util.log('\ncommand ' + argv + ' ok\n');
                    }
                    else {
                        util.log('\ncommand ' + argv + ' bad\n');
                    }
                }
                rl.prompt();
            });
        }
        else if (comd === 'app') {
            client.request('watchServer', {
                comd: exports.commandId,
                param: param,
                context: Context
            }, function (err, data) {
                if (err)
                    console.log(err);
                else
                    util.log('\n' + data + '\n');
                rl.prompt();
            });
        }
        else {
            agent.handle(exports.helpCommand, msg, rl, client);
        }
    }
}
exports.Command = Command;
//# sourceMappingURL=disable.js.map