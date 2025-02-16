const pool = require('../db');


const getTitles = async (req, res) => {
    try {
        const query = 'SELECT * FROM title';
        requestDB = await pool.query(query);
        const data = requestDB.rows;
        return res.status(200).json(data);
    } catch (error) {
        console.log(error)
        return res.status(400).json({error})
    }
}

module.exports = getTitles;