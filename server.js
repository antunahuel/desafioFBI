import express from 'express';
import { create } from 'express-handlebars';
import jwt from 'jsonwebtoken';
import fileUpload from 'express-fileupload';

import * as path from 'path';
import { fileURLToPath } from 'url';
const __dirname = path.dirname(fileURLToPath(import.meta.url));

import viewRoutes from './routes/views.routes.js'

const app = express();

const hbs = create({
    partialsDir: [
        path.resolve(__dirname, "./views/partials")
    ],
});

app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");
app.set("views", path.resolve(__dirname, "./views"));

app.listen(3000, ()=>{
    console.log("Server listen port http://localhost:3000")
})

//MIDDLEWARES
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(fileUpload());

//vistas

app.use("/", viewRoutes);


//endpoint

app.use("/api/v1/fbi/users", viewRoutes);

