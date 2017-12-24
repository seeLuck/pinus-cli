import {getLogger} from 'pomelo-logger';
var logger = getLogger(__filename);
import * as util from '../util';
import {consts} from '../consts';
import * as cliff from 'cliff';

export default function(opts) {
	return new Command(opts);
};

export var commandId = 'use';
export var helpCommand = 'help use';

export class Command 
{
	constructor(opts)
	{
		
	}
	handle(agent, comd, argv, rl, client, msg) {
	if (!comd) {
		agent.handle(helpCommand, msg, rl, client);
		return;
	}

	var Context = agent.getContext();
	var argvs = util.argsFilter(argv);

	if (argvs.length > 2) {
		agent.handle(helpCommand, msg, rl, client);
		return;
	}

	var user = msg['user'] || 'admin';

	if (comd === 'all') {
		util.log('\nswitch to server: ' + comd + '\n');
		Context = comd;
		agent.setContext(Context);
		var PROMPT = user + consts.PROMPT + Context + '>';
		rl.setPrompt(PROMPT);
		rl.prompt();
		return;
	}

	client.request('watchServer', {
		comd: 'servers',
		context: Context
	}, function(err, data) {
		if (err) console.log(err);
		else {
			var _msg = data['msg'];
			if (_msg[comd]) {
				util.log('\nswitch to server: ' + comd + '\n');
				Context = comd;
				agent.setContext(Context);
				var PROMPT = user + consts.PROMPT + Context + '>';
				rl.setPrompt(PROMPT);
			} else {
				util.log('\ncommand \'use ' + comd + '\' error for serverId ' + comd + ' not in pomelo clusters\n');
			}
		}
		rl.prompt();
	});
}
}