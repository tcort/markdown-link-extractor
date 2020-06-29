# markdown-link-extractor

Extracts links from markdown texts.

## Installation
```bash
$ npm install --save markdown-link-extractor
```
## API

### markdownLinkExtractor(markdown)

Parameters:

* `markdown` text in markdown format.

Returns:

* an array containing the URLs from the links found.

## Examples

```js
const { readFileSync } = require('fs');
const markdownLinkExtractor = require('markdown-link-extractor');

const markdown = readFileSync('README.md', {encoding: 'utf8'});

const links = markdownLinkExtractor(markdown);

links.forEach(link => {
  console.log(link);
});
```
## Testing

    npm test

## License

See [LICENSE.md](https://github.com/tcort/markdown-link-extractor/blob/master/LICENSE.md)
