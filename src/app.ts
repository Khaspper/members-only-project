import express from "express";
import dotenv from "dotenv";
import path from "node:path";
import loginRouter from "./routes/login";

const app = express();
const PORT = 3000;

app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");
dotenv.config();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", loginRouter);

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
