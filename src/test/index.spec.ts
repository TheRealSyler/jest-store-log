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

  const b = new JestStoreLog({ error: true });
  console.error('sad', 'awd');
  expect(b.errors).toStrictEqual(['sad', 'awd']);
  b.restore();

  const c = new JestStoreLog({ warn: true });
  console.warn('sad', 'awd');
  expect(c.warnings).toStrictEqual(['sad', 'awd']);
  c.restore();

  const d = new JestStoreLog({ warn: true, error: true });
  console.warn('warn');
  expect(d.warnings).toStrictEqual(['warn']);
  console.log('log');
  expect(d.logs).toStrictEqual(['log']);
  console.error('error');
  expect(d.errors).toStrictEqual(['error']);

  expect(d.all).toStrictEqual(['warn', 'log', 'error']);
  d.restore();
});
