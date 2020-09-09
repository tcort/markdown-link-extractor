'use strict';

const marked = require('marked');

module.exports = function markdownLinkExtractor(markdown) {
    const links = [];

    // Taken from https://github.com/markedjs/marked/issues/1279
    // removed ? after first ! so that it only matches images.
    const image = /^!\[((?:\[[^\[\]]*\]|\\[\[\]]?|`[^`]*`|[^\[\]\\])*?)\]\(\s*(<(?:\\[<>]?|[^\s<>\\])*>|(?:\\[()]?|\([^\s\x00-\x1f()\\]*\)|[^\s\x00-\x1f()\\])*?(?:\s+=(?:[\w%]+)?x(?:[\w%]+)?)?)(?:\s+("(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)))?\s*\)$/;

    const tokenizer = {
        link(src) {
            const match = src.match(image);
            if (match) {
                return {
                    type: 'image',
                    raw: src,
                    href: match[2] ? match[2].replace(/ =\d*%?x\d*%?$/, "") : null,
                    title: match[3] ? match[3] : null,
                    text: match[1] ? match[1] : null,
                };
            }
            return false;
        }
    };

    const walkTokens = (token) => {
        if (token.type === 'link') {
            links.push(token.href);
        } else if (token.type === 'image') {
            links.push(token.href);
        }
    };

    marked.setOptions({
        mangle: false, // don't escape autolinked email address with HTML character references.
    });
    marked.use({ tokenizer, walkTokens });
    marked(markdown);

    return links;
};
