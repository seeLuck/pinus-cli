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

export var commandId = 'set';
export var helpCommand = 'help set';

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

		if (argvs.length < 3)
		{
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
		}, function (err, data)
		{
			if (err) console.log(err);
			else util.formatOutput(commandId, data);
			rl.prompt();
		});
	}
}