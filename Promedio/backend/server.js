//console.log("Hello, Promedio")

const express = require("express");
const bodyParser = require("body-parser");

const dotenv = require("dotenv").config(); // .env file
const server_port = process.env.SERVER_PORT || 5000;
const { connectDatabase } = require("./config/database");
const authRoute = require("./routes/authRoute");
const updateRoute = require("./routes/updateRoute");
const courseRoute = require("./routes/courseRoute");
const semesterRoute = require("./routes/semesterRoute")
connectDatabase();

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const cors = require("cors");
const corsOptions = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
  SERVER_PORT: 4000,
};

app.use(cors(corsOptions));
// app.use("/api/sheets", require("./routes/sheetRoutes"));
app.use("/api", authRoute);
app.use("/api", updateRoute);
app.use("/api", courseRoute);
app.use("/api", semesterRoute);
const { logErrors, errorHandler, clientErrorHandler } = require("./middleware/errorMiddleware");
app.use(logErrors);
app.use(clientErrorHandler);
app.use(errorHandler);
app.listen(server_port, () => {
  console.log(`Server started on port ${server_port}`);
});
