/// <reference types="node" />
import { AdminClient } from 'pomelo-admin';
import { ReadLine } from 'readline';
export interface ICommand {
    handle(agent: AgentCommand, comd: string, argv: string, msg: string, rl: ReadLine, client: AdminClient): void;
}
export declare class AgentCommand {
    commands: {};
    Context: string;
    constructor();
    init(): void;
    handle(argv: string, msg: any, rl: ReadLine, client: AdminClient): void;
    quit(rl: any): void;
    kill(rl: any, client: any): void;
    getContext(): string;
    setContext(context: any): void;
}
export default function (): AgentCommand;
