"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var inputParser_1 = __importDefault(require("../utils/inputParser"));
var inputFileName = 'Input5.txt';
var convertRowSeat = function (rawRowNumber) {
    var splitedRawRowNumber = rawRowNumber.split('');
    var refinedRowNumbers = splitedRawRowNumber.reduce(function (previousState, rawSeatNumber) {
        var midRangeSeatNumber = Math.round((previousState.max - previousState.min) / 2);
        if (rawSeatNumber === 'F') {
            return { min: previousState.min, max: previousState.max - midRangeSeatNumber };
        }
        return { min: previousState.min + midRangeSeatNumber, max: previousState.max };
    }, { min: 0, max: 127 });
    return refinedRowNumbers.min;
};
var convertColumnSeat = function (rawColumnNumber) {
    var splitedRawColumnNumber = rawColumnNumber.split('');
    var refinedRowNumbers = splitedRawColumnNumber.reduce(function (previousState, currentRawColumnNumber) {
        var midRangeSeatNumber = Math.round((previousState.max - previousState.min) / 2);
        if (currentRawColumnNumber === 'L') {
            return { min: previousState.min, max: previousState.max - midRangeSeatNumber };
        }
        return { min: previousState.min + midRangeSeatNumber, max: previousState.max };
    }, { min: 0, max: 7 });
    return refinedRowNumbers.min;
};
var convertSeat = function (rawSeat) { return ({
    seatRow: convertRowSeat(rawSeat.substr(0, 7)),
    seatColumn: convertColumnSeat(rawSeat.substr(7, 3)),
}); };
var getSortedSeatIds = function (batch) {
    var convertedSeatList = batch.filter(function (raw) { return !!raw; }).map(function (rawSeat) { return convertSeat(rawSeat); });
    var seatIds = convertedSeatList.map(function (seat) { return (seat.seatRow * 8 + seat.seatColumn); });
    return seatIds.sort(function (a, b) { return b - a; });
};
var firstQuestionSolver = function () {
    var batch = inputParser_1.default(inputFileName);
    var sortedSeatIds = getSortedSeatIds(batch);
    console.log('highestSeatIds', JSON.stringify(sortedSeatIds[0], null, 2));
};
// firstQuestionSolver();
// Exo 2
var getMissingSeatId = function (seatIds) {
    var missingSeatId = -1;
    for (var index = 1; index < seatIds.length - 1; index += 1) {
        var currentElement = seatIds[index];
        if ((currentElement + 1) !== seatIds[index - 1]) {
            missingSeatId = currentElement + 1;
            break;
        }
        if ((currentElement - 1) !== seatIds[index + 1]) {
            missingSeatId = currentElement - 1;
            break;
        }
    }
    return missingSeatId;
};
var secondQuestionSolver = function () {
    var batch = inputParser_1.default(inputFileName);
    var sortedSeatIds = getSortedSeatIds(batch);
    var missingSeatId = getMissingSeatId(sortedSeatIds);
    console.log('missingSeatId', JSON.stringify(missingSeatId, null, 2));
};
secondQuestionSolver();
