const base = require('./messages/en.json');
const fs = require('fs');
const path = require('path');

const types = [
  // auto-generated
  // please don't edit manually (LOL)
];

const mappings = [];
Object.keys(base).map((key) => {
  const message = base[key];
  const occurrences = message.match(/{{[a-zA-Z0-9]+}}/g);
  const count = occurrences ? occurrences.length : 0;
  if (count === 0) {
    mappings.push([key, 'never']);
  } else {
    // remove {{ }}
    const varNames = occurrences
      .map((v) => v.slice(2, -2))
      .map((n) => `${n}: string`)
      .join(',');
    mappings.push([key, `{ ${varNames} }`]);
  }
});

types.push(`export interface KeyMap { 
  ${mappings.map((tuple) => `${tuple[0]}: ${tuple[1]}`).join(',\n')}
 }`);

fs.writeFileSync(path.resolve(__dirname, 'src', 'types.ts'), types.join('\n'));
