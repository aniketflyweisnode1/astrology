const Media = require('../../Model/UserModel/media.model');

exports.create = async (req, res) => {
    try {
        const { gallery, trainingVideos } = req.body;
        const userId = req.user._id;
        const result = await Media.create({ userId, gallery, trainingVideos });
        res.status(201).json(result);
    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: err.message
        });
    }
}

exports.update = async (req, res) => {
    try {
        const { addGallery, addTrainingVideos, removeGallery, removeTrainingVideos } = req.body;
        if (addGallery || addTrainingVideos) {
            const result = await Media.findOneAndUpdate({ userId: req.params.id },
                {
                    $addToSet: {
                        gallery: addGallery,
                        trainingVideos: addTrainingVideos
                    }
                }
            );
            console.log(result);

        }
        if (removeGallery || removeTrainingVideos) {
            const result1 = await Media.findOneAndUpdate({ userId: req.params.id },
                {
                    $pull: {
                        gallery: { $in: removeGallery },
                        trainingVideos: { $in: removeTrainingVideos }
                    }
                }, { new: true });
            console.log(result1);

        }
        res.status(200).json({ message: "updated successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: err.message });
    }
};

exports.get = async (req, res) => {
    try {
        let queryObj = {};
        if (req.query.gallery) {
            queryObj.gallery = req.query.gallery;
        }
        if (req.query.trainingVideos) {
            queryObj.trainingVideos = req.query.trainingVideos;
        };
        if (req.query.userId) {
            queryObj.userId = req.query.userId;
        };

        const result = await Media.find(queryObj);
        if (result.length === 0) {
            return res.status(204).json({ message: "not found" });
        }
        res.status(200).json({ data: result });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: err.message
        });
    }
};

exports.getById = async (req, res) => {
    try {
        const result = await Media.findById(req.params.id);
        if (result.length === 0) {
            return res.status(204).json({ message: "not found" });
        }
        res.status(200).json({ data: result });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: err.message });
    }
};

