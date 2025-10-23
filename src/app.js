import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
const app = express();

// Basic Configurations
app.use(express.json({ limit: "16kb" })); // this is written so that backend can accept json data app.use(express.json({limit:"16kb"})); is a built in middleware that parses incoming request to req.body
app.use(express.urlencoded({ extended: true, limit: "16kb" })); // this is written so that whenever a form is submitted or data is given in URL encoded string this parses it to req.body in json format
app.use(express.static("public")); // This serves the static pages from the public/images folder


// COOKIE PARSER

app.use(cookieParser());
// CORS configuration (cross origin resource sharing)
app.use(
  cors({
    origin: process.env.CORS_ORIGIN?.split(",") || "http://localhost:5173", 
    credentials: true,
    methods: ["GET", "POST", "DELETE", "PUT", "PATCH", "OPTIONS"],
    allowedHeaders: ["Authorization", "Content-type"],
  }),
);  

// Import the routes
import healthCheckRouter from "./routes/healthcheck.routes.js";
// Auth router
import authRouter from "./routes/auth.routes.js";

app.use("/api/v1/healthcheck",healthCheckRouter);
app.use("/api/v1/auth",authRouter );

app.get("/", (req, res) => {
  res.send("Welcome to projectcamp");
});    

export default app;
