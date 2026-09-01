const express = require("express");
const cors = require("cors");
require("dotenv").config();
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const serviceRoutes=require("./routes/serviceRoute")


const app = express();
// connect database
connectDB();

app.use(cors());
app.use(express.json());
// auth  routes
app.use("/api/auth", authRoutes);
//service routes
app.use("/api/services",serviceRoutes)

app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});