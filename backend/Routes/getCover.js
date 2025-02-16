const pool = require('../db');

const getCover = async (req, res) => {
    const { id } = req.params;
    try {
        const query = 'SELECT title_cover FROM title WHERE id = $1';
        const values = [id]
        const data = await pool.query(query, values)
        return res.status(200).send(data.rows[0].title_cover)
    } catch (error) {
        console.log(error)
        return res.status(400).json({error})
    }
}

module.exports = getCover;