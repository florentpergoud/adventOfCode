"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var inputParser_1 = __importDefault(require("../utils/inputParser"));
var inputFileName = 'Input3-1.txt';
var treeSymbol = '#';
var isThereTreeAtPosition = function (vertical, horizontal, map) {
    var modulatedHorizontal = horizontal % map[0].length;
    return map[vertical].charAt(modulatedHorizontal) === treeSymbol;
};
var numberOfThreeForSlope = function (verticalMovment, horizontalMovment) {
    var map = inputParser_1.default(inputFileName);
    var numberOfTreeEncoutered = 0;
    var horizontalIndex = 0;
    for (var verticalIndex = 0; verticalIndex < map.length; verticalIndex += verticalMovment) {
        if (isThereTreeAtPosition(verticalIndex, horizontalIndex, map)) {
            numberOfTreeEncoutered += 1;
        }
        horizontalIndex += horizontalMovment;
    }
    return numberOfTreeEncoutered;
};
var firstQuestionSolver = function () {
    var numberOfTreeEncoutered = numberOfThreeForSlope(1, 3);
    console.log("We encoutered " + numberOfTreeEncoutered + " trees");
};
var secondQuestionSolver = function () {
    var multiplicatedNumber = numberOfThreeForSlope(1, 1) * numberOfThreeForSlope(1, 3) * numberOfThreeForSlope(1, 5) * numberOfThreeForSlope(1, 7) * numberOfThreeForSlope(2, 1);
    console.log("Multiplicated number for is " + multiplicatedNumber);
};
firstQuestionSolver();
secondQuestionSolver();
