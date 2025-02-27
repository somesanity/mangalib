const pool = require('../db');

const postNewPages = async (req, res) => {
    try {
        const { chapterid } = req.params;
        const pagesData = req.files;

        if (!pagesData || pagesData.length === 0) {
            return res.status(400).json({ message: "Файлы не загружены" });
        }

        const chapterCheck = await pool.query(
            'SELECT chapter_number FROM Chapters WHERE chapter_number = $1',
            [chapterid]
        );

        if (chapterCheck.rowCount === 0) {
            return res.status(400).json({ message: "Глава не найдена" });
        }

        const chapter_number = chapterCheck.rows[0].chapter_number;

        const values = [];
        pagesData.forEach((file, index) => {
            values.push(chapter_number, index + 1, `/uploads/${file.filename}`);
        });

        const query = `
            INSERT INTO Pages (chapter_id, page_number, image_url)
            VALUES ${pagesData.map((_, i) => `($${i * 3 + 1}, $${i * 3 + 2}, $${i * 3 + 3})`).join(', ')}
            RETURNING *;
        `;

        const result = await pool.query(query, values);
        res.status(201).json({ message: "Страницы загружены", pages: result.rows });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Ошибка сервера", error: error.message });
    }
};

module.exports = postNewPages;
