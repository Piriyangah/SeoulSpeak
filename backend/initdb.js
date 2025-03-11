const express = require('express');
const client = require('./db');
const initdb = express.Router();
const format = require('pg-format');


initdb.get('/', async(req, res) => {

    // Anlegen der Tabelle vocabulary
    let query = `
            DROP TABLE IF EXISTS vocabulary;
            CREATE TABLE vocabulary (
                id SERIAL PRIMARY KEY,
                korean VARCHAR(255) NOT NULL,
                pronunciation VARCHAR(255),
                english TEXT NOT NULL,
                example TEXT,
                meaning TEXT,
                difficulty INT CHECK (difficulty BETWEEN 1 AND 5) IS NULL);`;

            
    try {
        await client.query(query)
        console.log("Table created successfully ...")
    } catch (err) {
        console.log(err)
    }

    // Befüllen der Tabelle vocabulary mit 15 Einträgen
    const values = [
        ["사랑", "sarang", "love", "나는 너를 사랑해.", "A deep feeling of affection.", 1],
        ["학교", "hakgyo", "school", "나는 학교에 가요.", "A place for learning.", 1],
        ["책", "chaek", "book", "이 책은 정말 재미있어요.", "A collection of written pages.", 2],
        ["음악", "eumak", "music", "나는 음악을 듣는 것을 좋아해.", "Art of sound in time.", 2],
        ["영화", "yeonghwa", "movie", "어제 새로운 영화를 봤어요.", "A sequence of images that tell a story.", 3],
        ["친구", "chingu", "friend", "내 친구는 매우 친절해.", "A person whom one knows and trusts.", 1],
        ["날씨", "nalssi", "weather", "오늘 날씨가 정말 좋아.", "The state of the atmosphere at a place and time.", 2],
        ["여행", "yeohaeng", "travel", "다음 주에 한국으로 여행 가요.", "To go on a journey.", 3],
        ["공원", "gongwon", "park", "우리는 공원에서 산책했어요.", "A public green space in a town or city.", 1],
        ["음식", "eumsik", "food", "한국 음식은 정말 맛있어요.", "Any nutritious substance consumed.", 2],
        ["운동", "undong", "exercise", "나는 매일 아침 운동을 해.", "Activity requiring physical effort.", 3],
        ["컴퓨터", "keompyuteo", "computer", "내 컴퓨터가 너무 느려.", "An electronic device for storing and processing data.", 2],
        ["시간", "sigan", "time", "시간이 정말 빨리 지나가.", "The indefinite continued progress of existence.", 1],
        ["행복", "haengbok", "happiness", "행복은 작은 것에서 온다.", "A state of well-being and contentment.", 3],
        ["바다", "bada", "sea", "여름에 바다에서 수영하고 싶어요.", "The expanse of salt water that covers most of the Earth's surface.", 1]
    ];
        
    // hierfuer muss pg-format installiert werden (wegen %L):
    const paramquery = format(
        'INSERT INTO vocabulary(korean, pronunciation, english, example, meaning, difficulty) VALUES %L RETURNING *', values);
        
    try {
        const result = await client.query(paramquery)
        console.log("15 vocabulary inserted ...")
        res.status(200)
        res.send(result.rows)
    } catch (err) {
        console.log(err)
    }

});

module.exports = initdb;