const { application } = require("express");
const media = require("../../Controller/User/media.controller");
const { isAuthenticated } = require("../../Controller/User/auth.controller");

module.exports = (app) => {
    // app.post("/api/v1/admin/media", media.create);
    app.put("/api/v1/admin/media/:id", media.update);
    app.get("/api/v1/admin/media/:id", media.getById);
    app.get("/api/v1/admin/media", media.get);

    //users
    app.post("/api/v1/media", [isAuthenticated], media.create);
    app.put("/api/v1/media/:id", [isAuthenticated], media.update);
    app.get("/api/v1/media/:id", media.getById);
    app.get("/api/v1/media", media.get);
};
