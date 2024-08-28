import express, { Application } from "express";
import dotenv from "dotenv";
import post from "./routes/post";
import mongoose from "mongoose";
import * as bodyParser from "body-parser";
import defaultRoutes from "./main";
dotenv.config();

const app: Application = express();
const port = process.env.PORT || 8000;

app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
// app.use(bodyParser.urlencoded());

// app.use("/", post);
defaultRoutes(app);

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
