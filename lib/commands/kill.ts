import { getLogger } from 'pinus-logger';
let logger = getLogger(__filename);
import * as util from '../util';
import { consts } from '../consts';
import * as cliff from 'cliff';
import { ICommand, AgentCommand } from '../command';
import { ReadLine } from 'readline';
import { AdminClient } from 'pinus-admin';

export default function (opts:object)
{
	return new Command(opts);
};

export let commandId = 'kill';
export let helpCommand = 'help kill';

export class Command implements ICommand
{
	constructor(opts:object)
	{

	}
	handle(agent: AgentCommand, comd: string, argv: string, msg: {[key:string]: string}, rl: ReadLine, client: AdminClient): void
	{
		rl.question(consts.KILL_QUESTION_INFO, function (answer)
		{
			if (answer === 'yes')
			{
				client.request(consts.CONSOLE_MODULE, {
					signal: "kill"
				}, function (err:Error, data:any)
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