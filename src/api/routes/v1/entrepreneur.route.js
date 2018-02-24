const express = require('express');
const validate = require('express-validation');
const controller = require('../../controllers/entrepreneur.controller');
const { authorize, ADMIN, LOGGED_USER,USER } = require('../../middlewares/auth');
const {
    createEntrepreneur,
    updateEntrepreneur
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
     * @api {get} v1/entrepreneurs List Entrepreneur
     * @apiDescription Get a list of Entrepreneur
     * @apiVersion 1.0.0
     * @apiName ListEntrepreneur
     * @apiGroup Entrepreneur
     * @apiPermission admin
     *
     * @apiHeader {String} Athorization  User's access token
     *
     * @apiParam {String}  id                      Entrepreneur's id
     * @apiParam {String}  firstName               Entrepreneur's firstName
     * @apiParam {String}  lastName                Entrepreneur's lastName
     * @apiParam {String}  address                 Entrepreneur's address
     * @apiParam {String}  city                    Entrepreneur's city
     * @apiParam {String}  zipCode                 Entrepreneur's zipCode
     * @apiParam {String}  phoneNumber             Entrepreneur's phoneNumber
     * @apiParam {String}  email                   Entrepreneur's email
     * @apiParam {String}  allowEmailsPromos       Entrepreneur's allowEmailsPromos
     * @apiParam {String}  allowServiceUpdates     Entrepreneur's allowServiceUpdates
     * @apiParam {String}  citizenship             Entrepreneur's citizenship
     * @apiParam {String}  dateOfBirth             Entrepreneur's dateOfBirth
     * @apiParam {String}  identification          Entrepreneur's identification
     * @apiParam {String}  idNumber                Entrepreneur's idNumber
     * @apiParam {String}  issueDate               Entrepreneur's issueDate   
     * @apiParam {String}  expirationDate          Entrepreneur's expirationDate
     * @apiParam {String}  differAddress           Entrepreneur's differAddress
     * @apiParam {String}  emplpoymentStatus       Entrepreneur's emplpoymentStatus
     * @apiParam {String}  fatherMaidenName        Entrepreneur's fatherMaidenName
     * @apiParam {String}  firstSchoolAttendence   Entrepreneur's firstSchoolAttendence
     * @apiParam {String}  symbol                  Entrepreneur's symbol companyName
     * @apiParam {String}  businessStatus          Entrepreneur's BusinessStatus
     * @apiParam {String}  leveType                Entrepreneur's LevelType
     * @apiParam {String}  Industry                Entrepreneur's Industry
     * @apiParam {String}  TargetMarket            Entrepreneur's TargetMarket
     * @apiParam {String}  GeographicDistribution  Entrepreneur's GeographicDistribution
     * 
     * @apiSuccess {Object[]} investor List of investors.
     *
     * @apiError (Unauthorized 401)  Unauthorized  Only authenticated users can access the data
     * @apiError (Forbidden 403)     Forbidden     Only admins and loggin user can access the data
     */
    .get(authorize(ADMIN,USER), controller.list)
    /**
     * @api {post} v1/entrepreneurs Create Entrepreneur
     * @apiDescription Create a new user
     * @apiVersion 1.0.0
     * @apiName CreateEntrepreneur
     * @apiGroup Entrepreneur
     * @apiPermission admin
     *
     * @apiHeader {String} Athorization  User's access token
     *
     * @apiParam {String}  id                      Entrepreneur's id
     * @apiParam {String}  firstName               Entrepreneur's firstName
     * @apiParam {String}  lastName                Entrepreneur's lastName
     * @apiParam {String}  address                 Entrepreneur's address
     * @apiParam {String}  city                    Entrepreneur's city
     * @apiParam {String}  zipCode                 Entrepreneur's zipCode
     * @apiParam {String}  phoneNumber             Entrepreneur's phoneNumber
     * @apiParam {String}  email                   Entrepreneur's email
     * @apiParam {String}  allowEmailsPromos       Entrepreneur's allowEmailsPromos
     * @apiParam {String}  allowServiceUpdates     Entrepreneur's allowServiceUpdates
     * @apiParam {String}  citizenship             Entrepreneur's citizenship
     * @apiParam {String}  dateOfBirth             Entrepreneur's dateOfBirth
     * @apiParam {String}  identification          Entrepreneur's identification
     * @apiParam {String}  idNumber                Entrepreneur's idNumber
     * @apiParam {String}  issueDate               Entrepreneur's issueDate   
     * @apiParam {String}  expirationDate          Entrepreneur's expirationDate
     * @apiParam {String}  differAddress           Entrepreneur's differAddress
     * @apiParam {String}  emplpoymentStatus       Entrepreneur's emplpoymentStatus
     * @apiParam {String}  fatherMaidenName        Entrepreneur's fatherMaidenName
     * @apiParam {String}  firstSchoolAttendence   Entrepreneur's firstSchoolAttendence
     * @apiParam {String}  symbol                  Entrepreneur's symbol companyName
     * @apiParam {String}  businessStatus          Entrepreneur's BusinessStatus
     * @apiParam {String}  leveType                Entrepreneur's LevelType
     * @apiParam {String}  Industry                Entrepreneur's Industry
     * @apiParam {String}  TargetMarket            Entrepreneur's TargetMarket
     * @apiParam {String}  GeographicDistribution  Entrepreneur's GeographicDistribution
     * @apiParam {String}  symbol                  Entrepreneur's symbol companyName
     * @apiParam {String}  businessStatus          Entrepreneur's BusinessStatus
     * @apiParam {String}  leveType                Entrepreneur's LevelType
     * @apiParam {String}  Industry                Entrepreneur's Industry
     * @apiParam {String}  TargetMarket            Entrepreneur's TargetMarket
     * @apiParam {String}  GeographicDistribution  Entrepreneur's GeographicDistribution
     *
     * @apiError (Bad Request 400)   ValidationError  Some parameters may contain invalid values
     * @apiError (Unauthorized 401)  Unauthorized     Only authenticated users can create the data
     * @apiError (Forbidden 403)     Forbidden        Only admins can create the data
     */
    .post(authorize(USER), controller.create);
router
    .route('/:id')
    /**
     * @api {get} v1/entrepreneurs/:id Get Entrepreneur
     * @apiDescription Get Entrepreneur information
     * @apiVersion 1.0.0
     * @apiName GetEntrepreneur
     * @apiGroup Entrepreneur
     * @apiPermission user
     *
     * @apiHeader {String} Athorization  User's access token
     *
     * @apiSuccess {String}  id                       Entrepreneur's id
     * @apiSuccess {String}  firstName                Entrepreneur's firstName
     * @apiSuccess {String}  lastName                 Entrepreneur's lastName
     * @apiSuccess {String}  address                  Entrepreneur's address
     * @apiSuccess {String}  city                     Entrepreneur's city
     * @apiSuccess {String}  zipCode                  Entrepreneur's zipCode
     * @apiSuccess {String}  phoneNumber              Entrepreneur's phoneNumber
     * @apiSuccess {String}  email                    Entrepreneur's email
     * @apiSuccess {String}  allowEmailsPromos        Entrepreneur's allowEmailsPromos
     * @apiSuccess {String}  allowServiceUpdates      Entrepreneur's allowServiceUpdates
     * @apiSuccess {String}  citizenship              Entrepreneur's citizenship
     * @apiSuccess {String}  dateOfBirth              Entrepreneur's dateOfBirth
     * @apiSuccess {String}  identification           Entrepreneur's identification
     * @apiSuccess {String}  idNumber                 Entrepreneur's idNumber
     * @apiSuccess {String}  issueDate                Entrepreneur's issueDate      
     * @apiSuccess {String}  expirationDate           Entrepreneur's expirationDate
     * @apiSuccess {String}  differAddress            Entrepreneur's differAddress
     * @apiSuccess {String}  emplpoymentStatus        Entrepreneur's emplpoymentStatus
     * @apiSuccess {String}  fatherMaidenName         Entrepreneur's fatherMaidenName
     * @apiSuccess {String}  firstSchoolAttendence    Entrepreneur's firstSchoolAttendence
     * @apiSuccess {String}  anticipateBalance        Entrepreneur's anticipateBalance
     * @apiSuccess {String}  symbol                   Entrepreneur's symbol companyName
     * @apiSuccess {String}  businessStatus           Entrepreneur's BusinessStatus
     * @apiSuccess {String}  leveType                 Entrepreneur's LevelType
     * @apiSuccess {String}  Industry                 Entrepreneur's Industry
     * @apiSuccess {String}  TargetMarket             Entrepreneur's TargetMarket
     * @apiSuccess {String}  GeographicDistribution   Entrepreneur's GeographicDistribution
     *
     * @apiError (Unauthorized 401) Unauthorized Only authenticated users can access the data
     * @apiError (Forbidden 403)    Forbidden    Only user with same id or admins can access the data
     * @apiError (Not Found 404)    NotFound     User does not exist
     */
    .get(authorize(LOGGED_USER), controller.get)
    /**
     * @api {patch} v1/entrepreneurs/:id Update Entrepreneur
     * @apiDescription Update some fields of a Entrepreneur document
     * @apiVersion 1.0.0
     * @apiName UpdateEntrepreneur
     * @apiGroup Entrepreneur
     * @apiPermission user
     *
     * @apiHeader {String} Athorization  User's access token
     *
     * @apiParam {String}  id                       Entrepreneur's id
     * @apiParam {String}  firstName                Entrepreneur's firstName
     * @apiParam {String}  lastName                 Entrepreneur's lastName
     * @apiParam {String}  address                  Entrepreneur's address
     * @apiParam {String}  city                     Entrepreneur's city
     * @apiParam {String}  zipCode                  Entrepreneur's zipCode
     * @apiParam {String}  phoneNumber              Entrepreneur's phoneNumber
     * @apiParam {String}  email                    Entrepreneur's email
     * @apiParam {String}  allowEmailsPromos        Entrepreneur's allowEmailsPromos
     * @apiParam {String}  allowServiceUpdates      Entrepreneur's allowServiceUpdates
     * @apiParam {String}  citizenship              Entrepreneur's citizenship
     * @apiParam {String}  dateOfBirth              Entrepreneur's dateOfBirth
     * @apiParam {String}  identification           Entrepreneur's identification
     * @apiParam {String}  idNumber                 Entrepreneur's idNumber
     * @apiParam {String}  issueDate                Entrepreneur's issueDate   
     * @apiParam {String}  expirationDate           Entrepreneur's expirationDate
     * @apiParam {String}  differAddress            Entrepreneur's differAddress
     * @apiParam {String}  emplpoymentStatus        Entrepreneur's emplpoymentStatus
     * @apiParam {String}  fatherMaidenName         Entrepreneur's fatherMaidenName
     * @apiParam {String}  firstSchoolAttendence    Entrepreneur's firstSchoolAttendence
     * @apiParam {String}  anticipateBalance        Entrepreneur's anticipateBalance
     * @apiParam {String}  symbol                   Entrepreneur's symbol companyName
     * @apiParam {String}  businessStatus           Entrepreneur's BusinessStatus
     * @apiParam {String}  leveType                 Entrepreneur's LevelType
     * @apiParam {String}  Industry                 Entrepreneur's Industry
     * @apiParam {String}  TargetMarket             Entrepreneur's TargetMarket
     * @apiParam {String}  GeographicDistribution   Entrepreneur's GeographicDistribution
     *
     * @apiSuccess {String}  id                       Entrepreneur's id
     * @apiSuccess {String}  firstName                Entrepreneur's firstName
     * @apiSuccess {String}  lastName                 Entrepreneur's lastName
     * @apiSuccess {String}  address                  Entrepreneur's address
     * @apiSuccess {String}  city                     Entrepreneur's city
     * @apiSuccess {String}  zipCode                  Entrepreneur's zipCode
     * @apiSuccess {String}  phoneNumber              Entrepreneur's phoneNumber
     * @apiSuccess {String}  email                    Entrepreneur's email
     * @apiSuccess {String}  allowEmailsPromos        Entrepreneur's allowEmailsPromos
     * @apiSuccess {String}  allowServiceUpdates      Entrepreneur's allowServiceUpdates
     * @apiSuccess {String}  citizenship              Entrepreneur's citizenship
     * @apiSuccess {String}  dateOfBirth              Entrepreneur's dateOfBirth
     * @apiSuccess {String}  identification           Entrepreneur's identification
     * @apiSuccess {String}  idNumber                 Entrepreneur's idNumber
     * @apiSuccess {String}  issueDate                Entrepreneur's issueDate   
     * @apiSuccess {String}  expirationDate           Entrepreneur's expirationDate
     * @apiSuccess {String}  differAddress            Entrepreneur's differAddress
     * @apiSuccess {String}  emplpoymentStatus        Entrepreneur's emplpoymentStatus
     * @apiSuccess {String}  fatherMaidenName         Entrepreneur's fatherMaidenName
     * @apiSuccess {String}  firstSchoolAttendence    Entrepreneur's firstSchoolAttendence
     * @apiSuccess {String}  anticipateBalance        Entrepreneur's anticipateBalance
     * @apiSuccess {String}  symbol                   Entrepreneur's symbol companyName
     * @apiSuccess {String}  businessStatus           Entrepreneur's BusinessStatus
     * @apiSuccess {String}  leveType                 Entrepreneur's LevelType
     * @apiSuccess {String}  Industry                 Entrepreneur's Industry
     * @apiSuccess {String}  TargetMarket             Entrepreneur's TargetMarket
     * @apiSuccess {String}  GeographicDistribution   Entrepreneur's GeographicDistribution
     *
     * @apiError (Bad Request 400)  ValidationError  Some parameters may contain invalid values
     * @apiError (Unauthorized 401) Unauthorized Only authenticated users can modify the data
     * @apiError (Forbidden 403)    Forbidden    Only user with same id or admins can modify the data
     * @apiError (Not Found 404)    NotFound     User does not exist
     */
    .patch(authorize(LOGGED_USER), controller.update)
    /**
     * @api {patch} v1/users/:id Deslete User
     * @apiDescription Delete a user
     * @apiVersion 1.0.0
     * @apiName DeleteUser
     * @apiGroup Entrepreneur
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
    .delete(authorize(LOGGED_USER), controller.remove);
    router.
    route('/esignature/:id')
      /**
     * @api {patch} v1/esignature/:id Update Esignature files
     * @apiDescription Add Attachent files
     * @apiVersion 1.0.0
     * @apiName esignatureFiles
     * @apiGroup Entrepreneur
     * @apiPermission user
     *
     * @apiHeader {String} Athorization  User's access token
     *
     * @apiSuccess esignature        entrepreneur's esignature
     *
     * @apiError (Unauthorized 401) Unauthorized  Only authenticated users can delete the data
     * @apiError (Forbidden 403)    Forbidden     Only user with same id or admins can delete the data
     * @apiError (Not Found 404)    NotFound      User does not exist
     */
    .patch(authorize(LOGGED_USER), upload, controller.esignature);
    router.
    route('/identity/:id')
      /**
     * @api {patch} v1/identity/:id Update Identity files
     * @apiDescription Add identity files
     * @apiVersion 1.0.0
     * @apiName entrepreneurFiles
     * @apiGroup Entrepreneur
     * @apiPermission user
     *
     * @apiHeader {String} Athorization  User's access token
     *
     * @apiSuccess identity        entrepreneur's identity
     *
     * @apiError (Unauthorized 401) Unauthorized  Only authenticated users can delete the data
     * @apiError (Forbidden 403)    Forbidden     Only user with same id or admins can delete the data
     * @apiError (Not Found 404)    NotFound      User does not exist
     */
    .patch(authorize(LOGGED_USER), upload, controller.identity);

module.exports = router;
