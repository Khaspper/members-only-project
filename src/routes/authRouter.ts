import { Router } from "express";

const authRouter = Router();

authRouter.get("/", (req, res) => {
  res.render("login");
});

authRouter.get("/signup", (req, res) => {
  res.render("signup");
});

export default authRouter;
