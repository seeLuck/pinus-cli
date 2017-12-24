import { getLogger } from 'pomelo-logger';
var logger = getLogger(__filename);
import * as util from '../util';
import { consts } from '../consts';
import * as cliff from 'cliff';
import { ICommand, AgentCommand } from '../command';
import { ReadLine } from 'readline';
import { AdminClient } from 'pomelo-admin';

export default function (opts)
{
	return new Command(opts);
};

export var commandId = 'get';
export var helpCommand = 'help get';

export class Command implements ICommand
{
	constructor(opts)
	{

	}
	handle(agent: AgentCommand, comd: string, argv: string, msg: string, rl: ReadLine, client: AdminClient): void
	{
		if (!comd)
		{
			agent.handle(helpCommand, msg, rl, client);
			return;
		}

		var Context = agent.getContext();
		if (Context === 'all')
		{
			util.log('\n' + consts.COMANDS_CONTEXT_ERROR + '\n');
			rl.prompt();
			return;
		}

		var argvs = util.argsFilter(argv);

		if (argvs.length < 2)
		{
			agent.handle(helpCommand, msg, rl, client);
			return;
		}

		client.request('watchServer', {
			comd: commandId,
			param: comd,
			context: Context
		}, function (err, data)
		{
			if (err) console.log(err);
			else util.formatOutput(commandId, data);
			rl.prompt();
		});
	}
}