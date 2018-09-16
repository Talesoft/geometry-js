"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Vector2_1 = require("./Vector2");
var Line = /** @class */ (function () {
    function Line(from, to) {
        this.from = from;
        this.to = to;
    }
    Object.defineProperty(Line.prototype, "length", {
        get: function () {
            return this.from.getDistanceTo(this.to);
        },
        enumerable: true,
        configurable: true
    });
    Line.prototype.toTuple = function () {
        return this.from.toTuple().concat(this.to.toTuple());
    };
    Line.fromTuple = function (tuple) {
        var ax = tuple[0], ay = tuple[1], bx = tuple[2], by = tuple[3];
        return new Line(new Vector2_1.default(ax, ay), new Vector2_1.default(bx, by));
    };
    return Line;
}());
exports.default = Line;
//# sourceMappingURL=Line.js.map