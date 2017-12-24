export declare class Command {
    commands: {};
    Context: string;
    constructor();
    init(): void;
    handle(argv: any, msg: any, rl: any, client: any): void;
    quit(rl: any): void;
    kill(rl: any, client: any): void;
    getContext(): string;
    setContext(context: any): void;
}
export default function (): Command;
