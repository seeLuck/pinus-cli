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

export var commandId = 'add';
export var helpCommand = 'help add';

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

		var argvs = util.argsFilter(argv);

		rl.question(consts.ADD_QUESTION_INFO, function (answer)
		{
			if (answer === 'yes')
			{
				client.request(consts.CONSOLE_MODULE, {
					signal: 'add',
					args: argvs.slice(1)
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