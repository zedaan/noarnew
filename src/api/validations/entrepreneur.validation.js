const Joi = require('joi');
const Entrepreneur = require('../models/entrepreneur.model');

module.exports = {


    // POST /v1/entrepreneur
    createEntrepreneur: {
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
            symbol: Joi.string().max(128),
            businessStatus: Joi.string(),
            levelType: Joi.string(),
            industry: Joi.string().max(128),
            targetMarket: Joi.string(),
            geographicDistribution: Joi.string(),

        },
    },


    // PATCH /v1/entrepreneur/:id
    updateEntrepreneur: {
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
            symbol: Joi.string().max(128),
            businessStatus: Joi.string(),
            levelType: Joi.string(),
            industry: Joi.string().max(128),
            targetMarket: Joi.string(),
            geographicDistribution: Joi.string(),
        },
        params: {
            userId: Joi.string().regex(/^[a-fA-F0-9]{24}$/).required(),
        },
    },
};
