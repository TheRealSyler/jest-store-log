export class JestStoreLog {
  /**string `console.log` function. */
  data = '';
  private oldConsoleLog = console['log'];
  constructor() {
    console['log'] = jest.fn(this.Store);
  }

  private Store = (inputs: string) => (this.data += inputs);
  /**Restores the `console.log `function. */
  TestEnd() {
    console.log = this.oldConsoleLog;
  }
}
export default JestStoreLog;
