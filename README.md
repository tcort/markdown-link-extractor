# markdown-link-extractor

[![Build Status](https://travis-ci.org/tcort/markdown-link-extractor.svg?branch=master)](https://travis-ci.org/tcort/markdown-link-extractor)
[![npm version](https://img.shields.io/npm/v/markdown-link-extractor.svg)](https://www.npmjs.com/package/markdown-link-extractor)
[![npm downloads](https://img.shields.io/npm/dt/markdown-link-extractor.svg)](https://www.npmjs.com/package/markdown-link-extractor)
[![License](https://img.shields.io/badge/license-ISC-blue.svg)](https://raw.githubusercontent.com/tcort/markdown-link-extractor/master/LICENSE.md)

Extracts links from markdown texts.

## Installation

    npm install --save markdown-link-extractor

## API

### markdownLinkExtractor(markdown)

Parameters:

* `markdown` text in markdown format.

Returns:

* an array containing the URLs from the links found.

## Examples

    "use strict";

    var fs = require('fs');
    var markdownLinkExtractor = require('markdown-link-extractor');

    var markdown = fs.readFileSync('README.md').toString();

    var links = markdownLinkExtractor(markdown);

    links.forEach(function (link) {
        console.log(link);
    });

## Testing

    npm test

## License

See [LICENSE.md](https://github.com/tcort/markdown-link-extractor/blob/master/LICENSE.md)
