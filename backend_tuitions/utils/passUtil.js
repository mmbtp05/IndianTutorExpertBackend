const bcrypt = require('bcrypt')

const hashPassword = async (password) => {
    const saltRound = 10
    const salt = await bcrypt.genSalt(saltRound);
    return await bcrypt.hash(password, salt);
}

const checkPassword = async (password, password_hash) => {
    return await bcrypt.compare(password, password_hash);
}

module.exports = {
    hashPassword,
    checkPassword
}