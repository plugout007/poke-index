---
to: src/components/<%= dir %>/<%= dir %>.tsx
---
import { } from './styled';

type Props = {};

/**
 * このコンポーネントはxxx画面全体の機能を提供する
 */
export default function <%= h.changeCase.pascalCase(h.path.basename(dir)) %>({ }: Props) {
  return (
    <div />
  );
}
