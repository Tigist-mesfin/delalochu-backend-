const multer = require("multer");
const path = require("path");
const fs = require("fs");

const uploadPath = path.join(process.cwd(), "uploads");

if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    let folder = uploadPath;

    if (file.fieldname === "profile_image") {
      folder = path.join(uploadPath, "profile-images");
    }

    if (file.fieldname === "doc") {
      folder = path.join(uploadPath, "broker-documents");
    }

     // Listing Images
    if (file.fieldname === "images") {
      folder = path.join(uploadPath, "listing-images");
    }

    fs.mkdirSync(folder, { recursive: true });

    cb(null, folder);
  },

  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname +
        "-" +
        Date.now() +
        path.extname(file.originalname)
    );
  },
});

const fileFilter = (req, file, cb) => {

  if (file.fieldname === "profile_image") {

    const allowed = /jpeg|jpg|png|webp/;

    const ext = path.extname(file.originalname).toLowerCase();

    if (
      allowed.test(file.mimetype) &&
      allowed.test(ext)
    ) {
      return cb(null, true);
    }

    return cb(new Error("Only images are allowed."));
  }

  if (file.fieldname === "doc") {

    const allowed = [
      "application/pdf",
      "image/jpeg",
      "image/png",
      "image/webp",
    ];

    if (allowed.includes(file.mimetype)) {
      return cb(null, true);
    }

    return cb(new Error("Only PDF or image documents are allowed."));
  }

   // Listing Images
  if (file.fieldname === "listing_images") {
    const allowed = [
      "image/jpeg",
      "image/jpg",
      "image/png",
      "image/webp",
    ];

    if (allowed.includes(file.mimetype)) {
      return cb(null, true);
    }

    return cb(new Error("Only image files are allowed."));
  }

  cb(new Error("Invalid upload field."));
};

module.exports = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
});