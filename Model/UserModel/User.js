const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            required: false,
        },
        lastName: {
            type: String,
            required: false,
        },
        created: {
            type: String,
            default: new Date().toISOString(),
        },
        password: {
            type: String,
            required: false,
        },
        confirmpassword: {
            type: String,
            required: false,
        },
        address: {
            type: String,
            default: "",
            required: false,
        },
        email: {
            type: String,
            default: "",
            required: false,
        },
        mobile: {
            type: String,
            default: "",
            required: false,
        },
        profileImage: {
            type: String,
            default: "",
            required: false,
        },
        role: {
            type: String,
            default: "User",
        },
        country: {
            type: String,
            default: "",
            required: false,
        },
        state: {
            type: String,
            default: "",
            required: false,
        },
        district: {
            type: String,
            default: "",
            required: false,
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
        birthDate: {
            type: String,
            default: "",
            required: false,
        },
        birthTime: {
            type: String,
            default: "",
            required: false,
        },
        birthCity: {
            type: String,
            default: "",
            required: false,
        },
        birthCountry: {
            type: String,
            default: "",
            required: false,
        },
        birthState: {
            type: String,
            default: "",
            required: false,
        },
        birthDistrict: {
            type: String,
            default: "",
            required: false,
        },
        birthPincode: {
            type: String,
            default: "",
            required: false,
        },
        birthLatitude: {
            type: String,
            default: "",
            required: false,
        },
        birthLongitude: {
            type: String,
            default: "",
            required: false,
        },
        birthTimezone: {
            type: String,
            default: "",
            required: false,
        },

        referCode: { type: String, unique: false },

        referStatus: {
            type: String,
            default: "unused",
            enum: ["used", "unused"],
        },

        ActiveNotification: { type: Boolean, default: false },

        following: {
            type: [mongoose.Schema.Types.ObjectId],
            ref: "astrologer",
        },
    },

    { timestamps: false }
);

userSchema.pre("save", function (next) {
    const refer = generateOTP() + this.first_Name;
    this.ReferCode = refer;
    console.log("generated referal Code!");
    next();
});

// PASSWORD - HASH
userSchema.pre("save", async function (next) {
    const salt = await bcrypt.genSaltSync(10);
    this.password = await bcrypt.hashSync(this.password, salt);
    next();
});

//MATCH HASH PASSWORD
userSchema.methods.isPasswordValid = async function (enteredPassword) {
    try {
        return await bcrypt.compare(enteredPassword, this.password);
    } catch (error) {
        throw error;
    }
};

userSchema.methods.createPasswordResetToken = async function () {
    const resettoken = crypto.randomBytes(32).toString("hex");
    this.passwordResetToken = crypto
        .createHash("sha256")
        .update(resettoken)
        .digest("hex");
    this.passwordResetExpires = Date.now() + 30 * 60 * 1000; // 10 minutes
    return resettoken;
};

module.exports = mongoose.model("User", userSchema);
