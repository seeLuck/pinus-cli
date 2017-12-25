/// <reference types="node" />
import { ICommand, AgentCommand } from '../command';
import { ReadLine } from 'readline';
import { AdminClient } from 'pinus-admin';
export default function (opts: any): Command;
export declare var commandId: string;
export declare var helpCommand: string;
export declare class Command implements ICommand {
    constructor(opts: any);
    handle(agent: AgentCommand, comd: string, argv: string, msg: string, rl: ReadLine, client: AdminClient): void;
}
