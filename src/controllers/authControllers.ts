import type { Request, Response } from "express";
import { addNewMessage } from "../db/queries";

export function isAuthenticated(req: Request, res: Response, next: Function) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/login");
}

export function getMessageForm(req: Request, res: Response) {
  const now = new Date();
  const username = req.user?.username;
  const userID = req.user?.id;

  const date = now.toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  const time = now.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });

  res.render("createMessage", { date, time, username, userID });
}

export async function postMessage(req: Request, res: Response, next: Function) {
  try {
    console.log(req.body);
    await addNewMessage(
      Number(req.user?.id),
      req.body.title,
      req.body.message,
      req.body.date
    );
    res.sendStatus(201).redirect("/");
  } catch (error) {
    res.sendStatus(401);
    next(error);
  }
}
