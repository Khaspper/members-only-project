import { Router } from "express";
import { postNewUser, isMember } from "../controllers/authControllers";

const authRouter = Router();

authRouter.get("/", (req, res) => {
  res.render("login");
});

authRouter.get("/signup", (req, res) => {
  res.render("signup");
});

authRouter.get("/join", (req, res) => {
  res.render("join");
});

authRouter.get("/members-only", ...isMember);

authRouter.post("/", ...postNewUser);

export default authRouter;
