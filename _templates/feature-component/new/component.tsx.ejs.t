---
to: src/features/<%= dir %>/<%= dir %>.tsx
---
import { } from './styled';

/**
 * このコンポーネントはxxx画面全体の機能を提供する
 */
export default function <%= h.changeCase.pascalCase(h.path.basename(dir)) %>() {
  return (
    <div />
  );
}
