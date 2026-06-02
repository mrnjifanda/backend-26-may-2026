const fs = require('node:fs').promises; // commonjs

fs.readFile('./text.txt', 'utf-8')
    .then(data => {
        if (data.charAt(0) === 'L') {
            const text = data.toUpperCase();
            return fs.writeFile('./text-updated.txt', text + "\n\n" + text);
        }
    })
    .then(() => fs.unlink('./text.txt'))
    .then(() => console.log('Original file deleted successfully'))
    .catch(err => console.error('Error:', err));