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
exports.commandId = 'blacklist';
exports.helpCommand = 'help blacklist';
class Command {
    constructor(opts) {
    }
    handle(agent, comd, argv, rl, client, msg) {
        if (!comd) {
            agent.handle(exports.helpCommand, msg, rl, client);
            return;
        }
        var argvs = util.argsFilter(argv);
        rl.question(consts_1.consts.BLACKLIST_QUESTION_INFO, function (answer) {
            if (answer === 'yes') {
                client.request(consts_1.consts.CONSOLE_MODULE, {
                    signal: 'blacklist',
                    args: argvs.slice(1)
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
//# sourceMappingURL=blacklist.js.map