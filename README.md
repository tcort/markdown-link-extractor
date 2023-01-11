# markdown-link-extractor

Extracts links from markdown texts.

## Installation
```bash
$ npm install --save markdown-link-extractor
```
## API

### markdownLinkExtractor(markdown, checkAnchors = false)

Parameters:

* `markdown` text in markdown format.
* `anchors` if anchors should also be extracted.

Returns:

* an object with the following properties:
  * `.anchors`: an array of anchor tag strings (e.g. `[ "#foo", "#bar" ]`) - only filled if `checkAnchors` set `true`.
  * `.links`: an array containing the URLs from the links found.

## Examples

```js
const { readFileSync } = require('fs');
const markdownLinkExtractor = require('markdown-link-extractor');

const markdown = readFileSync('README.md', {encoding: 'utf8'});

const { links } = markdownLinkExtractor(markdown);
links.forEach(link => console.log(link));
```

## Upgrading to v5.0.0

- anchor link extraction reintroduced - be careful if you upgrade from version <`3.x` as the `extended` parameter got removed but now there is the `checkAnchors` parameter in place.

Code that looked like this:

```
const links = markdownLinkExtractor(str);
```

Should change to this:

```
const { links } = markdownLinkExtractor(str);
```

## Upgrading to v4.0.0

- anchor link extraction no longer supported

Code that looked like this:

```
const { links } = markdownLinkExtractor(str);
```

Should change to this:

```
const links = markdownLinkExtractor(str);
```

## Upgrading to v3.0.0

- extended mode no longer supported
- embedded image size parameters in `![]()` no longer supported

## Testing

    npm test

## License

See [LICENSE.md](https://github.com/tcort/markdown-link-extractor/blob/master/LICENSE.md)
