const pool = require('../db');

const getTitleChapters = async (req, res) => {
    const { id } = req.params;
    try {
        const query = 'SELECT id, chapter_number, chapter_title, created_at FROM Chapters WHERE title_id = $1 ORDER BY chapter_number';
        const values = [id]
        const data = await pool.query(query, values)
        return res.status(200).json(data.rows)
    } catch (error) {
        console.log(error)
        return res.status(400).json({error})
    }
}

module.exports = getTitleChapters;