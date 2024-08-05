
import express, { Express, Request, Response , Application } from 'express';
import dotenv from 'dotenv';
import path from "path";
import defaultRoute from "./routes/defaultRoute"
import adminRoute from "./routes/adminRoute"
import mongoose from "mongoose"
import * as bodyParser from 'body-parser';
dotenv.config();

const app: Application = express();
const port: string | number = process.env.PORT || 8000;

app.set( "views", path.join( __dirname, "views" ) );
app.set( "view engine", "ejs" );


app.use(express.urlencoded({extended: true}))
app.use(bodyParser.json());
app.use('/', defaultRoute)
app.use('/admin', adminRoute)


app.listen(port, () => {
    console.log(`Server is Fire at http://localhost:${port}`);
  });
const uri: string = process.env.URI!
mongoose.connect(uri).then(() => {
      console.log('connected to database');
      
}).catch((error: any) => {
      console.log(error); 
      
  })