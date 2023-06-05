const astro_Model = require("../../Model/AstroModel/astroStatus");
const astro = require("../../Model/AstroModel/astroStatus");

exports.AddStatus = async (req, res) => {
    try {
        const astroData = await astro.findById({ _id: req.params.id });
        if (!astroData) {
            return res.status(401).json({
                message: "No UserId is Wrong",
            });
        } else {
            console.log(astroData);
            const data = {
                astroId: req.params.id,
                name: astroData.firstName + " " + astroData.lastName,
                time: req.body.time,
                status: req.body.status,
            };
            const Data = await astro_Model.create(data);
            res.status(200).json({
                message: "History is Added",
                details: Data,
            });
        }
    } catch (err) {
        console.log(err);
        res.status(400).json({
            message: err.message,
        });
    }
};

exports.getStatus = async (req, res) => {
    try {
        const data = await astro_Model.find({ astroId: req.params.id });
        if (!data) {
            return res.status(401).json({
                message: "No Call- history for this user  ",
            });
        } else {
            res.status(200).json({
                details: data,
            });
        }
    } catch (err) {
        res.status(400).json({
            message: err.message,
        });
    }
};

exports.updateStatus = async (req, res) => {
    try {
        const data = await astro_Model.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (!data) {
            return res.status(401).json({
                message: "No Data Found",
            });
        } else {
            res.status(200).json({
                message: "Data Updated",
                details: data,
            });
        }
    } catch (err) {
        res.status(400).json({
            message: err.message,
        });
    }
};
exports.getAllStatus = async (req, res) => {
    try {
        const data = await astro_Model
            .find({ status: true })
            .populate("astroId")
            .sort({ updatedAt: -1 })
            .lean();
        if (!data || data.length === 0) {
            return res.status(404).json({
                message: "No Astrologer is Online",
            });
        } else {
            res.status(200).json({
                details: data,
            });
        }
    } catch (err) {
        console.log(err);
        res.status(400).json({
            message: err.message,
        });
    }
};
