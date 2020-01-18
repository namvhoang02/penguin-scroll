// @package
// https://github.com/GreenGremlin/scroll-doc
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

const win = typeof window !== 'undefined' ? window : {};
const doc =
    typeof document !== 'undefined' ? document : { documentElement: {} };
// IE < 9 & Node
let scrollElem =
    typeof win.pageYOffset === 'undefined' ? doc.documentElement : null;

function detectScrollElem() {
    const startScrollTop = window.pageYOffset;
    document.documentElement.scrollTop = startScrollTop + 1;
    if (window.pageYOffset > startScrollTop) {
        document.documentElement.scrollTop = startScrollTop;
        // IE > 9 & FF (standard)
        return document.documentElement;
    }
    // Chrome (non-standard)
    return document.scrollingElement || document.body;
}

exports.default = function scrollDoc() {
    if (!scrollElem) {
        scrollElem = detectScrollElem();
    }
    return scrollElem;
}
