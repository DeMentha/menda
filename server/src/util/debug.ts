
import Debug = require('debug');

export interface LoggerOptions {
    info?: (message: any[]) => void;
    warn?: (message: any[]) => void;
    debug?: (message: any[]) => void;
    error?: (message: any[]) => void;
    fatal?: (message: any[]) => void;
}

class Debugger {
    namespace: string;
    debuggers: { [namespace: string]: Debug.IDebugger };
    options: LoggerOptions;

    constructor(namespace: string, options: LoggerOptions) {
        this.debuggers = {};
        this.namespace = namespace != null ? namespace : 'default';
        this.options = options != null ? options : {};
    }

    error(...message: any[]) {
        message.push('error');
        this.debug(...message);

        if (this.options.error) {
            this.options.error(message);
        }
    }

    log(...message: any[]) {
        message.push('log');
        this.debug(...message);

        if (this.options.info) {
            this.options.info(message);
        }
    }

    warn(...message: any[]) {
        message.push('warn');
        this.debug(...message);

        if (this.options.warn) {
            this.options.warn(message);
        }
    }

    custom(namespace: string, ...message: any[]) {
        message.push(namespace);
        this.debug(...message);

        if (this.options.info) {
            this.options.info(message);
        }
    }

    debug(...message: any[]) {
        const namespace = `${this.namespace}:${message[message.length - 1]}`;
        message.pop();

        let debug: Debug.IDebugger = this.debuggers[namespace];

        if (!debug) {
            debug = Debug(namespace);
            this.debuggers[namespace] = debug;
        }

        debug('', ...message);
    }
}

export default new Debugger('server', null);
