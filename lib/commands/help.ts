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

export var commandId = 'help';

export class Command implements ICommand
{
	constructor(opts)
	{

	}
	handle(agent: AgentCommand, comd: string, argv: string, msg: string, rl: ReadLine, client: AdminClient): void
	{
		if (!comd)
		{
			util.errorHandle(argv, rl);
			return;
		}

		var argvs = util.argsFilter(argv);

		if (argvs.length > 2)
		{
			util.errorHandle(argv, rl);
			return;
		}

		if (comd === 'help')
		{
			help();
			rl.prompt();
			return;
		}

		if (consts.COMANDS_MAP[comd])
		{
			var INFOS = consts.COMANDS_MAP[comd];
			for (var i = 0; i < INFOS.length; i++)
			{
				util.log(INFOS[i]);
			}
			rl.prompt();
			return;
		}

		util.errorHandle(argv, rl);
	}
}
var help = function ()
{
	var HELP_INFO_1 = consts.HELP_INFO_1;
	for (var i = 0; i < HELP_INFO_1.length; i++)
	{
		util.log(HELP_INFO_1[i]);
	}

	var COMANDS_ALL = consts.COMANDS_ALL;
	util.log(cliff.stringifyRows(COMANDS_ALL));

	var HELP_INFO_2 = consts.HELP_INFO_2;
	for (var i = 0; i < HELP_INFO_2.length; i++)
	{
		util.log(HELP_INFO_2[i]);
	}
}