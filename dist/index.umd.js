(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(factory((global.lib = {})));
}(this, (function (exports) { 'use strict';

var BarChart = /** @class */ (function () {
    function BarChart() {
        this.option = {
            a: 'test'
        };
    }
    BarChart.prototype.init = function (config) {
        console.warn(config);
    };
    return BarChart;
}());

var LineChart = /** @class */ (function () {
    function LineChart() {
        this.option = {
            a: 'test'
        };
    }
    LineChart.prototype.init = function (config) {
        console.warn(config);
    };
    return LineChart;
}());

var PieChart = /** @class */ (function () {
    function PieChart() {
        this.option = {
            a: 'test'
        };
    }
    PieChart.prototype.init = function (config) {
        console.warn(config);
    };
    return PieChart;
}());

var TreeChart = /** @class */ (function () {
    function TreeChart() {
        this.option = {
            a: 'test'
        };
    }
    TreeChart.prototype.init = function (config) {
        console.warn(config);
    };
    return TreeChart;
}());

exports.BarChart = BarChart;
exports.LineChart = LineChart;
exports.PieChart = PieChart;
exports.TreeChart = TreeChart;

Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=index.umd.js.map
