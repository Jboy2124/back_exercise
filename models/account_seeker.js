const knex = require('../utils/db/config');
const EncryptPassword = require('../utils/bcrypt/config');
const Token = require('../utils/jwt/config');
const Seeker = require('../models/seeker');

module.exports = {
    async list() {

    },

    async find(payload) {
        const { username, password } = payload;
        try {
            let result;
            const hashedPassword = await knex('login_account_seeker')
                .select({ 
                    password: 'password',
                    seeker_id: 'seeker_id'            
                })
                .where('username', username)
            
                if(hashedPassword.length > 0){
                    const isMatch = await EncryptPassword.verify(password, hashedPassword[0].password);
                    if(isMatch){
                        const data = await Seeker.find(hashedPassword[0].seeker_id);
                        return result = ({token: await Token.signin(data) });
                    }else {
                        result = ({ Error: 'Invalid Password' });
                    }
                } else {
                    result = ({ Error: "Invalid Username" });
                }
            
                return result;
        } catch (error) {
            console.log(error);
            throw error;
        }
    },

    async store(payload) {
        const { seeker_id, username, password } = payload;
        try {
            const [id] = await knex('login_account_seeker')
                .insert({
                    seeker_id: seeker_id,
                    username: username.toLowerCase(),
                    password: await EncryptPassword.hash(password)
                });

            return id;
            
        } catch (error) {
            console.log(error);
            throw error;
        }
    }, 

    async modify() {

    }
}