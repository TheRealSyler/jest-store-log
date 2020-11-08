interface Options {
  /**mock the console.error function */
  error?: boolean;
  /**mock the console.warn function */
  warn?: boolean;
}

export class JestStoreLog {
  /**@deprecated use the logs property instead. */
  data = '';
  /**stores data from the console.log function. */
  logs: any[] = [];
  /**stores data from the console.warn function, the warn option has to be enabled. */
  warnings: any[] = [];
  /**stores data from the console.error function, the error option has to be enabled. */
  errors: any[] = [];
  /**stores data from the console.[log|warn|error] functions. */
  all: any[] = [];

  private oldConsoleLog = console['log'];
  private oldConsoleError = console['error'];
  private oldConsoleWarn = console['warn'];
  constructor(private option?: Options) {
    console['log'] = jest.fn(this.storeLog);
    if (this.option) {
      if (this.option.error) {
        console['error'] = jest.fn(this.storeError);
      }
      if (this.option.warn) {
        console['warn'] = jest.fn(this.storeWarn);
      }
    }
  }

  private storeLog = (...inputs: any[]) => {
    if (typeof inputs[0] === 'string') {
      this.data += inputs[0];
    }
    this.all.push(...inputs);
    this.logs.push(...inputs);
  };
  private storeError = (...inputs: any[]) => {
    this.all.push(...inputs);
    this.errors.push(...inputs);
  };
  private storeWarn = (...inputs: any[]) => {
    this.all.push(...inputs);
    this.warnings.push(...inputs);
  };

  /**@deprecated use the restore method instead. */
  TestEnd() {
    this.restore();
  }
  /**Restores the `console.log `function. */
  restore() {
    console.log = this.oldConsoleLog;
    if (this.option) {
      if (this.option.error) {
        console.error = this.oldConsoleError;
      }
      if (this.option.warn) {
        console.warn = this.oldConsoleWarn;
      }
    }
  }
}
export default JestStoreLog;
