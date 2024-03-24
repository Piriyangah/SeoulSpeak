const express = require('express');
const router = express.Router();
const client = require('./db')
require('dotenv').config();

router.get('/createtabel', async(req, res) => {
    const anfrage = "DROP TABLE IF EXISTS vocabulary; CREATE TABLE vocabulary (id SERIAL PRIMARY KEY, german VARCHAR(400) NOT NULL, korean VARCHAR(400) NOT NULL, pronunciation VARCHAR(800) DEFAULT NULL, eg_german VARCHAR(800) DEFAULT NULL, eg_korean VARCHAR(800) DEFAULT NULL, eg_pronunciation VARCHAR(800) DEFAULT NULL);"
    await client.query(anfrage);
    res.send({ message: `table vocabulary in database ${process.env.PGDATABASE} created`});
});

//CRUD
// POST new vokabel 
router.post('/vocabulary', async(req, res) => {
    let german = req.body.german;
    let korean = req.body.korean;
    let pronunciation = req.body.pronunciation;
    let eg_german = req.body.eg_german;
    let eg_korean = req.body.eg_korean;
    let eg_pronunciation = req.body.eg_pronunciation;

//check vorher ob es den Vokabel schon gibt, wenn ja dann nicht erzeugen 

    let check = await client.query('SELECT * FROM vocabulary  WHERE korean = $1', [korean]) 
    if(check.rowCount > 0){ 
        res.send({message: `This Vokabel ${korean} already exists`}) 
    } 
    else{ 
        const anfrage = `INSERT INTO vocabulary(german, korean, pronunciation, eg_german, eg_korean, eg_pronunciation) VALUES ($1,$2,$3,$4,$5,$6) RETURNING *`
        let result = await client.query(anfrage, [german, korean, pronunciation, eg_german, eg_korean, eg_pronunciation]) 
        res.send(result.rows[0]);
    } 
});


//GET all 
router.get('/vocabulary', async(req,res) => {
    const anfrage = `SELECT * FROM vocabulary `;
    try {
        const result = await client.query(anfrage)
        console.log(res)
        res.send(result.rows);
    }
    catch (err){
        console.log(err.stack)
    }
});

// get one vokabel via id
router.get('/vocabulary/:id', async(req, res) => {
    const query = `SELECT * FROM vocabulary  WHERE id=$1`;

    try {
        const id = req.params.id;
        const result = await client.query(query, [id])
        console.log(result)
        if (result.rowCount == 1)
            res.send(result.rows[0]);
        else
            res.send({ message: "No vokabel found with id = " + id });
    } catch (err) {
        console.log("error", err.stack)
    }
});

//UPDATE one vokabel per id
router.put('/vocabulary/:id', async(req, res) => {
    const query = `SELECT * FROM vocabulary WHERE id=$1`;
    let id = req.params.id;
    const result = await client.query(query, [id])
    if(result.rowCount > 0) {
        let vocabulary  = result.rows[0];
        let german = (req.body.german) ? req.body.german : vocabulary.german;
        let korean = (req.body.korean) ? req.body.korean : vocabulary.korean;
        let pronunciation = (req.body.pronunciation) ? req.body.pronunciation : vocabulary.pronunciation;
        let eg_german = (req.body.eg_german) ? req.body.eg_german : vocabulary.eg_german;
        let eg_korean = (req.body.eg_korean) ? req.body.eg_korean : vocabulary.eg_korean;
        let eg_pronunciation = (req.body.eg_pronunciation) ? req.body.eg_pronunciation : vocabulary.eg_pronunciation;

        const updatequery = `UPDATE vocabulary SET 
            german = $1, 
            korean = $2,
            pronunciation = $3,
            eg_german = $4,
            eg_korean = $5,
            eg_pronunciation = $6
            WHERE id = $7
            RETURNING * `;
        const updateresult = await client.query(updatequery, [german, korean, pronunciation, eg_german, eg_korean, eg_pronunciation, id]);
        console.log('updateresult : ', updateresult)
        res.send(updateresult.rows[0]);
    }
    else{
        res.status(404)
        res.send({
            error: "vokabel with id = " + id + " does not exist!"
        })
    }
});

//DELETE one vokabel - DELETE 
router.delete('/vocabulary/:id', async(req, res) => {
    const anfrage = `DELETE FROM vocabulary  WHERE id=$1`;

    try {
        const id = req.params.id;
        const result = await client.query(anfrage, [id])
        console.log(result)
        if (result.rowCount == 1)
            res.send({ message: "Vokabel with id=" + id + " deleted" });
        else
            res.send({ message: "No Vokabel found with id=" + id });
    } catch (err) {
        console.log(err.stack)
    }
});

module.exports = router;
