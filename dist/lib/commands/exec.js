"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pomelo_logger_1 = require("pomelo-logger");
var logger = pomelo_logger_1.getLogger(__filename);
const util = require("../util");
const consts_1 = require("../consts");
const fs = require("fs");
function default_1(opts) {
    return new Command(opts);
}
exports.default = default_1;
;
exports.commandId = 'exec';
exports.helpCommand = 'help exec';
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
        if (argvs.length > 2) {
            agent.handle(exports.helpCommand, msg, rl, client);
            return;
        }
        var file = null;
        if (comd[0] !== '/') {
            comd = process.cwd() + '/' + comd;
        }
        try {
            file = fs.readFileSync(comd).toString();
        }
        catch (e) {
            util.log(consts_1.consts.COMANDS_EXEC_ERROR);
            rl.prompt();
            return;
        }
        client.request('scripts', {
            command: 'run',
            serverId: Context,
            script: file
        }, function (err, msg) {
            if (err)
                console.log(err);
            else {
                try {
                    msg = JSON.parse(msg);
                    util.formatOutput(exports.commandId, msg);
                }
                catch (e) {
                    util.log('\n' + msg + '\n');
                }
            }
            rl.prompt();
        });
    }
}
exports.Command = Command;
//# sourceMappingURL=exec.js.map