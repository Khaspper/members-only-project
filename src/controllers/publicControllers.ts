import type { Request, Response } from "express";
import { body, query, validationResult } from "express-validator";
import {
  getUserByUsername,
  getUserByEmail,
  addNewUser,
  getAllMessagesWithUsers,
  updateUsersMembership,
} from "../db/queries";

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
      if (user) {
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
      if (user) {
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

const validateSecretCode = [
  query("secretCode")
    .trim()
    .notEmpty()
    .withMessage("The secret is not empty :3")
    .custom((value, { req }) => {
      if (value !== process.env.SECRET_CODE) {
        throw new Error("You got the secret WRONG!!!! :33333 LOL");
      }
      return true;
    }),
];

export const postNewUser = [
  validateSignup,
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // TODO: Rerender the same page but with the errors
      console.log("PostNewUser");
      console.log(errors);
      return res.sendStatus(400);
    }
    await addNewUser(req.body);
    res.redirect("/login");
    // res.sendStatus(400) // Means the req was bad
  },
];

export const isMember = [
  validateSecretCode,
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // TODO: Rerender the same page but with the errors
      console.log("isMember");
      console.log(errors);
      return res.sendStatus(400);
    }
    // Uncomment this when you get sessions implemented
    await updateUsersMembership(Number(req.user?.id));
    res.render("members");
  },
];

export function renderJoinPage(req: Request, res: Response) {
  res.render("join");
}

export function renderSignupPage(req: Request, res: Response) {
  res.render("signup");
}

export function renderLoginPage(req: Request, res: Response) {
  if (req.isAuthenticated()) {
    return res.redirect(`/${req.user.id}/create-message`);
  }
  res.render("login");
}

export async function getHomePage(req: Request, res: Response) {
  const messages = await getAllMessagesWithUsers();
  console.log(messages);
  res.render("index", { messages: messages });
}

export function redirectAuthorizedUser(req: Request, res: Response) {
  try {
    //! Change this line
    res.redirect(`/${req.user?.id}/create-message`);
    //! Change this line
  } catch (error) {
    console.log("Cannot log in");
    console.log(error);
  }
}

export function logUserOut(req: Request, res: Response) {
  if (!req.user) return res.sendStatus(401);
  req.logOut((err) => {
    if (err) return res.sendStatus(400);
    res.sendStatus(200);
  });
}
