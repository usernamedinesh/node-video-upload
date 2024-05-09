import cors from "cors";
import express from "express";
import { UploadVideo } from "./controller/videoUpload.controller.js";
import { fetchVideo } from "./controller/videoFetch.controller.js";
import { upload } from "./helper/multer.config.js";
import { connectDB } from "./db/config.js";

const app = express();
connectDB();

app.use(
  cors({
    origin: ["http://locahost:3000", "http://locahost:5173"],
    credentials: true,
  }),
);

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Origin",
    "Origin, X-Requested-with, Content-Type, Accept",
  );
  next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static("uploads"));

app.get("/", function (req, res) {
  res.send("server is working ");
});

app.post(
  "/upload",
  upload.fields([
    { name: "video", maxCount: 1 },
    { name: "subtitle", maxCount: 1 },
  ]),
  UploadVideo,
);
app.get("/get", fetchVideo);

app.use((req, res) => {
  const error = new Error("Not Found");
  error.status = 404;
  return res.status(404).json("error or wrong url");
});

app.listen(6969, () => {
  console.log("server running..");
});
