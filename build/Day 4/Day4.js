"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var inputParser_1 = __importDefault(require("../utils/inputParser"));
var inputFileName = 'Input4.txt';
// const inputFileName = 'Test4.txt';
var convertArrayToObject = function (array, key) {
    var initialValue = {};
    return array.reduce(function (obj, item) {
        var _a;
        return (__assign(__assign({}, obj), (_a = {}, _a[item[key]] = item, _a)));
    }, initialValue);
};
var buildPartialPassportFromBatchLine = function (batchLine) {
    var newKeyValues = batchLine.split(' ');
    var keyAndValueArray = newKeyValues.map(function (keyValue) {
        var splited = keyValue.split(':');
        return {
            passPortFiledName: splited[0],
            value: splited[1],
        };
    });
    return convertArrayToObject(keyAndValueArray, 'passPortFiledName');
};
var extractPassportsFromBatch = function (batch) {
    var passports = [];
    var currentPassportIndex = 0;
    batch.forEach(function (line) {
        if (line.length < 1) {
            currentPassportIndex += 1;
            return;
        }
        var formatedPassport = buildPartialPassportFromBatchLine(line);
        if (passports[currentPassportIndex]) {
            passports[currentPassportIndex] = __assign(__assign({}, passports[currentPassportIndex]), formatedPassport);
        }
        else {
            // @ts-ignore
            passports[currentPassportIndex] = formatedPassport;
        }
    });
    return passports;
};
var filterNotValidatedPassports = function (passports) { return passports.filter(function (passport) {
    if (Object.keys(passport).length < 7) {
        return false;
    }
    // @ts-ignore
    var doesPassportsContainsCID = Object.keys(passport).includes('cid');
    if (Object.keys(passport).length === 7 && doesPassportsContainsCID) {
        return false;
    }
    return false;
}); };
var validPassportsInBatch = function (batch) {
    var passports = extractPassportsFromBatch(batch);
    return filterNotValidatedPassports(passports);
};
var firstQuestionSolver = function () {
    var batch = inputParser_1.default(inputFileName);
    var validPassports = validPassportsInBatch(batch);
    console.log("We encoutered " + validPassports.length + " valid passports");
};
// firstQuestionSolver();
// Exo 2
var isHeightValid = function (heightAndUnit) {
    if (heightAndUnit.includes('cm')) {
        var heightString = heightAndUnit.slice(0, heightAndUnit.length - 2);
        if (heightString.length < 2) {
            return false;
        }
        var height = parseInt(heightString, 10);
        if (height < 150 || height > 193) {
            return false;
        }
        return true;
    }
    if (heightAndUnit.includes('in')) {
        var heightString = heightAndUnit.slice(0, heightAndUnit.length - 2);
        if (heightString.length < 2) {
            return false;
        }
        var height = parseInt(heightString, 10);
        if (height < 59 || height > 76) {
            return false;
        }
        return true;
    }
    return false;
};
var filterNotValidatedWithMoreRulesPassports = function (passports) { return passports.filter(function (passport) {
    if (Object.keys(passport).length < 7) {
        return false;
    }
    // @ts-ignore
    var doesPassportsContainsCID = Object.keys(passport).includes('cid');
    if (Object.keys(passport).length === 7 && doesPassportsContainsCID) {
        return false;
    }
    if (parseInt(passport.byr.value, 10) > 2002 || parseInt(passport.byr.value, 10) < 1920) {
        return false;
    }
    if (parseInt(passport.iyr.value, 10) > 2020 || parseInt(passport.iyr.value, 10) < 2010) {
        return false;
    }
    if (parseInt(passport.eyr.value, 10) > 2030 || parseInt(passport.eyr.value, 10) < 2020) {
        return false;
    }
    if (!isHeightValid(passport.hgt.value)) {
        return false;
    }
    if (!passport.hcl.value.match(/^#([0-9a-f]{6}|[0-9a-f]{3})$/)) {
        return false;
    }
    if (!['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'].includes(passport.ecl.value)) {
        return false;
    }
    if (!passport.pid.value.match(/^[0-9]{9}$/)) {
        return false;
    }
    return true;
}); };
var extractValidPassportsFromBatch = function (batch) {
    var passports = extractPassportsFromBatch(batch);
    return filterNotValidatedWithMoreRulesPassports(passports);
};
var secondQuestionSolver = function () {
    var batch = inputParser_1.default(inputFileName);
    var validPassports = extractValidPassportsFromBatch(batch);
    console.log("We encoutered " + validPassports.length + " valid passports");
};
secondQuestionSolver();
