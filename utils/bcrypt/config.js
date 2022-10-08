const bcrypt = require('bcrypt');

module.exports = {
    async hash(password) {
        try {
            const salt = await bcrypt.genSalt(10);
            const encrypterPassword = await bcrypt.hash(password, salt);

            return encrypterPassword;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }, 

    async verify(password, hash){
        try {
            const isMatch = await bcrypt.compare(password, hash);
            return isMatch;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
}