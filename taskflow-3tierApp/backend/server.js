const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URL)
.then(()=>console.log("MongoDB Connected"));

app.use("/api/tasks", require("./routes/taskRoutes"));

app.listen(process.env.PORT, () =>
console.log(`Backend running on ${process.env.PORT}`));