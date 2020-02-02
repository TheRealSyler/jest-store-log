export class JestStoreLog {
  data = '';
  private oldConsoleLog = console['log'];
  constructor() {
    console['log'] = jest.fn(this.Store);
  }

  Store = (inputs: string) => (this.data += inputs);

  TestEnd() {
    console.log = this.oldConsoleLog;
  }
}
export default JestStoreLog;
