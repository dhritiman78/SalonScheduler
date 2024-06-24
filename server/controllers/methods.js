const bcrypt = require('bcryptjs');
// Making capital
function capitalize(word) {
    if (!word) return word; // Check if the word is empty or null
    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
}
function hashPassword(normalPassword) {
    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(normalPassword, salt);
    return hash;
}
function comparePasswords(writtenPassword,hashedPassword) {
    if (bcrypt.compareSync(writtenPassword, hashedPassword)) {
        return true
    } else {
        return false
    }
}
module.exports = { capitalize , hashPassword, comparePasswords }