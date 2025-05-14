import multer, { diskStorage, memoryStorage } from "multer";
import path from "path";
import fs from "fs";
import { UPLOADS } from "../constants";
const storage = diskStorage({
  destination: function (req, file, cb) {
    let destination = path.resolve(__dirname, "../../public/temp");
    if (!fs.existsSync(destination)) {
      fs.mkdirSync(destination, { recursive: true });
    }
    cb(null, destination);
  },
  filename: function (req, file, cb) {
    const extention = path.extname(file.originalname);
    const name = String(file.originalname).replace(extention, "");
    cb(null, `${name}_${new Date().valueOf()}${extention}`);
  },
});

const upload = multer({ storage });

export default upload;
