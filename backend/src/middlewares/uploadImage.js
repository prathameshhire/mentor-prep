import { fileURLToPath } from 'url';
import multer from "multer";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, `${__dirname}/../../public/assets`);
    },
    filename: (req, file, cb) => {
        console.log(file);
        cb(null, `${Date.now()}${path.extname(file.originalname)}`)
    }
});

const uploadImage = multer({storage: storage});

export default uploadImage;