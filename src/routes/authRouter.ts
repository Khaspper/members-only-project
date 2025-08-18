import { Router } from "express";
import { postNewUser, isMember } from "../controllers/authControllers";
import passport from "../config/passport";
import "../config/passport";

const authRouter = Router();

authRouter.post("/logout", (req, res) => {
  if (!req.user) return res.sendStatus(401);
  req.logOut((err) => {
    if (err) return res.sendStatus(400);
    res.sendStatus(200);
  });
});

authRouter.get("/login", (req, res) => {
  res.render("login");
});
authRouter.post("/login", passport.authenticate("local"), (req, res) => {
  res.send(200);
});

//! THIS IS A TEST TO SEE IF WE ARE AUTHORIZED DELETE THIS LATER
authRouter.get("/test", (req, res) => {
  console.log("Inside test");
  console.log(req.user);
  console.log(req.session);
  req.user ? res.json(req.user) : res.sendStatus(401);
});
//! THIS IS A TEST TO SEE IF WE ARE AUTHORIZED DELETE THIS LATER

authRouter.get("/signup", (req, res) => {
  res.render("signup");
});
authRouter.post("/signup", ...postNewUser);

authRouter.get("/join", (req, res) => {
  res.render("join");
});

authRouter.get("/members-only", ...isMember);

export default authRouter;
