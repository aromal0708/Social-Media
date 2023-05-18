import Express from "express";
import cors from "cors";
import mongoose from "mongoose";
import morgan from "morgan";
import dotenv from "dotenv";

const app = Express();
dotenv.config();
app.use(cors());
app.use(morgan("common"));

const connect = () => {
  mongoose
    .connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("DB Connected");
    }).catch(err => console.log(err))
};
app.use("/", (req, res) => {
  res.send("Hello this is home page");
});

app.listen(8000, () => {
  connect()
  console.log("Backend Connected");
});
