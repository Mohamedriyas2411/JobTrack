const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/jobcards", require("./routes/jobCardRoutes"));
app.use("/api/technician", require("./routes/technicianRoutes"));
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/jobcards", require("./routes/jobCardRoutes"));
app.use("/api/technician", require("./routes/technicianRoutes"));
app.use("/api/cashier", require("./routes/cashierRoutes"));
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/jobcards", require("./routes/jobCardRoutes"));
app.use("/api/technician", require("./routes/technicianRoutes"));
app.use("/api/cashier", require("./routes/cashierRoutes"));
app.use("/api/manager", require("./routes/managerRoutes"));
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/jobcards", require("./routes/jobCardRoutes"));
app.use("/api/technician", require("./routes/technicianRoutes"));
app.use("/api/cashier", require("./routes/cashierRoutes"));
app.use("/api/manager", require("./routes/managerRoutes"));


module.exports = app;
