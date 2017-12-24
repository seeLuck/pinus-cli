import { consts } from './consts';
import * as util from './util';
import * as cliff from 'cliff';
import * as fs from 'fs';
import { isFunction } from 'util';
import { AdminClient } from 'pomelo-admin';
import { ReadLine } from 'readline';

export interface ICommand
{
	handle(agent: AgentCommand, comd: string, argv: string, msg: string, rl: ReadLine, client: AdminClient): void;
}

export class AgentCommand
{
	commands = {};
	Context = 'all';

	constructor()
	{
		this.init();
	}
	init()
	{
		var self = this;
		fs.readdirSync(__dirname + '/commands').forEach(function (filename)
		{
			if (/\.js$/.test(filename))
			{
				var name = filename.substr(0, filename.lastIndexOf('.'));
				var _command = require('./commands/' + name).default;
				if (isFunction(_command))
				{
					self.commands[name] = _command;
				}
			}
		});
	}

	handle(argv: string, msg: any, rl: ReadLine, client: AdminClient): void
	{
		var self = this;
		var argvs = util.argsFilter(argv);
		var comd = argvs[0];
		var comd1 = argvs[1] || "";

		comd1 = comd1.trim();
		var m = this.commands[comd];
		if (m)
		{
			var _command = m();
			_command.handle(self, comd1, argv, rl, client, msg);
		} else
		{
			util.errorHandle(argv, rl);
		}
	}

	quit(rl)
	{
		rl.emit('close');
	}

	kill(rl, client)
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

	getContext()
	{
		return this.Context;
	}

	setContext(context)
	{
		this.Context = context;
	}
}


export default function ()
{
	return new AgentCommand();
}