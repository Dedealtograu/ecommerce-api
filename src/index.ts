import express from "express";
import dotenv from "dotenv";
dotenv.config();
import path from "path";
import fs from "fs";
import { initializeApp, cert } from "firebase-admin/app";
import { initializeApp as initializeFirebaseApp} from "firebase/app";
import { routes } from "./routes/index.js";
import { errorHandler } from "./middlewares/error-handler.middleware.js";
import { pageNotFoundHandler } from "./middlewares/page-not-found.middlerware.js";
import { auth } from "./middlewares/auth.middleware.js";

const credentials = process.env.GOOGE_APPICATION_CREDENTIALS;

if (!credentials) {
  throw new Error("Environment variable GOOGE_APPICATION_CREDENTIALS is not set");
}
const fullPath = path.resolve(credentials);
const jsonData = fs.readFileSync(fullPath, 'utf-8');
const firebaseConfig = JSON.parse(jsonData);

initializeApp({
  credential: cert({
    projectId: firebaseConfig.project_id,
    clientEmail: firebaseConfig.client_email,
    privateKey: firebaseConfig.private_key?.replace(/\\n/g, '\n'),
  })
});
initializeFirebaseApp({
  apiKey: process.env.API_KEY
});

const app = express();

auth(app);
routes(app);
pageNotFoundHandler(app);
errorHandler(app);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});