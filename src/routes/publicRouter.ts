import { Router } from "express";
import {
  postNewUser,
  isMember,
  renderJoinPage,
  renderSignupPage,
  redirectAuthorizedUser,
  renderLoginPage,
  logUserOut,
} from "../controllers/publicControllers";
import passport from "../config/passport";
import "../config/passport";

const publicRouter = Router();

publicRouter.get("/", renderLoginPage);

publicRouter.post("/logout", logUserOut);
publicRouter.get("/login", renderLoginPage);
publicRouter.post(
  "/login",
  passport.authenticate("local"),
  redirectAuthorizedUser
);

publicRouter.get("/signup", renderSignupPage);
publicRouter.post("/signup", ...postNewUser);
publicRouter.get("/join", renderJoinPage);
publicRouter.get("/members-only", ...isMember);

export default publicRouter;
