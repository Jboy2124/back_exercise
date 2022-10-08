const knex = require('../utils/db/config');

module.exports = {
    async initial() {
        return 'Hello from seeker';
    },

    async list() {
        try {
            const result = knex('seeker')
                .select('*');
            return result;
        } catch (error) {
            console.log(error)
            throw error;
        }
    },

    async find(id) {
        try {
            const result = knex('seeker')
                .select({
                    fname: 'fname',
                    lname: 'lname'
                })
                .where('id', id)
            return result;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }, 
    
    async store(payload) {
        const { fname, lname, mobile, landline, email } = payload;
        try {
            const [id] = await knex('seeker')
                .insert({
                    fname: fname,
                    lname: lname,
                    mobile_no: mobile,
                    landline: landline,
                    email: email.toLowerCase()
                });
            return id;
        } catch (error) {
            console.log(error)
            throw error
        }
    }, 

    async modify(payload, id) {
        const { fname, lname, mobile, landline, email } = payload;
        try {
            const result = await knex('seeker')
                .update({
                    fname: fname,
                    lname: lname, 
                    mobile_no: mobile, 
                    landline: landline,
                    email: email
                })
                .where('id', id);
            return result;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
}