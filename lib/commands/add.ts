import { getLogger } from 'pomelo-logger';
var logger = getLogger(__filename);
import * as util from '../util';
import { consts } from '../consts';
import * as cliff from 'cliff';

export default function (opts)
{
	return new Command(opts);
};

export var commandId = 'add';
export var helpCommand = 'help add';

export class Command 
{
	constructor(opts)
	{

	}
	handle(agent, comd, argv, rl, client, msg)
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