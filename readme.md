# retext-intensify [![Build Status][travis-badge]][travis] [![Coverage Status][codecov-badge]][codecov]

Check for weak and mitigating wording with [**retext**][retext].

## Installation

[npm][]:

```bash
npm install retext-intensify
```

## Usage

```js
var retext = require('retext');
var intensify = require('retext-intensify');
var report = require('vfile-reporter');

retext()
  .use(intensify)
  .process([
    'Some people say there are quite some ',
    'problems, apparently.',
    ''
  ].join('\n'), function (err, file) {
    console.log(report(err || file));
  });
```

Yields:

```txt
<stdin>
    1:1-1:5  warning  Don’t use “Some”, it’s vague or ambiguous       weasel
  1:13-1:16  warning  Don’t use “say”, it lessens impact              hedge
  1:27-1:32  warning  Don’t use “quite”, it’s vague or ambiguous      weasel
  1:33-1:37  warning  Don’t use “some”, it’s vague or ambiguous       weasel
  2:11-2:21  warning  Don’t use “apparently”, it doesn’t add meaning  filler

⚠ 5 warnings
```

## API

### `retext().use(intensify[, options])`

Check for weak and mitigating wording: [weasels][wiki-weasels],
[hedges][wiki-hedges], and [fillers][wiki-fillers].

###### `options`

*   `ignore` (`Array.<string>`) — phrases _not_ to warn about.

## License

[MIT][license] © [Titus Wormer][author]

<!-- Definitions -->

[travis-badge]: https://img.shields.io/travis/wooorm/retext-intensify.svg

[travis]: https://travis-ci.org/wooorm/retext-intensify

[codecov-badge]: https://img.shields.io/codecov/c/github/wooorm/retext-intensify.svg

[codecov]: https://codecov.io/github/wooorm/retext-intensify

[npm]: https://docs.npmjs.com/cli/install

[license]: LICENSE

[author]: http://wooorm.com

[retext]: https://github.com/wooorm/retext

[wiki-weasels]: https://en.wikipedia.org/wiki/Weasel_word

[wiki-fillers]: https://en.wikipedia.org/wiki/Filler_%28linguistics%29

[wiki-hedges]: https://en.wikipedia.org/wiki/Hedge_%28linguistics%29
