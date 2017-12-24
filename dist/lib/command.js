"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const consts_1 = require("./consts");
const util = require("./util");
const fs = require("fs");
const util_1 = require("util");
class AgentCommand {
    constructor() {
        this.commands = {};
        this.Context = 'all';
        this.init();
    }
    init() {
        var self = this;
        fs.readdirSync(__dirname + '/commands').forEach(function (filename) {
            if (/\.js$/.test(filename)) {
                var name = filename.substr(0, filename.lastIndexOf('.'));
                var _command = require('./commands/' + name).default;
                if (util_1.isFunction(_command)) {
                    self.commands[name] = _command;
                }
            }
        });
    }
    handle(argv, msg, rl, client) {
        var self = this;
        var argvs = util.argsFilter(argv);
        var comd = argvs[0];
        var comd1 = argvs[1] || "";
        comd1 = comd1.trim();
        var m = this.commands[comd];
        if (m) {
            var _command = m();
            _command.handle(self, comd1, argv, rl, client, msg);
        }
        else {
            util.errorHandle(argv, rl);
        }
    }
    quit(rl) {
        rl.emit('close');
    }
    kill(rl, client) {
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
    getContext() {
        return this.Context;
    }
    setContext(context) {
        this.Context = context;
    }
}
exports.AgentCommand = AgentCommand;
function default_1() {
    return new AgentCommand();
}
exports.default = default_1;
//# sourceMappingURL=command.js.map