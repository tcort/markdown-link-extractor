'use strict';

const marked = require('marked');
const he = require('he');

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
            // https://marked.js.org/demo/?outputType=lexer&text=%3Cmyemail%40some.com%3E&options=%7B%0A%20%22baseUrl%22%3A%20null%2C%0A%20%22breaks%22%3A%20false%2C%0A%20%22gfm%22%3A%20true%2C%0A%20%22headerIds%22%3A%20true%2C%0A%20%22headerPrefix%22%3A%20%22%22%2C%0A%20%22highlight%22%3A%20null%2C%0A%20%22langPrefix%22%3A%20%22language-%22%2C%0A%20%22mangle%22%3A%20true%2C%0A%20%22pedantic%22%3A%20false%2C%0A%20%22sanitize%22%3A%20false%2C%0A%20%22sanitizer%22%3A%20null%2C%0A%20%22silent%22%3A%20false%2C%0A%20%22smartLists%22%3A%20false%2C%0A%20%22smartypants%22%3A%20false%2C%0A%20%22tokenizer%22%3A%20null%2C%0A%20%22walkTokens%22%3A%20null%2C%0A%20%22xhtml%22%3A%20false%0A%7D&version=master
            // Marked translates mailto links into HTML encoded characters,
            // the following code block uses the HTML entities
            // (https://www.npmjs.com/package/he) package to decode characters.
            if (/(mailto:)&.+;/.test(token.href)){
                links.push(he.decode(token.href));
            } else {
                links.push(token.href);
            }
            
        } else if (token.type === 'image') {
            links.push(token.href);
        }
    };

    marked.use({ tokenizer, walkTokens });
    marked(markdown);

    return links;
};
