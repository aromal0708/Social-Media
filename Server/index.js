const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const morgan = require("morgan");
const dotenv = require("dotenv");
const helmet = require("helmet");

// Routes
const userRoutes = require("./Routes/Users");
const authRoutes = require("./Routes/Auth");

dotenv.config();

const app = express();

// Mongo DB cinnection
const connect = () => {
  mongoose
    .connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("DB Connected");
    })
    .catch((err) => {
      console.log(err);
    });
};

// middlewere

app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(morgan("common"));

// End-Points

app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);

app.listen(8000, () => {
  console.log("Backend is Running");
  connect();
});
