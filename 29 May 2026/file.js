// import fs from 'fs'; // es6

const fs = require('node:fs'); // commonjs

fs.readFile('./text.txt', 'utf-8', function (err, data) {
    if (data.charAt(0) === 'L') {
        const text = data.toUpperCase();
        fs.writeFile('./text-updated.txt', text + "\n\n" + text, function (error) {
            console.log('File updated successfully');
            fs.deleteFile('./text.txt', function (err) {
                if (err) {
                    console.error('Error deleting file:', err);
                } else {
                    console.log('Original file deleted successfully');
                }
            });
        });
    }
});