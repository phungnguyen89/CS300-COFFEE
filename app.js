require("dotenv").config();
const createError = require("http-errors");
const express = require("express");
const path = require("path");
const helmet = require("helmet");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const passport = require("passport");
const logger = require("morgan");
const cors = require("cors");

//connect to database
require(".//src/configs/configs").connectDatabase();
// require(".//src/test/mongoose");
const Handlebars = require("handlebars");
const expressHandlebars = require("express-handlebars");
const { allowInsecurePrototypeAccess } = require("@handlebars/allow-prototype-access");
const multer = require("multer");
const upload = multer();

const helper = require("./src/helper");
const app = express();

appConfig = () => {
  app.use(helmet());
  // view engine setup
  app.set("views", path.join(__dirname, "src/views"));
  app.set("view engine", "html");
  app.engine(
    "html",
    expressHandlebars({
      extname: ".html",
      handlebars: allowInsecurePrototypeAccess(Handlebars),
      defaultLayout: "main",
      layoutsDir: path.join(__dirname, "/src/views/layouts"),
      partialsDir: path.join(__dirname, "/src/views/partials"),
      helpers: {
        pag: helper.pag,
        page: helper.page,
        shop: helper.shop,
        money: helper.moneyFormat,
        //list of function helper
      },
    })
  );

  // use middleware
  app.use(logger("dev"));
  app.use(cors());

  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));
  //app.use(upload.none());
  app.use(cookieParser(process.env.TOKEN_SECRECT));
  //app.use(cookieParser(process.env.TOKEN_SECRECT));
  app.use(express.static(path.join(__dirname, "public")));

  //app.use(passport.initialize());
  //app.use(passport.session());

  //port
  const port = process.env.PORT || 3000;
  app.listen(port, () => console.log("Server started listening on PORT " + port));
};

appRouting = () => {
  // routing

  const home = require("./src/routes/home");
  const user = require("./src/routes/user");
  const productInfo = require("./src/routes/productInfo");
  const cart = require("./src/routes/cart");
  const api = require("./src/api/route");
  const admin = require("./src/routes/admin");

  app.use("/admin", admin);
  app.use("/api", api);
  app.use("/cart", cart);
  app.use("/user", user);

  app.use("/", home);

  //use auth middleware

  app.use("/cart", cart);
  const auth = require("./src/middlewares/auth");
  //app.use("/cart", auth.auth, cart);
  //use authorize middleware

  //app.use("/product", auth.authorization, product);
};

handleError = () => {
  //404 not found
  app.use(function (req, res, next) {
    next(createError(404));
  });

  // error handler
  app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render("error", { title: "ERROR", layout: false });
  });
};

appConfig();
appRouting();
handleError();

module.exports = app;
