import JestStoreLog from '..';

test('stdout.write', () => {
  const log = new JestStoreLog({ stdout: true });
  process.stdout.write('awd');
  expect(log.stdout).toStrictEqual(['awd']);
  process.stdout.write(new Uint8Array([324]));
  expect(log.stdout).toStrictEqual(['awd', new Uint8Array([324])]);
  console.log('TEST');
  expect(log.all).toStrictEqual(['awd', new Uint8Array([324]), 'TEST']);
  log.restore();
  process.stdout.write('awd');
  console.log('test');
  expect(log.all).toStrictEqual(['awd', new Uint8Array([324]), 'TEST']);
});
