import { postNewUser } from "../controllers/authControllers";
import { Router } from "express";

const authRouter = Router();

authRouter.get("/", (req, res) => {
  res.render("login");
});

authRouter.get("/signup", (req, res) => {
  res.render("signup");
});

authRouter.post("/", postNewUser);

export default authRouter;
