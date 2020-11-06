export class JestStoreLog {
  /**@deprecated use the logs property instead. */
  data = '';

  logs: any[] = [];
  private oldConsoleLog = console['log'];
  constructor() {
    console['log'] = jest.fn(this.Store);
  }

  private Store = (...inputs: any[]) => {
    if (typeof inputs[0] === 'string') {
      this.data += inputs[0];
    }

    this.logs.push(...inputs);
  };
  /**Restores the `console.log `function. */
  TestEnd() {
    console.log = this.oldConsoleLog;
  }
}
export default JestStoreLog;
