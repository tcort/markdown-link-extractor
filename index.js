'use strict';

const { marked } = require('marked');
const htmlLinkExtractor = require('html-link-extractor');

module.exports = function markdownLinkExtractor(markdown, checkAnchors = false) {
    const anchors = [];
    if(checkAnchors) {
        const renderer = {
            heading(text, level, raw, slugger) {
                if (this.options.headerIds) {
                    var id = this.options.headerPrefix + slugger.slug(raw);
                    
                        anchors.push(`#${id}`);
                    
                    return "<h" + level + " id=\"" + id + "\">" + text + "</h" + level + ">\n";
                } // ignore IDs


                return "<h" + level + ">" + text + "</h" + level + ">\n";
            }
        };

        marked.use({ renderer });
    }

    marked.setOptions({
        mangle: false, // don't escape autolinked email address with HTML character references.
    });


    const html = marked(markdown);
    const links = htmlLinkExtractor(html);
    return { links, anchors };
};
