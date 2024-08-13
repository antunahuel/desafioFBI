import { Router } from "express";
import controlls from "../controllers/views.controll.js";
import { verifyToken } from '../middleware/verifyToken.js';

const router = Router();

router.get("/", (req,res)=>{
    res.render("home")
});

router.get("/login", (req,res)=>{
    res.render("login")
});


router.get("/perfil", verifyToken, controlls.perfil);


router.get("/topSecret", verifyToken, controlls.getTopSecret);

router.post("/", controlls.loginUser);


export default router;