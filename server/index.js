import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import * as dotenv from "dotenv";

import { ConnectDB } from "./mongodb/connect.js";
import UserRoutes from "./routes/user.js";
import TodoRouters from "./routes/todo.js";

dotenv.config();

const app = express();

app.use(bodyParser.json());
app.use(cors());
app.use(express.json());
  
app.use("/api/users", UserRoutes);
app.use("/api/todo", TodoRouters);

const startServer = () => {
  try {
    ConnectDB(process.env.MONGODB_URL);
    app.listen(8080, () => {
      console.log("http://localhost:8080");
    });
  } catch (error) {
    console.log(error);
  }
};

startServer();
