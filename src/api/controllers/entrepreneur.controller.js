const httpStatus = require('http-status');
const { omit } = require('lodash');
const Entrepreneur = require('../models/entrepreneur.model');
const { handler: errorHandler } = require('../middlewares/error');


/**
 * Get Entrepreneur
 * @public
 */
exports.list = async (req, res, next) => {
    try {
        console.log(req.body);
        const entrepreneur = await Entrepreneur.find();
        res.status(httpStatus.OK);
        return res.json({
            success: true,
            entrepreneur
        });
    }
    catch (error) {
        res.json(error);
    }
}

/**
 * Create Entrepreneur
 * @public
 */
exports.create = async (req, res, next) => {
    try {
        let allowPromos, allowDifferAdress, serviceUpdate;
        console.log(req.body);

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
        if (req.body.differAddress) {

            allowDifferAdress = true;
        }
        else {
            allowDifferAdress = false;
        }

        req.body.allowEmailsPromos = allowPromos;
        req.body.allowServiceUpdates = serviceUpdate;
        req.body.differAddress = allowDifferAdress;
        req.body.userId = req.user.id;

        const obj = await (new Entrepreneur(req.body));
        const entrepreneur = await (obj.save());
        res.status(httpStatus.CREATED);

        return res.json({
            success: true,
            entrepreneur
        });
    }
    catch (error) {
        res.json(error);
    }
}
/**
 * Get Entrepreneur By ID
 * @public
 */
exports.get = async (req, res, next) => {
    try {
        const entrepreneur = await Entrepreneur.findById(req.params.id);
        res.status(httpStatus.OK);
        return res.json({
            success: true,
            entrepreneur
        })

    }
    catch (error) {
        return res.json(error);
    }
}

/**
 * Update Entrepreneur
 * @public
 */
exports.update = async (req, res, next) => {
    try {
        const entrepreneur = await Entrepreneur.update({
            _id: req.params.id
        }, req.body);
        res.status(httpStatus.OK);

        return res.json({
            success: true,
            entrepreneur
        });


    } catch (error) {
        return res.json(error);
    }
};

/**
 * Delete Entrepreneur
 * @public
 */
exports.remove = async (req, res, next) => {
    try {
        const entrepreneur = await Entrepreneur.remove({
            _id: req.params.id
        });
        res.status(httpStatus.OK)
        return res.json({
            success: true,
            entrepreneur
        })
    }
    catch (error) {
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

