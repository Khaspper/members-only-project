import type { Request, Response } from "express";

export function isAuthenticated(req: Request, res: Response, next: Function) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/login");
}

export function getMessageForm(req: Request, res: Response) {
  const now = new Date();
  const username = req.user?.username;

  const date = now.toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  const time = now.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });

  // Example for rendering:
  res.render("createMessage", { date, time, username });

  // If you just want JSON:
  // res.json({ date, time });
}

export function postMessage(req: Request, res: Response) {}
