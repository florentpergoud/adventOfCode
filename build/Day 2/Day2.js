"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var inputParser_1 = __importDefault(require("../utils/inputParser"));
var inputFileName = 'Input2-1.txt';
var firstQuestionSolver = function () {
    var isPasswordValid = function (minCount, maxCount, symbolToCount, password) {
        var symbolOccurence = password.split(symbolToCount).length - 1;
        return symbolOccurence >= minCount && symbolOccurence <= maxCount;
    };
    var passwordList = inputParser_1.default(inputFileName);
    var validPasswords = passwordList.filter(function (passwordAndRule) {
        if (!passwordAndRule) {
            return false;
        }
        var splitedPassword = passwordAndRule.split(' ');
        var minMaxCount = splitedPassword[0].split('-');
        var minCount = parseInt(minMaxCount[0], 10);
        var maxCount = parseInt(minMaxCount[1], 10);
        var symbolToCount = splitedPassword[1].charAt(0);
        var password = splitedPassword[2];
        return isPasswordValid(minCount, maxCount, symbolToCount, password);
    });
    console.log(validPasswords.length);
};
var secondQuestionSolver = function () {
    var isPasswordValid = function (firstPosition, secondPosition, symbolToCheck, password) {
        var isLetterInFirstSlot = password.charAt(firstPosition - 1) === symbolToCheck;
        var isLetterInSecondSlot = password.charAt(secondPosition - 1) === symbolToCheck;
        if (isLetterInFirstSlot) {
            return !isLetterInSecondSlot;
        }
        return isLetterInSecondSlot;
    };
    var passwordList = inputParser_1.default(inputFileName);
    var validPasswords = passwordList.filter(function (passwordAndRule) {
        if (!passwordAndRule) {
            return false;
        }
        var splitedPassword = passwordAndRule.split(' ');
        var positions = splitedPassword[0].split('-');
        var firstPosition = parseInt(positions[0], 10);
        var secondPosition = parseInt(positions[1], 10);
        var symbolToCheck = splitedPassword[1].charAt(0);
        var password = splitedPassword[2];
        return isPasswordValid(firstPosition, secondPosition, symbolToCheck, password);
    });
    console.log(validPasswords.length);
};
// firstQuestionSolver();
secondQuestionSolver();
