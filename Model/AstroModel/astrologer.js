const mongoose = require("mongoose");

const AstrologerSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            default: "",
            required: false,
        },
        lastName: {
            type: String,
            default: "",
            required: false,
        },
        created: {
            type: String,
            default: new Date().toISOString(),
        },
        password: {
            type: String,
            required: false,
            default: "",
        },
        confirmpassword: {
            type: String,
            required: false,
            default: "",
        },
        address: {
            type: String,
            required: false,
            default: "",
        },
        email: {
            type: String,
            required: false,
            default: "",
        },
        mobile: {
            type: String,
            required: false,
            default: "",
        },
        role: {
            type: String,
            default: "astrologer",
        },
        country: {
            type: String,
            required: false,
            default: "",
        },
        gender: {
            type: String,

            default: "male",
        },
        collegeOrInstitute: {
            type: String,
            default: "",
        },
        passingYear: {
            type: String,
            default: "",
        },
        highestQualification: {
            type: String,
            required: false,
            default: "",
        },
        govDocument: {
            type: String,
            default: "",
        },

        state: {
            type: String,
            required: false,
            default: "",
        },
        district: {
            type: String,
            required: false,
            default: "",
        },
        referCode: {
            type: String,
            default: "",
        },
        pincode: {
            type: String,
            default: "",
        },
        otp: {
            type: String,
            default: "",
        },
        language: {
            type: [String],
            default: [],
        },

        desc: {
            type: String,
            default: "",
        },
        rashi: {
            type: String,
            default: "",
        },
        skills: {
            type: [String],
            default: [],
        },
        specification: {
            type: [String],
            default: [],
        },
        averageRating: {
            type: Number,
            default: 0,
        },
        review: {
            type: [mongoose.SchemaTypes.ObjectId],
            ref: "Review",
            default: [],
        },
        fees: {
            type: String,
            default: "",
        },
        discountedFee: {
            type: Number,
            default: 0,
        },
        gallery: {
            type: [String],
            default: [],
        },
        aboutMe: {
            type: String,
            default: "",
        },
        astrologerFee: {
            type: mongoose.SchemaTypes.ObjectId,
            ref: "AstrologerFees",
        },
        profileImage: {
            type: Object,
            default: { url: "", key: "" },
        },
        totalConsultation: {
            type: Number,
            default: 0,
        },
        fixedSessionDiscountStatus: {
            type: Boolean,
            default: false,
        },
        discountPercentage: {
            type: Number,
            default: 0,
        },

        experience: {
            type: String,
            require: false,
            default: "",
        },
        video: {
            type: [String],
            default: [],
        },
        followers: {
            type: [mongoose.SchemaTypes.ObjectId],
            ref: "User",
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("astrologer", AstrologerSchema);
