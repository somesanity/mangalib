const pool = require('../db');


const getPagesforChapter = async (req, res) => {
    const { id, chapterid } = req.params;
    try {
        const query =
        `SELECT Pages.page_number, Pages.image_url 
        FROM Pages
        JOIN Chapters ON Pages.chapter_id = Chapters.id
        WHERE Chapters.id = $1 AND Chapters.title_id = $2
        ORDER BY Pages.page_number`;

        const values = [id, chapterid]
        requestDB = await pool.query(query, values);
        const data = requestDB.rows;

        if(!data) {
            return res.status(404).json({message: 'Страницы данной главы не найдены!'})
        }

        return res.status(200).json(data);
    } catch (error) {
        console.log(error)
        return res.status(400).json({error})
    }
}

module.exports = getPagesforChapter;