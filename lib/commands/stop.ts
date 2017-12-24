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

export var commandId = 'stop';
export var helpCommand = 'help stop';

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

		var ids = [];
		if (comd !== 'all')
		{
			ids = argvs.slice(1);
		}

		rl.question(consts.STOP_QUESTION_INFO, function (answer)
		{
			if (answer === 'yes')
			{
				client.request(consts.CONSOLE_MODULE, {
					signal: "stop",
					ids: ids
				}, function (err, data)
				{
					if (err) console.log(err);
					else util.formatOutput(comd, data);
					rl.prompt();
				});
			} else
			{
				rl.prompt();
			}
		});
	}
}