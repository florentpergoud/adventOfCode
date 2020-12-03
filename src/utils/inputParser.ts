import fs from 'fs';
import path from 'path';

export const inputParser = (inputFileName:string) => {
  const text = fs.readFileSync(path.resolve(__dirname, `../../inputs/${inputFileName}`), 'utf8').toString().split('\n');

  console.log(text[0]);
  return text;
};

export default inputParser;
