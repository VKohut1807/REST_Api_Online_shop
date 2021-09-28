const multer = require('multer');

class multerSet {
    storageConfig = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, __dirname + "/../public/img");
        },
        filename: (req, file, cb) => {
            const pathGeneral = `${req.headers.referer}`;
            const pathFromCat = "auth/admin-category";
            const pathFromGoods = "auth/admin-goods";
            if (pathGeneral.match(pathFromCat) != null) {
                cb(null, `category-${file.originalname}`);
            } else if (pathGeneral.match(pathFromGoods) != null) {
                cb(null, `goods-${file.originalname}`);
            } else {
                cb(null, file.originalname);
            }
        }
    });

    async fileFilter(req, file, cb) {
        const fileMaxSize = 1 * 1024 * 1024;
        const fileSize = parseInt(req.headers['content-length']);
        if (fileSize <= fileMaxSize && (
            file.mimetype === "image/png" ||
            file.mimetype === "image/jpg" ||
            file.mimetype === "image/jpeg")) {
            return cb(null, true);
        } else {
            return cb(null, false);
        }
    }
}

module.exports = new multerSet();