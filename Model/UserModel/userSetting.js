const mongoose = require("mongoose");

const UserSettingSchema = new mongoose.Schema(
    {
        UserId: { type: String },

        ActiveNotification: { type: Boolean },
    },
    { timestamps: true }
);

module.exports = mongoose.model("UserSetting", UserSettingSchema);
