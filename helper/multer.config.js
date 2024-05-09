import multer from "multer";
import path from "path";
import { v4 as uuidv4 } from "uuid";

//multer middleware
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/");
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    const filename = file.filename + "-" + uuidv4() + ext;
    cb(null, filename);
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + "-" + uuidv4() + path.extname(file.originalname));
  },
});

export const upload = multer({ storage: storage });
