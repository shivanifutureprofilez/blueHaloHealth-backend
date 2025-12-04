const multer = require("multer");
const path = require("path");

// Storage config
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/uploads");
  },
  filename: function (req, file, cb) {
    const uniqueName = Date.now() + "-" + file.originalname;
    cb(null, uniqueName);
  },
});

// FIX: Increase field & file limits
const upload = multer({
  storage,
  limits: {
    fieldSize: 10 * 1024 * 1024, // 10MB per text field
    fileSize: 10 * 1024 * 1024,  // 10MB for image
    fields: 50,                  // optional
  },
});

module.exports = upload;
