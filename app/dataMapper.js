const client = require('./database');

const dataMapper = {

    getAllFigurines: (callback) => {
        client.query(`SELECT f.*, ROUND(AVG(note)) AS avgnote FROM review JOIN figurine f ON figurine_id = f.id GROUP BY f.id ORDER BY name;
        `, (error, data) => {
            callback(error, data.rows);
        });
    },

    getOneFigurine: (id, callback) => {
        client.query(`SELECT f.*, ROUND(AVG(note)) AS avgnote FROM review JOIN figurine f ON figurine_id = f.id WHERE f.id = $1 GROUP BY f.id;
        `, [id], (error, data) => {
            callback(error, data.rows[0]);
        });
    },

    getReviews: (id, callback) => {
        client.query(`SELECT * FROM "review" WHERE "figurine_id" = $1`, [id], (error, data) => {
            callback(error, data.rows);
        });
    },

    getCategories: (callback) => {
        client.query(`SELECT category, COUNT(*) FROM "figurine" GROUP BY "category" ORDER BY "category"`, (error, data) => {
            callback(error, data.rows);
        });
    },

    getFigurinesByCat: (name, callback) => {
        client.query(`SELECT f.*, ROUND(AVG(note)) AS avgnote FROM figurine f JOIN review ON figurine_id = f.id WHERE category = $1 GROUP BY f.id;
        `, [name], (error, data) => {
            callback(error, data.rows);
        });
    }
};

module.exports = dataMapper;