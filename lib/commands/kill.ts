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

export var commandId = 'kill';
export var helpCommand = 'help kill';

export class Command implements ICommand
{
	constructor(opts)
	{

	}
	handle(agent: AgentCommand, comd: string, argv: string, msg: string, rl: ReadLine, client: AdminClient): void
	{
		rl.question(consts.KILL_QUESTION_INFO, function (answer)
		{
			if (answer === 'yes')
			{
				client.request(consts.CONSOLE_MODULE, {
					signal: "kill"
				}, function (err, data)
				{
					if (err) console.log(err);
					rl.prompt();
				});
			} else
			{
				rl.prompt();
			}
		});
	}
}