const Support = require("../../Model/UserModel/Support");
const catchAsync = require("../../utils/catchAsync");
const AppError = require("../../utils/AppError");

exports.create = catchAsync(async (req, res) => {
    try {
        const { Phone, Email, Whatsapp, zipcode } = req.body;
        if (!(Phone || Email || Whatsapp || zipcode)) {
            return res
                .status(400)
                .json({ message: "phone,email,whatsapp,zipcode are required" });
        }
        const sup = await Support.create({ Phone, Email, Whatsapp, zipcode });

        res.status(201).json({
            status: "success",
            data: sup,
        });
    } catch (err) {
        console.log(err);
        res.status(400).json({ message: err.message });
    }
});

exports.update = catchAsync(async (req, res) => {
    try {
        const { Phone, Email, Whatsapp, zipcode } = req.body;
        const sup = await Support.findByIdAndUpdate(
            req.params.id,
            { Phone, Email, Whatsapp, zipcode },
            { new: true }
        );

        res.status(200).json({
            status: "success",
            data: sup[sup.length - 1],
        });
    } catch (err) {
        console.log(err.message);
        res.status(400).json({ error: err.message });
    }
});

exports.read = catchAsync(async (req, res) => {
    try {
        const sup = await Support.find().lean();
        if (Support.length === 0) {
            return res.status(204).json({
                message: "not found",
            });
        }

        res.status(200).json({
            status: "success",
            data: sup[0],
        });
    } catch (err) {
        console.log(err.message);
        res.status(400).json({ message: err.message });
    }
});

exports.delete = catchAsync(async (req, res) => {
    try {
        await Support.findByIdAndDelete(req.params.id);

        res.status(204).json({
            status: "success",
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "intrnal server error " + err.message,
        });
    }
});
