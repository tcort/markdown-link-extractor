'use strict';

var marked = require('marked');

module.exports = function markdownLinkExtractor(markdown) {
    var data = [];

    var renderer = new marked.Renderer();

    // Taken from https://github.com/markedjs/marked/issues/1279
    var linkWithImageSizeSupport = /^!?\[((?:\[[^\[\]]*\]|\\[\[\]]?|`[^`]*`|[^\[\]\\])*?)\]\(\s*(<(?:\\[<>]?|[^\s<>\\])*>|(?:\\[()]?|\([^\s\x00-\x1f()\\]*\)|[^\s\x00-\x1f()\\])*?(?:\s+=(?:[\w%]+)?x(?:[\w%]+)?)?)(?:\s+("(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)))?\s*\)/;

    marked.InlineLexer.rules.normal.link = linkWithImageSizeSupport;
    marked.InlineLexer.rules.gfm.link = linkWithImageSizeSupport;
    marked.InlineLexer.rules.breaks.link = linkWithImageSizeSupport;
    
    renderer.link = function (href, title, text) {
        var myLink = {
            "title": title,
            "text": text,
            "link": href
          }
        data.push(myLink); // Return More Data
    };
    renderer.image = function (href, title, text) {
        // Remove image size at the end, e.g. ' =20%x50'
        href = href.replace(/ =\d*%?x\d*%?$/, "");
        var myLink = {
            "title": title,
            "text": text,
            "link": href
          }
        data.push(myLink); // Return More Data
    };
    marked(markdown, { renderer: renderer });

    return data;
};
