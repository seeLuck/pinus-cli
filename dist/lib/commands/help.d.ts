export default function (opts: any): Command;
export declare var commandId: string;
export declare class Command {
    constructor(opts: any);
    handle(agent: any, comd: any, argv: any, rl: any, client: any, msg: any): void;
}
