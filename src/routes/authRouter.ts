import { Router } from "express";
import { isAuthenticated } from "../controllers/authControllers";

const authRouter = Router();

authRouter.get("/", isAuthenticated, (req, res) => {
  res.send("You are AUTHORIZED");
});

export default authRouter;
