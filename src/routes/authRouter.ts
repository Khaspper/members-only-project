import { Router } from "express";
import {
  isAuthenticated,
  renderCreateMessageForm,
} from "../controllers/authControllers";

const authRouter = Router();

authRouter.get("/create-message", isAuthenticated, renderCreateMessageForm);

export default authRouter;
