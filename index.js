import express from "express";
import logger from "morgan";
import chalk from "chalk";
import cors from "cors";
import { fileURLToPath } from "url";
import path, { dirname } from "path";

import "dotenv/config";

import { PORT, ORIGINS } from "./config/index.js";
import connectDB from "./database/index.js";
import notFound from "./middleware/notFound.js";
import error from "./middleware/error.js";
import indexRoutes from "./routes.js";
import "./helper/global.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(
  cors({
    origin: ORIGINS,
    credentials: true,
  })
);

app.use("/", indexRoutes);
app.use(error);
app.use(notFound);

(async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(chalk.blueBright(`Server listening on http://localhost:${PORT}`));
    });
  } catch (error) {}
})();
