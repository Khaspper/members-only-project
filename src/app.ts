import express from "express";
import dotenv from "dotenv";
import path from "node:path";
import authRouter from "./routes/authRouter";

const app = express();
const PORT = 3000;

app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");
dotenv.config();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//! REMEMBER THIS IS THE LOGIN ROUTE!!!! THERE IS NO /login
app.use("/", authRouter);
//! REMEMBER THIS IS THE LOGIN ROUTE!!!! THERE IS NO /login

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
