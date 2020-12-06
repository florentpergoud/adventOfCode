"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var inputParser_1 = __importDefault(require("../utils/inputParser"));
var inputFileName = 'Input6.txt';
var getRawDeclarationForms = function (batch) { return batch.reduce(function (rawPassports, currentLine, index) {
    var rawPassportsToModify = __spreadArrays(rawPassports);
    if (index === 0) {
        rawPassportsToModify[0] = currentLine;
        return rawPassportsToModify;
    }
    if (currentLine.length < 1) {
        rawPassportsToModify.push('');
    }
    else {
        rawPassportsToModify[rawPassportsToModify.length - 1] = "" + rawPassportsToModify[rawPassportsToModify.length - 1] + currentLine;
    }
    return rawPassportsToModify;
}, ['']); };
var removeDuplicatesFromDeclarationForms = function (rawDeclarationForms) { return rawDeclarationForms
    .map(function (rawDeclarationForm) { return rawDeclarationForm
    .split('')
    .filter(function (currentLetter, index, allLetters) { return allLetters.indexOf(currentLetter) === index; })
    .join(''); }); };
var convertToSumOfSameAnswers = function (declarationForms) { return declarationForms.reduce(function (sumOfSameAnswers, currentValue) { return sumOfSameAnswers + currentValue.length; }, 0); };
// const firstQuestionSolver = () => {
//   const batch = inputParser(inputFileName);
//   const rawDeclarationForms = getRawDeclarationForms(batch);
//   const declarationForms = removeDuplicatesFromDeclarationForms(rawDeclarationForms);
//   const sumOfSameAnswers = convertToSumOfSameAnswers(declarationForms);
//   console.log('sumOfSameAnswers', JSON.stringify(sumOfSameAnswers, null, 2));
// };
// firstQuestionSolver();
// Exo 2
var getSplitedRawDeclarationForms = function (batch) { return batch.reduce(function (rawPassports, currentLine, index) {
    var rawPassportsToModify = __spreadArrays(rawPassports);
    if (index === 0) {
        rawPassportsToModify[0] = {
            nubmerOfEntries: 1,
            entries: currentLine,
        };
        return rawPassportsToModify;
    }
    if (currentLine.length < 1) {
        rawPassportsToModify.push({
            nubmerOfEntries: 0,
            entries: '',
        });
    }
    else {
        rawPassportsToModify[rawPassportsToModify.length - 1] = {
            nubmerOfEntries: rawPassportsToModify[rawPassportsToModify.length - 1].nubmerOfEntries + 1,
            entries: "" + rawPassportsToModify[rawPassportsToModify.length - 1].entries + currentLine,
        };
    }
    return rawPassportsToModify;
}, [{
        nubmerOfEntries: 0,
        entries: '',
    }]); };
var getCommonAnswers = function (rawDeclarationForms) { return rawDeclarationForms
    .map(function (rawDeclarationForm) {
    if (rawDeclarationForm.nubmerOfEntries === 1) {
        return rawDeclarationForm.entries;
    }
    var commonLetters = '';
    var uniqueLetters = rawDeclarationForm.entries.split('')
        .filter(function (currentLetter, index, allLetters) { return allLetters.indexOf(currentLetter) === index; });
    uniqueLetters.forEach(function (letter) {
        if (rawDeclarationForm.entries.split('').filter(function (currentLetter) { return currentLetter === letter; }).length === rawDeclarationForm.nubmerOfEntries) {
            commonLetters += letter;
        }
    });
    return commonLetters;
}); };
var secondQuestionSolver = function () {
    var batch = inputParser_1.default(inputFileName);
    var rawDeclarationForms = getSplitedRawDeclarationForms(batch);
    var declarationForms = getCommonAnswers(rawDeclarationForms);
    var sumOfSameAnswers = convertToSumOfSameAnswers(declarationForms);
    console.log('sumOfSameAnswers', JSON.stringify(sumOfSameAnswers, null, 2));
};
secondQuestionSolver();
