const pool = require('../db');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'Resources/TitleCover/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage: storage }).single('cover_image');

const uploadCoverImage = async (req, res) => {
    upload(req, res, async (err) => {
        if (err) {
            return res.status(400).json({ error: 'Ошибка загрузки файла' });
        }

        try {
            const { title_name } = req.body;
            if (!title_name) {
                return res.status(400).json({ error: 'Название обязательно' });
            }

            if (!req.file) {
                return res.status(400).json({ error: 'Обложка обязательна' });
            }

            const titleCoverPath = `http://localhost:2000/uploads/${req.file.filename}`

            const query = 'INSERT INTO title (title_cover, title_name) VALUES ($1, $2) RETURNING *';
            const values = [titleCoverPath, title_name];

            const requestDB = await pool.query(query, values);
            return res.status(200).json(requestDB.rows[0]);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Ошибка сервера' });
        }
    });
};

module.exports = uploadCoverImage;
