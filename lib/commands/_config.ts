import { getLogger } from 'pomelo-logger';
var logger = getLogger(__filename);
import * as util from '../util';
import { consts } from '../consts';
import * as cliff from 'cliff';

export default function(opts)
{
	return new Command(opts);
};

export var commandId = 'config';
export var helpCommand = 'help config';

export class Command
{
	constructor(opt)
	{

	}

	handle(agent, comd, argv, rl, client, msg)
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