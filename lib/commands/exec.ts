import { getLogger } from 'pomelo-logger';
var logger = getLogger(__filename);
import * as util from '../util';
import { consts } from '../consts';
import * as cliff from 'cliff';
import * as fs from 'fs';
import { ICommand, AgentCommand } from '../command';
import { ReadLine } from 'readline';
import { AdminClient } from 'pomelo-admin';

export default function (opts)
{
	return new Command(opts);
};

export var commandId = 'exec';
export var helpCommand = 'help exec';

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

		if (argvs.length > 2)
		{
			agent.handle(helpCommand, msg, rl, client);
			return;
		}

		var file = null;
		if (comd[0] !== '/')
		{
			comd = process.cwd() + '/' + comd;
		}

		try
		{
			file = fs.readFileSync(comd).toString();
		} catch (e)
		{
			util.log(consts.COMANDS_EXEC_ERROR);
			rl.prompt();
			return;
		}

		client.request('scripts', {
			command: 'run',
			serverId: Context,
			script: file
		}, function (err, msg)
			{
				if (err) console.log(err);
				else
				{
					try
					{
						msg = JSON.parse(msg);
						util.formatOutput(commandId, msg);
					} catch (e)
					{
						util.log('\n' + msg + '\n');
					}
				}
				rl.prompt();
			});
	}

}