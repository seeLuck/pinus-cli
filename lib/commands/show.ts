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

export var commandId = 'show';
export var helpCommand = 'help show';

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
		var argvs = util.argsFilter(argv);
		var param = "";

		if (argvs.length > 2 && comd !== 'config')
		{
			agent.handle(helpCommand, msg, rl, client);
			return;
		}

		if (argvs.length > 3 && comd === 'config')
		{
			agent.handle(helpCommand, msg, rl, client);
			return;
		}

		if (argvs.length === 3 && comd === 'config')
		{
			param = argvs[2];
		}

		var user = msg['user'] || 'admin';

		if (Context === 'all' && consts.CONTEXT_COMMAND[comd])
		{
			util.log('\n' + consts.COMANDS_CONTEXT_ERROR + '\n');
			rl.prompt();
			return;
		}

		if (!consts.SHOW_COMMAND[comd])
		{
			agent.handle(helpCommand, msg, rl, client);
			return;
		}

		client.request('watchServer', {
			comd: comd,
			param: param,
			context: Context
		}, function (err, data)
		{
			if (err) console.log(err);
			else util.formatOutput(comd, data);
			rl.prompt();
		});
	}
}