/* eslint-disable */
// モジュール外では import 文をしようできないため eslint-disable を適応する
const path = require('path');
const { kebabCase } = require('change-case');

module.exports = [
  {
    type: 'input',
    name: 'dir',
    message: '画面全体の機能を持った React コンポーネント名称を入力してください',
    validate(input) {
      // 空文字列は不可
      if (input == '') return '入力が必須です';

      // src/features プレフィックスは指定不要
      const prefixRemoved = input.replace(/^src\/features\//, '');
      if(prefixRemoved !== input)
        return `src/features は指定不要です。${prefixRemoved}と指定してください。`;

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