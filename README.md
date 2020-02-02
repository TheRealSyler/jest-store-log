<span id="BADGE_GENERATION_MARKER_0"></span>
[![npmV](https://img.shields.io/npm/v/y?color=green)](https://www.npmjs.com/package/y) [![min](https://img.shields.io/bundlephobia/min/y)](https://bundlephobia.com/result?p=y) [![install](https://badgen.net/packagephobia/install/y)](https://packagephobia.now.sh/result?p=y) [![githubLastCommit](https://img.shields.io/github/last-commit/TheRealSyler/jest-store-log)](https://github.com/TheRealSyler/jest-store-log)
<span id="BADGE_GENERATION_MARKER_1"></span>

# Usage

```typescript
test('TEST', () => {
  const log = new JestStoreLog();

  // test console.log
  console.log('hello world');
  expect(log.data).toBe(`hello world`);

  log.TestEnd(); // IMPORTANT call TestEnd at the end of your test.
});
```

## License

<span id="LICENSE_GENERATION_MARKER_0"></span>
Copyright (c) 2020 Leonard Grosoli Licensed under the MIT license.
<span id="LICENSE_GENERATION_MARKER_1"></span>
