const multer = require('multer');
const path = require('path');
const sharp = require('sharp');
const fs = require('fs');

const MAX_FILE_SIZE = 2 * 1024 * 1024;
const ALLOWED_FORMATS = ['.jpg', '.jpeg', '.png', '.webp'];
const IMAGE_WIDTH = 150;
const IMAGE_HEIGHT = 250;
const UPLOADS_FOLDER = 'uploads/';

if (!fs.existsSync(UPLOADS_FOLDER)) {
    fs.mkdirSync(UPLOADS_FOLDER, { recursive: true });
}

const storage = multer.memoryStorage();

const upload = multer({
    storage,
    limits: { fileSize: MAX_FILE_SIZE },
    fileFilter: (req, file, cb) => {
        const ext = path.extname(file.originalname).toLowerCase();
        if (!ALLOWED_FORMATS.includes(ext)) {
            return cb(null, false);
        }
        cb(null, true);
    },
});

const ValidationCoverMiddleware = (req, res, next) => {
    upload.single('cover_image')(req, res, async (err) => {
        if (err) {
            return res.status(400).json({ error: err.message });
        }

        if (!req.file) {
            return res.status(400).json({ error: 'Файл не загружен или неверный формат.' });
        }

        try {
            const filename = `${Date.now()}-${req.file.originalname}`;
            const filepath = path.join(UPLOADS_FOLDER, filename);

            await sharp(req.file.buffer)
                .resize(IMAGE_WIDTH, IMAGE_HEIGHT)
                .toFormat('webp')
                .toFile(filepath);

            req.file.path = filepath;
            req.file.filename = filename;

            next();
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Ошибка обработки изображения.' });
        }
    });
};

module.exports = ValidationCoverMiddleware;
