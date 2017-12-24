"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const readline = require("readline");
const pomelo_admin_1 = require("pomelo-admin");
const command = require("./command");
const consts_1 = require("./consts");
const util = require("./util");
const optimist_1 = require("optimist");
var username = optimist_1.argv['u'] = optimist_1.argv['u'] || 'monitor';
var password = optimist_1.argv['p'] = optimist_1.argv['p'] || 'monitor';
var host = optimist_1.argv['h'] = optimist_1.argv['h'] || 'localhost';
var port = optimist_1.argv['P'] = optimist_1.argv['P'] || 3005;
var context = 'all';
var client = null;
function doConnect() {
    client = new pomelo_admin_1.AdminClient({
        username: username,
        password: password,
        md5: true
    });
    var id = 'pomelo_cli_' + Date.now();
    client.connect(id, host, port, function (err) {
        if (err) {
            util.log('\n' + err + '\n');
            process.exit(0);
        }
        else {
            var ASCII_LOGO = consts_1.consts.ASCII_LOGO;
            for (var i = 0; i < ASCII_LOGO.length; i++) {
                util.log(ASCII_LOGO[i]);
            }
            var WELCOME_INFO = consts_1.consts.WELCOME_INFO;
            for (var i = 0, l = WELCOME_INFO.length; i < l; i++) {
                util.log(WELCOME_INFO[i]);
            }
            startCli();
        }
    });
    client.on('close', function () {
        client.socket.disconnect();
        util.log('\ndisconnect from master');
        process.exit(0);
    });
}
exports.default = doConnect;
function startCli() {
    var rl = readline.createInterface(process.stdin, process.stdout, completer);
    var PROMPT = username + consts_1.consts.PROMPT + context + '>';
    rl.setPrompt(PROMPT);
    rl.prompt();
    var rootCommand = command.default();
    rl.on('line', function (line) {
        var key = line.trim();
        if (!key) {
            util.help();
            rl.prompt();
            return;
        }
        switch (key) {
            case 'help':
                util.help();
                rl.prompt();
                break;
            case '?':
                util.help();
                rl.prompt();
                break;
            case 'quit':
                rootCommand.quit(rl);
                break;
            case 'kill':
                rootCommand.kill(rl, client);
                break;
            default:
                rootCommand.handle(key, {
                    user: username
                }, rl, client);
                break;
        }
    }).on('close', function () {
        util.log('bye ' + username);
        process.exit(0);
    });
}
function completer(line) {
    line = line.trim();
    var completions = consts_1.consts.COMANDS_COMPLETE;
    var hits = [];
    // commands tab for infos 
    if (consts_1.consts.COMPLETE_TWO[line]) {
        if (line === "show") {
            for (var k in consts_1.consts.SHOW_COMMAND) {
                hits.push(k);
            }
        }
        else if (line === "help") {
            for (var k in consts_1.consts.COMANDS_COMPLETE_INFO) {
                hits.push(k);
            }
        }
        else if (line === "enable" || line === "disable") {
            hits.push("app");
            hits.push("module");
        }
        else if (line === "dump") {
            hits.push("memory");
            hits.push("cpu");
        }
    }
    hits = util.tabComplete(hits, line, consts_1.consts.COMANDS_COMPLETE_INFO, "complete");
    hits = util.tabComplete(hits, line, consts_1.consts.COMANDS_COMPLETE_INFO, "help");
    hits = util.tabComplete(hits, line, consts_1.consts.SHOW_COMMAND, "show");
    hits = util.tabComplete(hits, line, null, "enable");
    hits = util.tabComplete(hits, line, null, "disable");
    hits = util.tabComplete(hits, line, null, "disable");
    hits = util.tabComplete(hits, line, null, "dump");
    hits = util.tabComplete(hits, line, null, "use");
    hits = util.tabComplete(hits, line, null, "stop");
    // show all completions if none found
    return [hits.length ? hits : completions, line];
}
//# sourceMappingURL=cli.js.map