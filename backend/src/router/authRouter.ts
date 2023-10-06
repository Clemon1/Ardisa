import { Router } from "express";
import {
  adminRegister,
  adminLogin,
  clientLogin,
  clientRegister,
} from "../controller/authController";

const router = Router();

router.post("/admin/register", adminRegister);
router.post("/admin/login", adminLogin);
router.post("/client/register", clientRegister);
router.post("/client/login", clientLogin);

export default router;
