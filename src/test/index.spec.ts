import { JestStoreLog } from '../index';

test('test', () => {
  const a = new JestStoreLog();
  console.log('awd', 'test');
  expect(a.data).toEqual('awd');
  expect(a.logs).toStrictEqual(['awd', 'test']);

  console.log(':awd2');
  expect(a.data).toEqual('awd:awd2');
  expect(a.logs).toStrictEqual(['awd', 'test', ':awd2']);
  console.log({ awd: 'test' });
  expect(a.data).toEqual('awd:awd2');
  expect(a.logs).toStrictEqual(['awd', 'test', ':awd2', { awd: 'test' }]);
  a.TestEnd();
});
