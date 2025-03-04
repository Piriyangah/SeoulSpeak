const express = require('express');
const router = express.Router();
const client = require('./db');

// eine GET-Anfrage
router.get('/', async(req, res) => {

    res.send({ message: "Hello FIW!" });
});

// post one vocabulary
router.post('/vocabulary', async(req, res) => {
    let korean = (req.body.korean) ? req.body.korean : null;
    let pronunciation = (req.body.pronunciation) ? req.body.pronunciation : null;
    let english = (req.body.english) ? req.body.english : null;
    let example = (req.body.example) ? req.body.example : null;
    let meaning = (req.body.meaning) ? req.body.meaning : null;
    let difficulty = (req.body.difficulty) ? req.body.difficulty : null;

    const query = `INSERT INTO vocabulary(korean, pronunciation, english, example, meaning, difficulty) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`;

    try {
        const result = await client.query(query, [korean, pronunciation, english, example, meaning, difficulty])
        console.log(result)
        res.send(result.rows[0]);
    } catch (err) {
        console.log(err.stack)
    }
});

// get complete vocabulary
router.get('/vocabulary', async(req, res) => {
    const query = `SELECT * FROM vocabulary `;

    try {
        const result = await client.query(query)
        console.log(result)
        res.send(result.rows);
    } catch (err) {
        console.log(err.stack)
    }
});

// update one vocabulary
router.put('/vocabulary/:id', async(req, res) => {
    const query = `SELECT * FROM vocabulary WHERE id=$1`;

    let id = req.params.id;
    const result = await client.query(query, [id])
    if(result.rowCount > 0)
    {
        let vocabulary = result.rows[0];
        let korean = (req.body.korean) ? req.body.korean : vocabulary.korean;
        let pronunciation = (req.body.pronunciation) ? req.body.pronunciation : vocabulary.pronunciation;
        let english = (req.body.english) ? req.body.english : vocabulary.english;
        let example = (req.body.example) ? req.body.example : vocabulary.example;
        let meaning = (req.body.meaning) ? req.body.meaning : vocabulary.meaning;
        let difficulty = (req.body.difficulty) ? req.body.difficulty : vocabulary.difficulty;

        const updatequery = `UPDATE vocabulary SET 
            korean = $1, 
            pronunciation = $2,
            english = $3,
            example = $4,
            meaning = $5,
            difficulty = $6
            WHERE id=$7;`;
        const updateresult = await client.query(updatequery, [korean, pronunciation, english, example, meaning, difficulty, id]);
        console.log(updateresult)
        res.send({ id, korean, pronunciation, english, example, meaning, difficulty });
    } else {
        res.status(404)
        res.send({
            error: "Vocabulary with id=" + id + " does not exist!"
        })
    }
});

// delete one vocabulary by id
router.delete('/vocabulary/:id', async(req, res) => {
    const query = `DELETE FROM vocabulary WHERE id=$1`;

    try {
        const id = req.params.id;
        const result = await client.query(query, [id])
        console.log(result)
        if (result.rowCount == 1)
            res.send({ message: "Vocabulary with id=" + id + " deleted" });
        else {
            res.status(404)
            res.send({ message: "No vocabulary found with id=" + id });
        }
    } catch (err) {
        console.log(err.stack)
    }
});

module.exports = router;