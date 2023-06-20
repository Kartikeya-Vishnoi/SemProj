const multer = require("multer");
const uuid = require("uuid").v4;

const MIME_TYPE_MAP = {
  "video/mp4": "mp4",
  "video/gif": "gif",
  "video/ogg": "ogg",
  "video/wmv": "wmv",
  "video/mkv": "mkv",
  "video/ogg": "ogg",
  "video/webm": "webm",
  "image/png": "png",
  "image/jpeg": "jpeg",
  "image/jpg": "jpg",
  "application/pdf": "pdf",
  "application/x-pdf": "pdf",
  "application/acrobat": "pdf",
  "applications/vnd.pdf": "pdf",
  "text/pdf": "pdf",
  "text/x-pdf": "pdf",
  "application/vnd.adobe.pdf": "pdf",
  "application/vnd.cups-pdf": "pdf",
  "application/force-download": "pdf",
};

const fileUpload = multer({
  limits: 500000,
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "pitches");
    },
    filename: (req, file, cb) => {
      const ext = MIME_TYPE_MAP[file.mimetype];
      cb(null, uuid() + "." + ext);
    },
  }),

  fileFilter: (req, file, cb) => {
    const isValid = !!MIME_TYPE_MAP[file.mimetype];
    let error = isValid ? null : new Error("Invalid file type uploaded!");
    cb(error, isValid);
  },
});

module.exports = fileUpload;
