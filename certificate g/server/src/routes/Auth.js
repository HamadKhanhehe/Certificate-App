import express from "express";
import { allUser, givePermission, register, resetPassword,  } from "../controllers/auth.js";
import { login } from "../controllers/auth.js";


const router = express.Router();


router.post("/register", register);

router.post("/login", login );

router.post("/fpswd",resetPassword );

router.get("/users",allUser )

router.post("/update-permission", givePermission)

export default router;