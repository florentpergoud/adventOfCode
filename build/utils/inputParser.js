"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.inputParser = void 0;
var fs_1 = __importDefault(require("fs"));
var path_1 = __importDefault(require("path"));
var inputParser = function (inputFileName) { return fs_1.default.readFileSync(path_1.default.resolve(__dirname, "../../inputs/" + inputFileName), 'utf8').toString().split('\n'); };
exports.inputParser = inputParser;
exports.default = exports.inputParser;
