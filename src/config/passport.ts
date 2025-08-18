import passport from "passport";
import { Strategy } from "passport-local";
import { getUserById, getUserByUsername } from "../db/queries";
import bcrypt from "bcryptjs";

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id: number, done) => {
  try {
    const user = await getUserById(id);
    if (!user) throw new Error("User not found!");
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});

export default passport.use(
  new Strategy(async (username: string, password: string, done: Function) => {
    try {
      const user = await getUserByUsername(username);
      if (!user) throw new Error("User not found");
      if (!(await bcrypt.compare(password, user.hash)))
        throw new Error("Incorrect password");
      done(null, user);
    } catch (error) {
      done(error, false);
    }
  })
);
