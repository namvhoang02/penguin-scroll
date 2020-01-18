// @package
// https://github.com/olahol/scrollparent.js
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

const regex = /(auto|scroll)/;

function parents(node, ps) {
    if (node.parentNode === null) {
        return ps;
    }

    return parents(node.parentNode, ps.concat([node]));
}

function style(node, prop) {
    return getComputedStyle(node, null).getPropertyValue(prop);
}

function overflow(node) {
    return (
        style(node, 'overflow') +
        style(node, 'overflow-y') +
        style(node, 'overflow-x')
    );
}

function scroll(node) {
    return regex.test(overflow(node));
}

exports.default = function scrollParent(node) {
    if (!(node instanceof HTMLElement || node instanceof SVGElement)) {
        return;
    }

    const ps = parents(node.parentNode, []);

    for (let i = 0; i < ps.length; i += 1) {
        if (scroll(ps[i])) {
            return ps[i];
        }
    }

    return document.scrollingElement || document.documentElement;
}
