// // backend/middleware/upload.js
// const multer = require('multer');
// const path = require('path');
// const fs = require('fs');

// // Ensure uploads/headshots folder exists
// const uploadDir = 'uploads/headshots';
// if (!fs.existsSync(uploadDir)) {
//   fs.mkdirSync(uploadDir, { recursive: true });
// }

// // storage config
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, uploadDir); // save in uploads/headshots/
//   },
//   filename: (req, file, cb) => {
//     cb(null, Date.now() + path.extname(file.originalname)); // unique filename
//   }
// });

// // file filter (only images)
// const fileFilter = (req, file, cb) => {
//   if (file.mimetype.startsWith('image/')) {
//     cb(null, true);
//   } else {
//     cb(new Error('Only images allowed!'), false);
//   }
// };

// const upload = multer({ storage, fileFilter });

// module.exports = upload;

const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("cloudinary").v2;

// Cloudinary config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// Storage config for multer with Cloudinary
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "student_headshots", // Folder name on Cloudinary
    allowed_formats: ["jpg", "jpeg", "png"], // Allowed file types
    public_id: (req, file) => Date.now() + "-" + file.originalname.split(".")[0]
  },
});

const upload = multer({ storage });

module.exports = upload;

