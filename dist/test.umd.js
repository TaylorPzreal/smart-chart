(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(factory((global.SC = {})));
}(this, (function (exports) { 'use strict';

var a = 'test';
function consoleFn() {
    console.log(a);
}

exports.consoleFn = consoleFn;

Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=test.umd.js.map
