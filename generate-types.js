const base = require('./messages/en.json');
const fs = require('fs');
const path = require('path');

const types = [
  // auto-generated
  // please don't edit manually (LOL)
];

const allKeys = Object.keys(base);

types.push(`export type AllKeys = ${allKeys.map((k) => `"${k}"`).join(' | ')}`);

fs.writeFileSync(path.resolve(__dirname, 'src', 'types.ts'), types.join('\n'));
