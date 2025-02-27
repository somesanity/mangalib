const pool = require('../db');

const postNewChapter = async (req, res) => {
    const { id } = req.params;
    const { chapterName, chapterNumber } = req.body;

    try {
        console.log("Тип данных chapterNumber:", typeof chapterNumber, "| Значение:", chapterNumber);
        chapterNumber: chapterNumber

        const chapterNum = Number(chapterNumber);

        if (!Number.isInteger(chapterNum)) {
            throw new Error("chapterNumber должен быть целым числом");
        }

        const query = 'INSERT INTO Chapters (title_id, chapter_number, chapter_title) VALUES ($1, $2, $3) RETURNING *';
        const values = [id, chapterNum, chapterName];

        const requestDB = await pool.query(query, values);
        return res.status(200).json(requestDB.rows[0]); 
    } catch (error) {
        console.error("Ошибка при добавлении главы:", error.message);
        return res.status(400).json({ error: error.message });
    }
};

module.exports = postNewChapter;
