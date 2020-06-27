const multer = require('multer');

const MIME_TYPES = {
  'application/msword': 'doc',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document': 'docx',
  'image/jpeg': 'jpg',
  'image/jpg': 'jpg'
};

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    if (MIME_TYPES[file.mimetype] === 'doc') callback(null, 'files/cooperative/documents');
    if (MIME_TYPES[file.mimetype] === 'jpeg') callback(null, 'files/user-images');
  },
  filename: (req, file, callback) => {
    const name = file.originalname.split(' ').join('_');
    const extension = MIME_TYPES[file.mimetype];
    callback(null, `${name}${Date.now()}.${extension}`);
  }
});

module.exports = multer({ storage }).single('agreementDoc');
