import express, { Express, Request, Response, Application } from "express";
import dotenv from "dotenv";
import path from "path";
import defaultRoute from "./routes/default";
import authorRoute from "./routes/author";
import adminRoute from "./routes/admin";
import mongoose from "mongoose";
import * as bodyParser from "body-parser";
dotenv.config();

const app: Application = express();
const port = process.env.PORT || 8000;

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
//im not sure about this line
// app.use(bodyParser.urlencoded());

app.use("/", defaultRoute);
app.use("/dashboard", authorRoute);
app.use("/admin", adminRoute);

const uri = process.env.URI!;
mongoose
  .connect(uri)
  .then(() => {
    app.listen(port, () => {
      console.log(`Server is Fire at http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
