import multer from "multer";

const storage = multer.memoryStorage();
// export const singleUpload = multer({storage}).single("file");

export const singleUpload = multer({ storage }).single('profilePhoto'); // For /register
export const singleResumeUpload = multer({ storage }).single('file');