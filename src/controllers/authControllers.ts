import type { Request, Response } from "express";
// import { body, validationResult, ValidationChain } from "express-validator";
import { body, validationResult } from "express-validator";
import { getUserByUsername, getUserByEmail, addNewUser } from "../db/queries";

//TODO: Check if the given USER doesn't already exist
//TODO: Check if the given EMAIL doesn't already exist
//TODO: Check to see if both passwords are the same

const emptyError = "cannot be empty.";

const validateSignup = [
  body("username")
    .trim()
    .notEmpty()
    .withMessage(`Username ${emptyError}`)
    .isAlphanumeric()
    .withMessage("Username can only contain Alphanumeric characters.")
    .isLength({ min: 1, max: 55 })
    .withMessage(`Username must be between 1 and 55 characters.`)
    .custom(async (username) => {
      const user = await getUserByUsername(username);
      if (user.length > 0) {
        console.log("User already exists");
        throw new Error("User already exists");
      }
    }),
  body("email")
    .trim()
    .notEmpty()
    .withMessage(`Email ${emptyError}`)
    .isEmail()
    .withMessage("Fill email form in this format 'abc@xyz.com'")
    .custom(async (email) => {
      const user = await getUserByEmail(email);
      if (user.length > 0) {
        console.log("Email already exists");
        throw new Error("Email already exists");
      }
    }),
  body("password")
    .trim()
    .notEmpty()
    .withMessage(`Password ${emptyError}`)
    .matches(/^\S*$/)
    .withMessage("Passwords cannot contain spaces.")
    .isLength({ min: 8 })
    .withMessage("Password be at least 8 characters long."),
  body("confirmPassword").custom((value, { req }) => {
    if (value !== req.body.password) {
      console.log("Passwords do not match");
      throw new Error("Passwords do not match.");
    }
    return true;
  }),
];

export const postNewUser = [
  validateSignup,
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log(errors);
      return res.sendStatus(400);
    }
    await addNewUser(req.body);
    res.sendStatus(201);
    // res.sendStatus(400) // Means the req was bad
  },
];
