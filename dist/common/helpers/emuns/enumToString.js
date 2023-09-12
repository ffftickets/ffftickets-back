"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EnumToString = void 0;
const EnumToString = (_enum) => Object.keys(_enum)
    .map((key) => _enum[key])
    .filter((value) => typeof value === 'string');
exports.EnumToString = EnumToString;
//# sourceMappingURL=enumToString.js.map