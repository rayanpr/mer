import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../api/uploads')); // Dossier local
  },
  filename: (req, file, cb) => {
    
    const uniqueName = Date.now() + '-' + file.originalname;
    cb(null, uniqueName);
  }
});

const uploadMulter = multer({ storage });

export default uploadMulter;