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
exports.commandId = 'use';
exports.helpCommand = 'help use';
class Command {
    constructor(opts) {
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
        if (comd === 'all') {
            util.log('\nswitch to server: ' + comd + '\n');
            Context = comd;
            agent.setContext(Context);
            var PROMPT = user + consts_1.consts.PROMPT + Context + '>';
            rl.setPrompt(PROMPT);
            rl.prompt();
            return;
        }
        client.request('watchServer', {
            comd: 'servers',
            context: Context
        }, function (err, data) {
            if (err)
                console.log(err);
            else {
                var _msg = data['msg'];
                if (_msg[comd]) {
                    util.log('\nswitch to server: ' + comd + '\n');
                    Context = comd;
                    agent.setContext(Context);
                    var PROMPT = user + consts_1.consts.PROMPT + Context + '>';
                    rl.setPrompt(PROMPT);
                }
                else {
                    util.log('\ncommand \'use ' + comd + '\' error for serverId ' + comd + ' not in pomelo clusters\n');
                }
            }
            rl.prompt();
        });
    }
}
exports.Command = Command;
//# sourceMappingURL=use.js.map