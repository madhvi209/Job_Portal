import multer from 'multer';

const storage = multer.memoryStorage();

const singleUpload = multer({
    storage,
    limits: {
        fileSize: 5 * 1024 * 1024, // 5MB
    },
}).single("file"); // Input name should match frontend form field

export { singleUpload };
