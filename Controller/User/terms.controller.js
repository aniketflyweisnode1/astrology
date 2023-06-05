const Terms = require("../../Model/UserModel/terms.model");
const { buildResponse } = require("../../utils/respone");
exports.create = async (req, res) => {
    try {
        if (!req.body.terms) {
            return res.status(400).send("please specify terms");
        }
        const result = await Terms.create({ terms: req.body.terms });
        res.status(200).send({ msg: "created", data: result });
    } catch (err) {
        console.log(err.message);
        res.status(500).send({ msg: "internal server error ", error: err.message });
    }
};

exports.update = async (req, res) => {
    try {
        const data = await Terms.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        });
        if (!data) {
            return res.status(400).send({ msg: "not found" });
        }
        res.status(200).send({ msg: "updated", data: data });
    } catch (err) {
        console.log(err.message);
        res.status(500).send({ msg: "internal server error ", error: err.message });
    }
};

exports.get = async (req, res) => {
    try {
        const data = await Terms.find();
        if (!data || data.length === 0) {
            return buildResponse(res, 200, "terms not found");
            // return res.status(200).send({ msg: "not found" });
        }
        res.status(200).send({ data: data });
    } catch (err) {
        console.log(err.message);
        res.status(500).send({ msg: "internal server error ", error: err.message });
    }
};

exports.getId = async (req, res) => {
    try {
        const data = await Terms.findById(req.params.id);
        if (!data || data.length === 0) {
            return res.status(200).send({ msg: "not found" });
        }
        res.status(200).send({ data: data });
    } catch (err) {
        console.log(err.message);
        res.status(500).send({ msg: "internal server error ", error: err.message });
    }
};

exports.delete = async (req, res) => {
    try {
        const data = await Terms.findByIdAndDelete(req.params.id);
        if (!data) {
            return res.status(400).send({ msg: "not found" });
        }
        res.status(200).send({ msg: "deleted", data: data });
    } catch (err) {
        console.log(err.message);
        res.status(500).send({ msg: "internal server error", error: err.message });
    }
};
