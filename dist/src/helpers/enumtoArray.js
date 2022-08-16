"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.enumToArray = void 0;
const isStringNumber = (value) => isNaN(Number(value)) === false;
/**
 *
 * @param givenEnum
 * @returns {String}[]
 * * removes index (numbers)
 */
const enumToArray = (givenEnum) => {
    return Object.keys(givenEnum).filter(isStringNumber).map((key) => givenEnum[key]);
};
exports.enumToArray = enumToArray;
//# sourceMappingURL=enumtoArray.js.map