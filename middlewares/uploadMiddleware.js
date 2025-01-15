const multer = require('multer');
const path = require('path');
 
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    
    let folder = 'uploads/';

    if(req.baseUrl.includes('/users')){
      folder = 'uploads/user';
    } else if (req.baseUrl.includes('/admins')){
      folder = 'uploads/admin';
    } else if (req.baseUrl.includes('/posts')){
      folder = 'uploads/post'
    }

    cb(null, folder);  
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, `${file.fieldname}-${uniqueSuffix}${path.extname(file.originalname)}`);
  }
});
 
const fileFilter = (req, file, cb) => {
  const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Only JPG, JPEG, and PNG images are allowed'), false);
  }
};
 
const upload = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 },  
  fileFilter: fileFilter
});

module.exports = upload;
