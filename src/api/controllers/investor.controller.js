const httpStatus = require('http-status');
const { omit } = require('lodash');
const Investor = require('../models/investor.model');
const { handler: errorHandler } = require('../middlewares/error');


/**
 * Get Investers
 * @public
 */
exports.list = async (req, res, next) => {
    try {
        console.log(req.body);
        const investor = await Investor.find();
        res.status(httpStatus.OK);
        return res.json({
            success: true,
            investor
        });
    }
    catch (error) {
        res.json(error);
    }
}

/**
 * Create Investers
 * @public
 */
exports.create = async (req, res, next) => {
    try {
        let allowPromos, allowDifferAdress, serviceUpdate;

        if (req.body.allowEmailsPromos) {
            allowPromos = true;
        }
        else {
            allowPromos = false;
        }
        if (req.body.allowServiceUpdates) {
            serviceUpdate = true;
        }
        else {
            serviceUpdate = false;
        }
        if(req.body.differAddress){
            allowDifferAdress = true
        }
        else{
            allowDifferAdress = false;
        }
        
        req.body.allowEmailsPromos = allowPromos;
        req.body.allowServiceUpdates = serviceUpdate;
        req.body.differAddress = allowDifferAdress;
        req.body.userId = req.user.id;  

        const obj = await(new Investor(req.body));
        const investor = await(obj.save());
         res.status(httpStatus.CREATED);
        
        return res.json({
            success: true,
            investor
        });
    }
    catch (error) {
        res.json(error);
    }
}
/**
 * Get Investor By ID
 * @public
 */
exports.get = async (req, res, next) => {
    try{
        const investor = await Investor.findById(req.params.id);
        res.status(httpStatus.OK);
        return res.json({
            success: true,
            investor
        })

    }
    catch(error){
       return res.json(error);
    }
}

/**
 * Update Investor
 * @public
 */
exports.update = async (req, res, next) => {
    try {
        const investor = await Investor.update({
            _id: req.params.id
        },req.body);
        res.status(httpStatus.OK);

        return res.json({
            success: true,
            investor    
        });


    } catch (error) {
       return res.json(error);
    }
};

/**
 * Delete user
 * @public
 */
exports.remove = async (req, res, next) => {
        try{
            const investor = await Investor.remove({
                _id: req.params.id
            });
            res.status(httpStatus.OK)
            return res.json({
                success: true,
                investor
            })
        }
        catch(error){
            return res.json(error);
        }
};
/**
 * Attachment
 * @public
 */
exports.attachment = async (req, res, next) => {
    try{
        req.body.attachments = req.body.attachedFiles;
        req.body.attachedFiles = null;
        const investor = await Investor.update({
            _id: req.params.id
        },req.body);
        res.status(httpStatus.OK)
        return res.json({
            success: true,
            investor
        })
    }
    catch(error){
        return res.json(error);
    }
};

