import * as moment from 'moment';
import { ConsoleLogger, Injectable, LogLevel, Scope } from '@nestjs/common';
import { AppendFile } from 'utils/index.util';

@Injectable({ scope: Scope.TRANSIENT })
export class LoggerService extends ConsoleLogger {
  constructor() {
    super();
    this.setLogLevels(['debug', 'warn', 'error']);
  }

  private getLogFile(type: LogLevel) {
    return `${moment().format('YYYY-MM-DD')}.${type}.log`;
  }

  private handleColorizeMessage(
    message: any,
    Jsonfy: boolean = false,
  ): [message: any, ...optionalParams: any[]] {
    return [
      this.colorize(Jsonfy ? JSON.stringify(message) : message, 'verbose'),
    ];
  }

  logError(message: string, stack?: string, context?: string): void {
    AppendFile('logs/error', message, this.getLogFile('error'));
    super.error.apply(this, [message, stack, context]);
  }

  debug(...message: any): void {
    super.debug.apply(this, this.handleColorizeMessage(message));
  }

  logVerbose(message: string): void {
    AppendFile('logs/verbose', message, this.getLogFile('verbose'));
    super.debug.apply(this, this.handleColorizeMessage(`\n${message}`));
  }
}
