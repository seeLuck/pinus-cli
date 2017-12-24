import {getLogger} from 'pomelo-logger';
var logger = getLogger(__filename);
import * as util from '../util';
import {consts} from '../consts';
import * as cliff from 'cliff';

export default function(opts) {
	return new Command(opts);
};

export var commandId = 'set';
export var helpCommand = 'help set';

export class Command 
{
	constructor(opts)
	{
		
	}
	handle(agent, comd, argv, rl, client, msg){
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

	if(argvs.length < 3){
		agent.handle(helpCommand, msg, rl, client);
		return;
	}

	var param = {
		key: argvs[1],
		value: argvs[2]
	};

	client.request('watchServer', {
		comd: commandId,
		param: param,
		context: Context
	}, function(err, data) {
		if (err) console.log(err);
		else util.formatOutput(commandId, data);
		rl.prompt();
	});
}
}