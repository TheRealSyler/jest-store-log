interface Options {
  /**mock the console.error function */
  error?: boolean;
  /**mock the console.warn function */
  warn?: boolean;
  /* add stdout.write listener   */
  stdout?: boolean;
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

  /**stores data. */
  all: any[] = [];

  /**stores data from the process.stdout.write function, the stdout option has to be enabled. */
  stdout: (string | Uint8Array)[] = [];

  private oldConsoleLog = console['log'];
  private oldConsoleError = console['error'];
  private oldConsoleWarn = console['warn'];
  private oldStdoutWrite = process.stdout.write;
  constructor(private option?: Options) {
    console['log'] = this.storeLog;
    if (this.option) {
      if (this.option.stdout) {
        process.stdout.write = this.storeStdoutWrite.bind(this);
      }
      if (this.option.error) {
        console['error'] = this.storeError;
      }
      if (this.option.warn) {
        console['warn'] = this.storeWarn;
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

  private storeStdoutWrite(buffer: string | Uint8Array) {
    this.all.push(buffer);
    this.stdout.push(buffer);

    return true;
  }

  /**@deprecated use the restore method instead. */
  TestEnd() {
    this.restore();
  }
  /**Restores the `console.log `function. */
  restore() {
    console.log = this.oldConsoleLog;
    if (this.option) {
      if (this.option.stdout) {
        process.stdout.write = this.oldStdoutWrite;
      }
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
