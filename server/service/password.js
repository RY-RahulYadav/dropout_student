const passwordGenerator = require('password-generator');

function generatePassword() {
    return passwordGenerator(12, true); // Generate a 12-character password without special characters
}

module.exports = generatePassword;

