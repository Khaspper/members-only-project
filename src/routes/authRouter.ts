import { Router } from "express";
import {
  isAuthenticated,
  getMessageForm,
  postMessage,
} from "../controllers/authControllers";

const authRouter = Router();

authRouter.get("/create-message", isAuthenticated, getMessageForm);
authRouter.post("/homepage", isAuthenticated, postMessage);

export default authRouter;
