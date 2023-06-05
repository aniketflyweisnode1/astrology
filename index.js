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

const Port = process.env.PORT||8080;
app.listen(Port, () => {
  console.log(`Server run on ${Port}`);
})

module.exports = { handler: serverless(app) }