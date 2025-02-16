const pool = require('../db');


const getTitleById = async (req, res) => {
    const { id } = req.params;
    try {
        const query = 'SELECT * FROM title WHERE id = $1';
        const values = [id]
        requestDB = await pool.query(query, values);
        const data = requestDB.rows;

        if(!data) {
            return res.status(404).json({message: 'Манга не найдена!'})
        }

        return res.status(200).json(data);
    } catch (error) {
        console.log(error)
        return res.status(400).json({error})
    }
}

module.exports = getTitleById;