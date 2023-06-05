const { MhahPanchang } = require("mhah-panchang");

exports.getPanchang = async (req, res) => {
    try {
        var obj = new MhahPanchang();

        // Based current date and time : calculate(date)
        var mhahObj = obj.calculate(new Date());
        console.log(mhahObj);

        let data = obj.calendar(new Date(), 12.972, 77.594);

        const requiredFields = [
            "Raasi",
            "Ritu",
            "Masa",
            "MoonMasa",
            "Paksha",
            "Tithi",
            "Nakshatra",
            "Yoga",
            "Karna",
        ];

        const result = {};
        for (let field of requiredFields) {
            result[field] = data[field].name_en_IN || data[field].name_en_UK;
        }

        console.log(result);

        res.status(200).json({
            data: result,
            message: "Panchang fetched",
        });
    } catch (err) {
        console.log(err);
        res.status(400).json({
            message: err.message,
        });
    }
};
