export default function (opts: any): Command;
export declare var commandId: string;
export declare var helpCommand: string;
export declare class Command {
    constructor(opt: any);
    handle(agent: any, comd: any, argv: any, rl: any, client: any, msg: any): void;
}
