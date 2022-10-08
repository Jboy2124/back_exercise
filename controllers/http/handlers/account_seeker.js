const Joi = require('joi');
const Account = require('../../../models/account_seeker');

module.exports = {

    async login(req, res) {
        const schema = Joi.object({
            username: Joi.string()
                .required(),
            password: Joi.string()
                .required()
        });

        try {
            const data = await schema.validateAsync(req.body);
            const result = await Account.find(data);

            res.json({ payload: result });
           
        } catch (error) {
            console.log(error);
            throw error;
        }
    },

    async post(req, res) {
        const schema = Joi.object({
            seeker_id: Joi.number()
                .required(),
            username: Joi.string()
                .required(),
            password: Joi.string()
                .required()
        });

        try {
            const data = await schema.validateAsync(req.body);
            const result = await Account.store(data);
            res.json(result);
        } catch (error) {
            console.log(error);
            throw error;
        }
    },
}