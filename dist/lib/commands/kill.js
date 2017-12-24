"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pomelo_logger_1 = require("pomelo-logger");
var logger = pomelo_logger_1.getLogger(__filename);
const consts_1 = require("../consts");
function default_1(opts) {
    return new Command(opts);
}
exports.default = default_1;
;
exports.commandId = 'kill';
exports.helpCommand = 'help kill';
class Command {
    constructor(opts) {
    }
    handle(agent, comd, argv, rl, client, msg) {
        rl.question(consts_1.consts.KILL_QUESTION_INFO, function (answer) {
            if (answer === 'yes') {
                client.request(consts_1.consts.CONSOLE_MODULE, {
                    signal: "kill"
                }, function (err, data) {
                    if (err)
                        console.log(err);
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
//# sourceMappingURL=kill.js.map