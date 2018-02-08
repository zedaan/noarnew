const Joi = require('joi');
const Investor = require('../models/investor.model');

module.exports = {


    // POST /v1/investor
    createInvestor: {
        body: {

            firstName: Joi.string().max(128).required(),
            lastName: Joi.string().max(128),
            address: Joi.string().max(128).required(),
            city: Joi.string().max(128).required(),
            zipCode: Joi.string().max(128),
            phoneNumber: Joi.string().max(128),
            email: Joi.string().email().required(),
            allowEmailsPromos: Joi.boolean(),
            allowServiceUpdates: Joi.boolean(),
            citizenship: Joi.string().max(128),
            dateOfBirth: Joi.date().max(128),
            identification: Joi.string().max(128),
            idNumber: Joi.string().max(128),
            issueDate: Joi.string().max(128),
            expirationDate: Joi.date().max(128),
            differAddress: Joi.boolean(),
            emplpoymentStatus: Joi.string().max(128),
            fatherMaidenName: Joi.string().max(128),
            firstSchoolAttendence: Joi.string().max(128),
            firstSchoolAttendence: Joi.string().max(128),
            anticipateBalance: Joi.string().max(128),
            
        },
    },


    // PATCH /v1/investor/:id
    updateInvestor: {
        body: {
            firstName: Joi.string().max(128).required(),
            lastName: Joi.string().max(128),
            address: Joi.string().max(128).required(),
            city: Joi.string().max(128).required(),
            zipCode: Joi.string().max(128),
            phoneNumber: Joi.string().max(128),
            email: Joi.string().email().required(),
            allowEmailsPromos: Joi.boolean(),
            allowServiceUpdates: Joi.boolean(),
            citizenship: Joi.string().max(128),
            dateOfBirth: Joi.date().max(128),
            identification: Joi.string().max(128),
            idNumber: Joi.string().max(128),
            issueDate: Joi.string().max(128),
            expirationDate: Joi.date().max(128),
            differAddress: Joi.boolean(),
            emplpoymentStatus: Joi.string().max(128),
            fatherMaidenName: Joi.string().max(128),
            firstSchoolAttendence: Joi.string().max(128),
            firstSchoolAttendence: Joi.string().max(128),
            anticipateBalance: Joi.string().max(128),
        },
        params: {
            userId: Joi.string().regex(/^[a-fA-F0-9]{24}$/).required(),
        },
    },
};
