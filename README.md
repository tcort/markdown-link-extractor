# markdown-link-extractor

Extracts links from markdown texts.

## Installation

    npm install --save markdown-link-extractor

## API

### markdownLinkExtractor(markdown)

Parameters:

* `markdown` text in markdown format.

Returns:

* an array of objects containing the URLs from the links found.

## Examples

    "use strict";

    var fs = require('fs');
    var markdownLinkExtractor = require('markdown-link-extractor');

    var markdown = fs.readFileSync('README.md').toString();

    var linkData = markdownLinkExtractor(markdown);

    linkData.forEach(function (data) {
        console.log(data);

        /* Response
        [ 
            {title: "Section 1", link: "#section1", text: '...'},   
            {title: "Section 2", link: "#section2", text: '...'},   
            {title: "Section 3", link: "#section3", text: '...'},   
        ]
        */
    });

## Testing

    npm test

## License

See [LICENSE.md](https://github.com/tcort/markdown-link-extractor/blob/master/LICENSE.md)
