const mongoose = require('mongoose');

const entrepreneurSchema = new mongoose.Schema({
    firstName: {
        type: String,
        maxlength: 128,
        trim: true,
    },
    lastName: {
        type: String,
        maxlength: 128,
        trim: true,
    },
    address: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    zipCode: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    email: {
        type: String,
        match: /^\S+@\S+\.\S+$/,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
    },
    allowEmailsPromos:
        {
            type: Boolean,
            default: false
        },
    allowServiceUpdates: {
        type: Boolean,
        default: false
    },
    citizenship: {
        type: String,
        required: true
    },
    dateOfBirth: {
        type: Date,
        required: true
    },
    identification: {
        type: String,
        required: true
    },
    idNumber: {
        type: String,
        required: true
    },
    issueDate: {
        type: Date,
        required: true
    },
    expirationDate: {
        type: Date,
        required: true
    },
    differAddress: {
        type: Boolean,
        default: false
    },
    emplpoymentStatus: {
        type: String,
        required: true
    },
    fatherMaidenName: {
        type: String,
        maxlength: 128,
        trim: true,
    },
    firstSchoolAttendence: {
        type: String,
        maxlength: 128,
        trim: true,
    },

    symbol: {
        type: String,
        required: true,
        trim: true,
    },

    businessStatus: {
        type: String,
        required: true,
        trim: true,
    },

    levelType: {
        type: String,
        required: true,
        trim: true,
    },

    industry: {
        type: String,
        required: true,
        trim: true,
    },

    targetMarket: {
        type: Object,
        required: true,
        trim: true,
    },


    geographicDistribution: [],
    attachments :{
        type: String
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
},


    {
        timestamps: true,
    });

module.exports = mongoose.model('entrepreneur', entrepreneurSchema);