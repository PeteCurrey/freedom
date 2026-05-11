const fs = require('fs');
const path = require('path');

const filePath = path.resolve(__dirname, 'src/components/admin/ProductForm.tsx');
let content = fs.readFileSync(filePath, 'utf8');

// Remove non-ASCII characters
content = content.replace(/[^\x00-\x7F]/g, "");

// Ensure consistent line endings
content = content.replace(/\r\n/g, '\n');

fs.writeFileSync(filePath, content, 'utf8');
console.log('Sanitized ProductForm.tsx');
