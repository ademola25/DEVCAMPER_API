const ErrorResponse = require('../utils/errorResponse');
const Bootcamp = require('../models/Bootcamp');

//@desc Get all bootcamps
//@route Get /api/v1/bootcamps
//access public
exports.getBootcamps = async (req, res, next) => {
    try {
        const bootcamps = await Bootcamp.find();

        res.status(200).json({
            success: true,
            count: bootcamps.length,
            data: bootcamps
        });
    } catch (err) {
        next(err);
    }
}
//@desc Get single bootcamps
//@route Get /api/v1/bootcamps/:id
//access public
exports.getBootcamp = async (req, res, next) => {
    try {
        const bootcamp = await Bootcamp.findById(req.params.id);

        if (!bootcamp) {
            return next(new ErrorResponse(`Bootcamp not found  id of ${req.params.id}`, 404));
        }
        res.status(200).json({
            success: true,
            data: bootcamp
        });
    } catch (err) {
        next(err);
    }
}
//@desc create bootcamps
//@route Post /api/v1/bootcamps
//access public
exports.createBootcamp = async (req, res, next) => {
    try {
        const bootcamp = await Bootcamp.create(req.body);

        res.status(201).json({
            success: true,
            data: bootcamp
        });
    } catch (err) {
        next(err);
    }

};

//@desc update bootcamps
//@route Get /api/v1/bootcamps/:id
//access public
exports.updateBootcamp = async (req, res, next) => {
    try {
        const bootcamp = await Bootcamp.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });

        if (!bootcamp) {
            return next(new ErrorResponse(`Bootcamp not found  id of ${req.params.id}`, 404));
        }
        res.status(200).json({
            success: true,
            data: bootcamp
        });
    } catch (err) {
        next(err);

    }
};
//@desc delete bootcamps
//@route Get /api/v1/bootcamps/:id
//access public
exports.deleteBootcamp = async (req, res, next) => {
    try {
        const bootcamp = await Bootcamp.findByIdAndDelete(req.params.id);

        if (!bootcamp) {
            return next(new ErrorResponse(`Bootcamp not found  id of ${req.params.id}`, 404));
        }
        res.status(200).json({
            success: true,
            data: {}
        });
    } catch (err) {
        next(err);
    }
}