import {getLogger} from 'pomelo-logger';
var logger = getLogger(__filename);
import * as util from '../util';
import {consts} from '../consts';
import * as cliff from 'cliff';

export default function(opts) {
	return new Command(opts);
};

export var commandId = 'enable';
export var helpCommand = 'help enable';


export class Command 
{
	constructor(opts)
	{
		
	}
	handle = function(agent, comd, argv, rl, client, msg) {
	if (!comd) {
		agent.handle(helpCommand, msg, rl, client);
		return;
	}

	var Context = agent.getContext();
	if (Context === 'all') {
		util.log('\n' + consts.COMANDS_CONTEXT_ERROR + '\n');
		rl.prompt();
		return;
	}

	var argvs = util.argsFilter(argv);

	if (argvs.length > 3) {
		agent.handle(helpCommand, msg, rl, client);
		return;
	}

	var param = argvs[2];

	if (comd === 'module') {
		client.command(commandId, param, null, function(err, data) {
			if (err) console.log(err);
			else {
				if(data === 1){
					util.log('\ncommand ' + argv + ' ok\n');
				}	else {
					util.log('\ncommand ' + argv + ' bad\n');
				}
			}
			rl.prompt();
		});
	} else if (comd === 'app') {
		client.request('watchServer', {
			comd: commandId,
			param: param,
			context: Context
		}, function(err, data) {
			if (err) console.log(err);
			else util.log('\n' + data + '\n');
			rl.prompt();
		});
	} else {
		agent.handle(helpCommand, msg, rl, client);
	}
}
}