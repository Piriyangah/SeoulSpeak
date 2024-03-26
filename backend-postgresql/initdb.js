const express = require('express');
const client = require('./db');
const initdb = express.Router();
var format = require('pg-format');


initdb.get('/', async(req, res) => {

    // Anlegen der Tabelle vocabulary
    let query = `
            DROP TABLE IF EXISTS vocabulary;
            CREATE TABLE vocabulary(id serial PRIMARY KEY, german VARCHAR(200), korean VARCHAR(200), definiton VARCHAR(500), eg_german VARCHAR(1500), eg_korean VARCHAR(1500));
            `;

    try {
        await client.query(query)
        console.log("Table created successfully ...")
    } catch (err) {
        console.log(err)
    }

    // Befüllen der Tabelle vocabulary mit 50 Einträgen
    const values = [
        ["Apfel", "사과", "Eine Frucht, die an Bäumen wächst und typischerweise rot oder grün ist.", "Ich esse gerne Äpfel.", "나는 사과를 좋아해요."],
        ["Buch", "책", "Eine Sammlung von gedruckten oder geschriebenen Seiten, normalerweise mit einem Schutzumschlag gebunden.", "Ich lese jeden Abend vor dem Schlafengehen ein Buch.", "나는 매일 밤 책을 읽어요."],
        ["Haus", "집", "Ein Gebäude, in dem Menschen leben.", "Ich wohne in einem Haus.", "나는 집에 살아요."],
        ["Auto", "자동차", "Ein Fahrzeug mit vier Rädern, das Menschen befördert.", "Mein Auto ist blau.", "나의 자동차는 파란색이에요."],
        ["Schule", "학교", "Ein Ort, an dem Menschen lernen.", "Ich gehe zur Schule.", "나는 학교에 갑니다."]
        ["Essen", "음식", "Substanzen, die Menschen essen, um Energie zu gewinnen.", "Ich esse gerne Pizza.", "나는 피자를 좋아해요."],
    ];
    const paramquery = format('INSERT INTO vocabulary(german, korean, definiton, eg_german, eg_korean) VALUES %L RETURNING *', values);


    try {
        const result = await client.query(paramquery)
        console.log("50 vocabulary inserted ...")
        res.status(200)
        res.send(result.rows)
    } catch (err) {
        console.log(err)
    }

});


module.exports = initdb;
