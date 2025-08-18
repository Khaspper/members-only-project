import type { Request, Response } from "express";
import { body, validationResult, ValidationChain } from "express-validator";

//TODO: Check if the given USER doesn't already exist
//TODO: Check if the given EMAIL doesn't already exist
//TODO: Check to see if both passwords are the same

const validateSignup = [];

export async function postNewUser(req: Request, res: Response) {
  console.log("req.body");
  console.log(req.body);
  res.sendStatus(201);
  // res.sendStatus(400) // Means the req was bad
}
