const express = require("express");
const cors = require("cors");
//const multer = require("multer");
const app = express();
const http = require('http');
const server = http.createServer(app);
const bodyparser = require("body-parser");
const globalErrorHandler = require("./Controller/User/errorController");
const serverless = require("serverless-http");
const cookieparser = require("cookie-parser");
require("dotenv").config();
const { dbConnect } = require("./Config/DBConnect");
const authRoute = require("./Routes/AstroRouter/authRoute");
const astroLive = require("./Routes/AstroRouter/astrologerLiveScheduleRoute");
const astroPost = require("./Routes/AstroRouter/astroPostRoute");
const myProfileRouter = require("./Routes/AstroRouter/myProfileRoute");
// const authRouter = require("./Routes/UserRouter/auth.route");
// const router = require("./Routes/UserRouter/bannerRoutes");
// const Birthrouter = require("./Routes/UserRouter/birthDetails.route");
// const Blogrouter = require("./Routes/UserRouter/blog.route");

dbConnect();

MONGO_URL =" mongodb + srv://node4:node4@cluster0.m36gc8y.mongodb.net/astrology?retryWrites=true&w=majority"
JWT_SECRET = flyweis;
// # JWT_EXPIRY = 1d
// # JWT_EXPIRY_REFRESH = 5d
// # PORT = 8001;
MAIL_EMAIL = "nash.beier27@ethereal.email"
MAIL_PASSWORD = "9CFwKjMGM8eFn2qUqr"
PORT = 3002
TWILIO_ACCOUNT_SID = AC6f69748c6ed8f7321d9a7b36636914bc
TWILIO_AUTH_TOKEN = adfe0fa6923b90d811184a2d7007831f
JWT_COOKIE_EXPIRES_IN = 90
NODE_ENV = development
// # JWT_SECRET = rubi
JWT_KEY = flyweisTechnoSecret;
APP_ID = "68f7e37642354e9ca754c8828190bad3"
APP_CERTIFICATE = c49a3aa2a81e43d58c53af39befcbc9f
AWS_ACCESS_KEY = "AKIAUGG75PO5KP4DGC5O"
AWS_SECRET_KEY = "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"

app.use(cors());
app.use(express.json());
app.use(express.static(`${__dirname}/public`));
app.use(bodyparser.urlencoded({ extended: true }));
app.use(cookieparser());
app.get("/home", (req, res) => {
  res.status(200).send({ msg: "Working App" });
});



app.all("*", (req, res, next) => {
  res.send("This Route is not registered!! ❗");
});

app.use(globalErrorHandler);

/////////////////// ASTRO ///////////////////

app.use("/astro", authRoute);
app.use("/live", astroLive);
app.use("/post", astroPost);
app.use("/", myProfileRouter);


/////////////////// USER ///////////////////

app.use("/", require("./Routes/UserRouter/router"));

// app.use("/user", authRouter);
// app.use("/user", router);
// app.use("/user", Birthrouter);
// app.use("/user", Blogrouter)

// require("./Routes/UserRouter/auth.route")(app);
require("./Routes/UserRouter/media.route")(app);
require("./Routes/UserRouter/payment.route")(app);
require("./Routes/UserRouter/productReview.route")(app);

const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Server run on ${PORT}`);
})

module.exports = { handler: serverless(app) }