import type { Request, Response } from "express";

export function isAuthenticated(req: Request, res: Response, next: Function) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/login");
}

export function renderCreateMessageForm(req: Request, res: Response) {
  const now = new Date();

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
  // res.render("createMessage", { date, time });

  // If you just want JSON:
  res.json({ date, time, now });
}
