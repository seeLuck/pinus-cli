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
exports.commandId = 'stop';
exports.helpCommand = 'help stop';
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
        var ids = [];
        if (comd !== 'all') {
            ids = argvs.slice(1);
        }
        rl.question(consts_1.consts.STOP_QUESTION_INFO, function (answer) {
            if (answer === 'yes') {
                client.request(consts_1.consts.CONSOLE_MODULE, {
                    signal: "stop",
                    ids: ids
                }, function (err, data) {
                    if (err)
                        console.log(err);
                    else
                        util.formatOutput(comd, data);
                    rl.prompt();
                });
            }
            else {
                rl.prompt();
            }
        });
    }
}
exports.Command = Command;
//# sourceMappingURL=stop.js.map