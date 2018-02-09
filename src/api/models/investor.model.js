const mongoose = require('mongoose');

/**
 * User Schema
 * @private
 */
const investorSchema = new mongoose.Schema({
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
      
    },
  allowServiceUpdates: {
    type: Boolean,
    
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
  anticipateBalance: {
    type: String,
    maxlength: 128,
    trim: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  attachments:{
    type:String
  }
}, {
    timestamps: true,
  });

module.exports = mongoose.model('Investor', investorSchema);
