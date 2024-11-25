/* eslint-disable */
// モジュール外では import 文をしようできないため eslint-disable を適応する
const path = require('path');
const { kebabCase } = require('change-case');

module.exports = [
  {
    type: 'input',
    name: 'dir',
    message: '型定義ファイル名称を入力してください',
    validate(input) {
      // 空文字列は不可
      if (input == '') return '入力が必須です';

      // src/types プレフィックスは指定不要
      const prefixRemoved = input.replace(/^src\/types\//, '');
      if(prefixRemoved !== input)
        return `src/types は指定不要です。${prefixRemoved}と指定してください。`;

      // ケバブケースに変換する
      const dirs = input.split(path.sep);
      const lastDir = dirs.pop();
      const kebabCased = kebabCase(lastDir);
      if (kebabCased !== lastDir)
        return `ケバブケースで指定する必要があります。${kebakCased}と指定してください。`;
      return true;
    },
  },
];