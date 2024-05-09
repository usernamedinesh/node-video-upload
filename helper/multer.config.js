import multer from "multer";
import path from "path";
import { v4 as uuidv4 } from "uuid";

//multer middleware
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "./uploads/");
//   },
//   filename: function (req, file, cb) {
//     const ext = path.extname(file.originalname);
//     const filename = file.filename + "-" + uuidv4() + ext;
//     cb(null, filename);
//   },
//   filename: function (req, file, cb) {
//     cb(null, file.fieldname + "-" + uuidv4() + path.extname(file.originalname));
//   },
// });
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Determine the destination based on the file type (video or subtitle)
    const destination =
      file.fieldname === "subtitle" ? "./subtitles/" : "./uploads/";
    cb(null, destination);
  },
  filename: function (req, file, cb) {
    const uuid = uuidv4();
    const ext = path.extname(file.originalname);
    const filename = file.fieldname + "-" + uuid + ext;
    cb(null, filename);
  },
});

export const upload = multer({ storage: storage });
