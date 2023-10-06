import * as dotenv from "dotenv";
import express, { Express, Request, Response } from "express";
import { dbConnect } from "./db/dbConnect";
import cors from "cors";
import authRouter from "./router/authRouter";

dotenv.config();
const app: Express = express();
dbConnect();

//Middlewares
app.use(cors());
app.use(express.json());
app.use(
  express.urlencoded({
    extended: false,
  }),
);

// Routes
app.get("/", (req: Request, res: Response) => {
  res.send("Hello Ts world");
});

app.use("/ardisa", authRouter);

app.listen(4000, (): void => console.log("TS App listening on port 4000"));
