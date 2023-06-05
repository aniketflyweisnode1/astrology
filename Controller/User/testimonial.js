const Testimonial = require("../../Model/UserModel/testmonial");
const User = require("../../Model/UserModel/User");
const Astrologer = require("../../Model/AstroModel/astrologer");
// Get all testimonials
exports.getTestimonials = async (req, res) => {
    try {
        const testimonials = await Testimonial.find();
        res.status(200).json({ data: testimonials });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server Error" });
    }
};

// Create a new testimonial
exports.createTestimonial = async (req, res) => {
    req.body.userId = req.user;
    req.body.userName = req.user.firstName + " " + req.user.lastName;
    req.body.image = req.user.profileImage;
    const testimonial = new Testimonial(req.body);
    try {
        const newTestimonial = await testimonial.save();
        res.status(201).json({
            message: "testimonial submitted successfully",
            data: newTestimonial,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server Error" });
    }
};

// Get a single testimonial by ID
exports.getTestimonialById = async (req, res) => {
    try {
        const testimonial = await Testimonial.findById(req.params.id);
        if (!testimonial) {
            return res.status(404).json({ message: "Testimonial not found" });
        }
        res.status(200).json({ data: testimonial });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server Error" });
    }
};

// Update a testimonial by ID
exports.updateTestimonial = async (req, res) => {
    try {
        const testimonial = await Testimonial.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (!testimonial) {
            return res.status(404).json({ message: "Testimonial not found" });
        }

        const updatedTestimonial = await testimonial.save();
        res.status(200).json({ message: "updated", data: updatedTestimonial });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server Error" });
    }
};

// Delete a testimonial by ID
exports.deleteTestimonial = async (req, res) => {
    try {
        const testimonial = await Testimonial.findByIdAndDelete(req.params.id);
        if (!testimonial) {
            return res.status(404).json({ message: "Testimonial not found" });
        }

        res.status(200).json({ message: "Testimonial deleted" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server Error" });
    }
};
