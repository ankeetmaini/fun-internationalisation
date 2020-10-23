const base = require('./messages/en.json');
const fs = require('fs');
const path = require('path');

const types = [
  // auto-generated
  // please don't edit manually (LOL)
];

const allKeys = Object.keys(base);

types.push(
  `export type AllKeys = ${allKeys.map((k) => `"${k}"`).join(' | ')};`,
);

types.push(`export type GetTranslationTextType<T> = `);
Object.keys(base).map((key) => {
  const message = base[key];
  const occurrences = message.match(/{{[a-zA-Z0-9]+}}/g);
  const count = occurrences ? occurrences.length : 0;
  if (count === 0) {
    types.push(`T extends "${key}" ? never :`);
  } else {
    // remove {{ }}
    const varNames = occurrences
      .map((v) => v.slice(2, -2))
      .map((n) => `${n}: string`)
      .join(',');
    types.push(`T extends "${key}" ? { ${varNames} } :`);
  }
});
types.push(`never;`);

fs.writeFileSync(path.resolve(__dirname, 'src', 'types.ts'), types.join('\n'));
