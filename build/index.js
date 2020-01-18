"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

const scroll = require('./scroll').default;
const scrollDoc = require('./scroll-doc').default;

exports.scrollTo = function scrollTo(value, element = scrollDoc()) {
    return new Promise((resolve, reject) => {
        const { scrollTop } = element;

        const limit = value > scrollTop ? value - scrollTop : scrollTop - value;

        scroll.top(element, value, { duration: limit < 100 ? 50 : 300 }, error => {
            if (
                error &&
                error.message !== 'Element already at target scroll position'
            ) {
                return reject(error);
            }

            return resolve();
        });
    });
}
