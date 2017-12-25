import { getLogger } from 'pinus-logger';
var logger = getLogger(__filename);
import * as util from '../util';
import { consts } from '../consts';
import * as cliff from 'cliff';
import { ICommand, AgentCommand } from '../command';
import { ReadLine } from 'readline';
import { AdminClient } from 'pinus-admin';

export default function (opts)
{
	return new Command(opts);
};

export var commandId = 'config';
export var helpCommand = 'help config';

export class Command implements ICommand
{
	constructor(opt)
	{

	}

	handle(agent : AgentCommand , comd : string , argv : string, msg : string, rl : ReadLine, client : AdminClient):void
	{
		if (!comd)
		{
			agent.handle(helpCommand, msg, rl, client);
			return;
		}
		var Context = agent.getContext();
		var argvs = util.argsFilter(argv);

		if (argvs.length > 2)
		{
			agent.handle(helpCommand, msg, rl, client);
			return;
		}

		var user = msg['user'] || 'admin';

		if (Context === 'all')
		{
			util.log('\n' + consts.COMANDS_CONTEXT_ERROR + '\n');
			rl.prompt();
			return;
		}

		client.request('watchServer', {
			comd: commandId,
			param: comd,
			context: Context
		}, function (err, data)
			{
				if (err) console.log(err);
				else util.log('\n' + cliff.inspect(data) + '\n');
				rl.prompt();
			});
	}
}