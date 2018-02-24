const express = require('express');
const validate = require('express-validation');
const controller = require('../../controllers/investor.controller');
const { authorize, ADMIN, LOGGED_USER,USER } = require('../../middlewares/auth');
const {
    createInvestor,
    updateInvestor
} = require('../../validations/user.validation');

const router = express.Router();

const multer = require('multer');


// to store file names
let file_name_array = [];

const storage = multer.diskStorage({

  destination: function (req, file, cb) {
    cb(null, 'uploads/attachment/')
  },

  filename: function (req, file, cb) {

    if (req.body.attachedFiles == null) {
      file_name_array = [];
    }

    let ext = file.originalname.split(".");
    ext = ext[ext.length - 1];

    const filename = Date.now() + `.${ext}`;

    file_name_array.push(filename);

    req.body.attachedFiles = file_name_array;
    cb(null, filename);

  },


})

const upload = multer({ storage: storage }).array('attachments');






router
  .route('/')
  /**
   * @api {get} v1/investors List Investors
   * @apiDescription Get a list of Investors
   * @apiVersion 1.0.0
   * @apiName ListInvestors
   * @apiGroup Investor
   * @apiPermission admin
   *
   * @apiHeader {String} Athorization  User's access token
   *
   * @apiParam {String}  id                       Investor's id
   * @apiParam {String}  firstName                Investor's firstName
   * @apiParam {String}  lastName                Investor's lastName
   * @apiParam {String}  address                  Investor's address
   * @apiParam {String}  city                     Investor's city
   * @apiParam {String}  zipCode                  Investor's zipCode
   * @apiParam {String}  phoneNumber              Investor's phoneNumber
   * @apiParam {String}  email                    Investor's email
   * @apiParam {String}  allowEmailsPromos        Investor's allowEmailsPromos
   * @apiParam {String}  allowServiceUpdates      Investor's allowServiceUpdates
   * @apiParam {String}  citizenship              Investor's citizenship
   * @apiParam {String}  dateOfBirth              Investor's dateOfBirth
   * @apiParam {String}  identification           Investor's identification
   * @apiParam {String}  idNumber                 Investor's idNumber
   * @apiParam {String}  issueDate                 Investor's issueDate   
   * @apiParam {String}  expirationDate           Investor's expirationDate
   * @apiParam {String}  differAddress            Investor's differAddress
   * @apiParam {String}  emplpoymentStatus        Investor's emplpoymentStatus
   * @apiParam {String}  fatherMaidenName         Investor's fatherMaidenName
   * @apiParam {String}  firstSchoolAttendence    Investor's firstSchoolAttendence
   * @apiParam {String}  anticipateBalance        Investor's anticipateBalance
   * 
   * @apiSuccess {Object[]} investor List of investors.
   *
   * @apiError (Unauthorized 401)  Unauthorized  Only authenticated users can access the data
   * @apiError (Forbidden 403)     Forbidden     Only admins and loggin user can access the data
   */
.get(authorize(ADMIN, LOGGED_USER), controller.list)
  /**
   * @api {post} v1/investors Create Invester
   * @apiDescription Create a new user
   * @apiVersion 1.0.0
   * @apiName CreateInvestor
   * @apiGroup Investor
   * @apiPermission admin
   *
   * @apiHeader {String} Athorization  User's access token
   *
   * @apiParam {String}  id                       Investor's id
   * @apiParam {String}  firstName                Investor's firstName
   * @apiParam {String}  lastName                Investor's lastName
   * @apiParam {String}  address                  Investor's address
   * @apiParam {String}  city                     Investor's city
   * @apiParam {String}  zipCode                  Investor's zipCode
   * @apiParam {String}  phoneNumber              Investor's phoneNumber
   * @apiParam {String}  email                    Investor's email
   * @apiParam {String}  allowEmailsPromos        Investor's allowEmailsPromos
   * @apiParam {String}  allowServiceUpdates      Investor's allowServiceUpdates
   * @apiParam {String}  citizenship              Investor's citizenship
   * @apiParam {String}  dateOfBirth              Investor's dateOfBirth
   * @apiParam {String}  identification           Investor's identification
   * @apiParam {String}  idNumber                 Investor's idNumber
   * @apiParam {String}  issueDate                 Investor's issueDate    
   * @apiParam {String}  expirationDate           Investor's expirationDate
   * @apiParam {String}  differAddress            Investor's differAddress
   * @apiParam {String}  emplpoymentStatus        Investor's emplpoymentStatus
   * @apiParam {String}  fatherMaidenName         Investor's fatherMaidenName
   * @apiParam {String}  firstSchoolAttendence    Investor's firstSchoolAttendence
   * @apiParam {String}  anticipateBalance        Investor's anticipateBalance
   *
   * @apiSuccess (Created 201) {String}  id                       Investor's id
   * @apiSuccess (Created 201) {String}  firstName                Investor's firstName
   * @apiSuccess (Created 201) {String}  lastName                Investor's lastName
   * @apiSuccess (Created 201) {String}  address                  Investor's address
   * @apiSuccess (Created 201) {String}  city                     Investor's city
   * @apiSuccess (Created 201) {String}  zipCode                  Investor's zipCode
   * @apiSuccess (Created 201) {String}  phoneNumber              Investor's phoneNumber
   * @apiSuccess (Created 201) {String}  email                    Investor's email
   * @apiSuccess (Created 201) {String}  allowEmailsPromos        Investor's allowEmailsPromos
   * @apiSuccess (Created 201) {String}  allowServiceUpdates      Investor's allowServiceUpdates
   * @apiSuccess (Created 201) {String}  citizenship              Investor's citizenship
   * @apiSuccess (Created 201) {String}  dateOfBirth              Investor's dateOfBirth
   * @apiSuccess (Created 201) {String}  identification           Investor's identification
   * @apiSuccess (Created 201) {String}  idNumber                 Investor's idNumber
   * @apiSuccess (Created 201) {String}  issueDate                Investor's issueDate   
   * @apiSuccess (Created 201) {String}  expirationDate           Investor's expirationDate
   * @apiSuccess (Created 201) {String}  differAddress            Investor's differAddress
   * @apiSuccess (Created 201) {String}  emplpoymentStatus        Investor's emplpoymentStatus
   * @apiSuccess (Created 201) {String}  fatherMaidenName         Investor's fatherMaidenName
   * @apiSuccess (Created 201) {String}  firstSchoolAttendence    Investor's firstSchoolAttendence
   * @apiSuccess (Created 201) {String}  anticipateBalance        Investor's anticipateBalance
   *
   * @apiError (Bad Request 400)   ValidationError  Some parameters may contain invalid values
   * @apiError (Unauthorized 401)  Unauthorized     Only authenticated users can create the data
   * @apiError (Forbidden 403)     Forbidden        Only admins can create the data
   */
  .post(authorize(ADMIN,LOGGED_USER,USER), controller.create);
router
  .route('/:id')
  /**
   * @api {get} v1/investors/:id Get Investor
   * @apiDescription Get investor information
   * @apiVersion 1.0.0
   * @apiName GetInvestor
   * @apiGroup Investor
   * @apiPermission user
   *
   * @apiHeader {String} Athorization  User's access token
   *
   * @apiSuccess {String}  id                       Investor's id
   * @apiSuccess {String}  firstName                Investor's firstName
   * @apiSuccess {String}  lastName                Investor's lastName
   * @apiSuccess {String}  address                  Investor's address
   * @apiSuccess {String}  city                     Investor's city
   * @apiSuccess {String}  zipCode                  Investor's zipCode
   * @apiSuccess {String}  phoneNumber              Investor's phoneNumber
   * @apiSuccess {String}  email                    Investor's email
   * @apiSuccess {String}  allowEmailsPromos        Investor's allowEmailsPromos
   * @apiSuccess {String}  allowServiceUpdates      Investor's allowServiceUpdates
   * @apiSuccess {String}  citizenship              Investor's citizenship
   * @apiSuccess {String}  dateOfBirth              Investor's dateOfBirth
   * @apiSuccess {String}  identification           Investor's identification
   * @apiSuccess {String}  idNumber                 Investor's idNumber
   * @apiSuccess {String}  issueDate                Investor's issueDate      
   * @apiSuccess {String}  expirationDate           Investor's expirationDate
   * @apiSuccess {String}  differAddress            Investor's differAddress
   * @apiSuccess {String}  emplpoymentStatus        Investor's emplpoymentStatus
   * @apiSuccess {String}  fatherMaidenName         Investor's fatherMaidenName
   * @apiSuccess {String}  firstSchoolAttendence    Investor's firstSchoolAttendence
   * @apiSuccess {String}  anticipateBalance        Investor's anticipateBalance
   *
   * @apiError (Unauthorized 401) Unauthorized Only authenticated users can access the data
   * @apiError (Forbidden 403)    Forbidden    Only user with same id or admins can access the data
   * @apiError (Not Found 404)    NotFound     User does not exist
   */
  .get(authorize(LOGGED_USER,USER), controller.get)
  /**
   * @api {patch} v1/investors/:id Update Investor
   * @apiDescription Update some fields of a Investor document
   * @apiVersion 1.0.0
   * @apiName UpdateInvestor
   * @apiGroup Investor
   * @apiPermission user
   *
   * @apiHeader {String} Athorization  User's access token
   *
   * @apiParam {String}  id                       Investor's id
   * @apiParam {String}  firstName                Investor's firstName
   * @apiParam {String}  lastName                Investor's lastName
   * @apiParam {String}  address                  Investor's address
   * @apiParam {String}  city                     Investor's city
   * @apiParam {String}  zipCode                  Investor's zipCode
   * @apiParam {String}  phoneNumber              Investor's phoneNumber
   * @apiParam {String}  email                    Investor's email
   * @apiParam {String}  allowEmailsPromos        Investor's allowEmailsPromos
   * @apiParam {String}  allowServiceUpdates      Investor's allowServiceUpdates
   * @apiParam {String}  citizenship              Investor's citizenship
   * @apiParam {String}  dateOfBirth              Investor's dateOfBirth
   * @apiParam {String}  identification           Investor's identification
   * @apiParam {String}  idNumber                 Investor's idNumber
   * @apiParam {String}  issueDate                Investor's issueDate   
   * @apiParam {String}  expirationDate           Investor's expirationDate
   * @apiParam {String}  differAddress            Investor's differAddress
   * @apiParam {String}  emplpoymentStatus        Investor's emplpoymentStatus
   * @apiParam {String}  fatherMaidenName         Investor's fatherMaidenName
   * @apiParam {String}  firstSchoolAttendence    Investor's firstSchoolAttendence
   * @apiParam {String}  anticipateBalance        Investor's anticipateBalance
   *
   * @apiSuccess {String}  id                       Investor's id
   * @apiSuccess {String}  firstName                Investor's firstName
   * @apiSuccess {String}  lastName                 Investor's lastName
   * @apiSuccess {String}  address                  Investor's address
   * @apiSuccess {String}  city                     Investor's city
   * @apiSuccess {String}  zipCode                  Investor's zipCode
   * @apiSuccess {String}  phoneNumber              Investor's phoneNumber
   * @apiSuccess {String}  email                    Investor's email
   * @apiSuccess {String}  allowEmailsPromos        Investor's allowEmailsPromos
   * @apiSuccess {String}  allowServiceUpdates      Investor's allowServiceUpdates
   * @apiSuccess {String}  citizenship              Investor's citizenship
   * @apiSuccess {String}  dateOfBirth              Investor's dateOfBirth
   * @apiSuccess {String}  identification           Investor's identification
   * @apiSuccess {String}  idNumber                 Investor's idNumber
   * @apiSuccess {String}  issueDate                Investor's issueDate   
   * @apiSuccess {String}  expirationDate           Investor's expirationDate
   * @apiSuccess {String}  differAddress            Investor's differAddress
   * @apiSuccess {String}  emplpoymentStatus        Investor's emplpoymentStatus
   * @apiSuccess {String}  fatherMaidenName         Investor's fatherMaidenName
   * @apiSuccess {String}  firstSchoolAttendence    Investor's firstSchoolAttendence
   * @apiSuccess {String}  anticipateBalance        Investor's anticipateBalance
   *
   * @apiError (Bad Request 400)  ValidationError  Some parameters may contain invalid values
   * @apiError (Unauthorized 401) Unauthorized Only authenticated users can modify the data
   * @apiError (Forbidden 403)    Forbidden    Only user with same id or admins can modify the data
   * @apiError (Not Found 404)    NotFound     User does not exist
   */
  .patch(authorize(LOGGED_USER,USER), controller.update)
  /**
   * @api {patch} v1/users/:id Delete User
   * @apiDescription Delete a user
   * @apiVersion 1.0.0
   * @apiName DeleteUser
   * @apiGroup Investor
   * @apiPermission user
   *
   * @apiHeader {String} Athorization  User's access token
   *
   * @apiSuccess (No Content 204)  Successfully deleted
   *
   * @apiError (Unauthorized 401) Unauthorized  Only authenticated users can delete the data
   * @apiError (Forbidden 403)    Forbidden     Only user with same id or admins can delete the data
   * @apiError (Not Found 404)    NotFound      User does not exist
   */
  .delete(authorize(LOGGED_USER,USER), controller.remove);
  router.
  route('/attachment/:id')
    /**
   * @api {patch} v1/attachment/:id Update Attachent files
   * @apiDescription Add Attachent files
   * @apiVersion 1.0.0
   * @apiName attachentFiles
   * @apiGroup Investor
   * @apiPermission user
   *
   * @apiHeader {String} Athorization  User's access token
   *
   * @apiSuccess attachment        Investor's attachment
   *
   * @apiError (Unauthorized 401) Unauthorized  Only authenticated users can delete the data
   * @apiError (Forbidden 403)    Forbidden     Only user with same id or admins can delete the data
   * @apiError (Not Found 404)    NotFound      User does not exist
   */
  .patch(authorize(LOGGED_USER,USER), upload, controller.attachment);

module.exports = router;
