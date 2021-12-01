import fs from 'fs';
import path from 'path';

export const inputParser = (inputFileName:string) => fs.readFileSync(path.resolve(__dirname, `../../inputs/${inputFileName}`), 'utf8').toString().split('\n');

export default inputParser;
