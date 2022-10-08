const Joi = require('joi');
const Seeker = require('../../../models/seeker');
const Auth = require('../../../utils/middleware/auth');

module.exports = {
    async initialLoad(req, res) {
        try {
            const result = await Seeker.initial();
            res.json(result);
        } catch (error) {
            console.log(error);
            throw error
        }
    },

    async get(req, res) {
        try {
            const result = await Seeker.list();
            res.json(result);

        } catch (error) {
            console.log(error);
            throw error;
        }
    },

    async post(req, res){
        const schema = Joi.object({
            fname: Joi.string()
                .required(),
            lname: Joi.string()
                .required(),
            mobile: Joi.string()
                .required(),
            landline: Joi.string()
                .optional(),
            email: Joi.string()
                .optional()
        });

        try {
            const data = await schema.validateAsync(req.body);
            const result = await Seeker.store(data);

            res.json(result);
        } catch (error) {
            console.log(error);
            throw error;
        }
    }, 

    async patch(req, res){
        const schema = Joi.object({
            fname: Joi.string()
                .optional(),
            lname: Joi.string()
                .optional(),
            mobile: Joi.string()
                .optional(),
            landline: Joi.string()
                .optional(),
            email: Joi.string()
                .optional()
        });

        try {
            const id = req.params.id;
            const data = await schema.validateAsync(req.body);
            const result = await Seeker.modify(data, id);
            res.json(result);
        } catch (error) {
            console.log(error)
            throw error
        }
    }
}