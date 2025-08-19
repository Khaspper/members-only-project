import express from "express";
import dotenv from "dotenv";
import path from "node:path";
import publicRouter from "./routes/publicRouter";
import session from "express-session";
import connectPgSimple from "connect-pg-simple";
import pool from "./db/pool";
import passport from "passport";
import authRouter from "./routes/authRouter";

const app = express();
const PORT = 3000;

app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");
dotenv.config();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    store: new (connectPgSimple(session))({
      pool: pool,
      tableName: "session",
    }),
    secret: String(process.env.SECRET_CODE),
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24, // Equals 1 day (1 second * 60 = 1 minute * 60 = 1 hour * 24 = 1 day)
    },
  })
);
app.use(passport.session());

app.use("/", publicRouter);
app.use("/:id", authRouter);

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
