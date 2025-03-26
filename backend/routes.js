const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt')
const db = require('./db');
var jwt = require('jsonwebtoken');

router.get('/', async(req, res) => {

    res.send({ message: "Hello FIW!" });
});

// Login and Register
/*
router.get('/createtable', async (req, res) => {
    try {
        await db.query(`
            DROP TABLE IF EXISTS users;
            CREATE TABLE users(
                id serial PRIMARY KEY, 
                username VARCHAR(50), 
                password VARCHAR(255), 
                email VARCHAR(50), 
                role VARCHAR(50)
            );
        `);
        res.send({ message: `Table users in database ${process.env.PGDATABASE} created` });
    } catch (err) {
        console.error(err);
        res.status(500).send({ error: 'Error creating table' });
    }
});*/

// call only once at the beginning - creates table users (id, username, password, email, role)
router.get('/createtable', async(req,res) => {
    const password = await bcrypt.hash('pass1234', 10)
    const query = `INSERT INTO users(username, password, email, role) VALUES ($1, $2, $3, $4);`
    await db.query('DROP TABLE IF EXISTS users;')
    await db.query('CREATE TABLE users(id serial PRIMARY KEY, username VARCHAR(50), password VARCHAR(255), email VARCHAR(50), role VARCHAR(50));')
    await db.query(query, ["admin1", password, "admin1@test.de", "admin"])
    res.send({ message: `table users in database ${process.env.PGDATABASE} created`})
})

// post one user - register as role user
router.post('/register', async(req, res) => {
    let username = req.body.username;
    let password = req.body.password;
    let hashPassword = await bcrypt.hash(password, 10);
    console.log('hash : ', hashPassword)
    let email = req.body.email;
    let role = req.body.role === "admin" ? "admin" : "user";

    let check = await db.query('SELECT * FROM users WHERE email = $1 OR username = $2', [email, username]) 
    if(check.rowCount > 0) {
        res.status(401)
        res.send({ message: `E-Mail ${email} and/or username ${username} already exists`})
    } else {
        const query = `INSERT INTO users(username, password, email, role) VALUES ($1, $2, $3, $4) RETURNING *`;

        let result = await db.query(query, [username, hashPassword, email, role]);
        res.status(201)
        res.send(result.rows[0])
    }
})

// post one user - login
router.post('/login', async(req, res) => {
    let username = req.body.username;
    let password = req.body.password;

    let result = await db.query('SELECT * FROM users WHERE username = $1', [username]) 
    if(result.rowCount > 0) {
        const user = result.rows[0];
        const match = await bcrypt.compare(password, user.password);
        if (match) {
            const userWithoutPassword = { id: user.id, username: user.username, role: user.role, email: user.email };
            const token = jwt.sign(userWithoutPassword, username);
            return res.status(200).send({ token: token, user: userWithoutPassword });
        } else {
            return res.status(401).send({ message: "username/password wrong" });
        }        
    } else {
        res.status(401)
        res.send({ message: "username/password wrong"})     /* hier weiß man, username falsch */
    }

    /* ------------------ check if caller is admin    ---- start --------------------- */
    console.log('request headers: ', req.headers)
    const token = req.headers['authorization'];
    const callerusername = req.headers['username'];

    if(!token) {
        return res.status(401).send({ message: 'No token provided' });
    }
    try {
        const decoded = jwt.verify(token, callerusername)
        console.log('decoded : ', decoded)

        const check = await db.query('SELECT * FROM users WHERE username=$1', [decoded.username])
        console.log('check ', check)
        if(check.rows[0].role!='admin') {
            return res.status(401).send({ message: 'you are not an admin' });
        }

    } catch(err) {
        return res.status(401).send({ message: 'Invalid token' });
    }
    /* ------------------ check if caller is admin    ---- end --------------------- */
})

// get all users
router.get('/allUsers', async(req, res) => {

    /* ------------------ check if caller is admin    ---- start --------------------- */
    console.log('request headers: ', req.headers)
    const token = req.headers['authorization'];
    const callerusername = req.headers['username'];

    if(!token) {
        return res.status(401).send({ message: 'No token provided' });
    }
    try {
        const decoded = jwt.verify(token, callerusername)
        console.log('decoded : ', decoded)

        const check = await db.query('SELECT * FROM users WHERE username=$1', [decoded.username])
        console.log('check ', check)
        if(check.rows[0].role!='admin') {
            return res.status(401).send({ message: 'you are not an admin' });
        }

    } catch(err) {
        return res.status(401).send({ message: 'Invalid token' });
    }
    /* ------------------ check if caller is admin    ---- end --------------------- */

    /* ------- if caller is admin, then do the following --------------------------- */
    const query = `SELECT * FROM users `;

    try {
        const result = await db.query(query)
        console.log(res)
        res.status(200)
        res.send(result.rows);
    } catch (err) {
        console.log(err.stack)
    }
});

// get one user bei username
router.get('/:username', async(req, res) => {

    /* ------------------ check if caller is admin    ---- start --------------------- */
    console.log('request headers: ', req.headers)
    const token = req.headers['authorization'];
    const callerusername = req.headers['username'];

    if(!token) {
        return res.status(401).send({ message: 'No token provided' });
    }
    try {
        const decoded = jwt.verify(token, callerusername)
        console.log('decoded : ', decoded)

        const check = await db.query('SELECT * FROM users WHERE username=$1', [decoded.username])
        console.log('check ', check)
        if(check.rows[0].role!='admin') {
            return res.status(401).send({ message: 'you are not an admin' });
        }

    } catch(err) {
        return res.status(401).send({ message: 'Invalid token' });
    }
    /* ------------------ check if caller is admin    ---- end --------------------- */

    /* ------- if caller is admin, then do the following --------------------------- */
    const query = `SELECT * FROM users WHERE username = $1`;

    try {
        const username = req.params.username;
        const result = await db.query(query, [username])
        if(result.rowCount > 0) {
            res.status(200)
            res.send(result.rows[0]);
        } else {
            res.status(404)
            res.send({message: `user with username ${username} does not exist`});
        }
    } catch (err) {
        console.log(err.stack)
    }
});

// put ({username, oldpassword, newpassword}) - changepassword
router.put('/changepassword', async(req, res) => {
    let username = req.body.username;
    let oldpassword = req.body.oldpassword;
    let newpassword = req.body.newpassword;

    let hashPassword = await bcrypt.hash(newpassword, 10);
    console.log('hash : ', hashPassword)

    let result = await db.query('SELECT * FROM users WHERE username = $1', [username]) 
    if(result.rowCount > 0) {
        const user = result.rows[0];
        const match = await bcrypt.compare(oldpassword, user.password);
        if(match) {
            const updatequery = `UPDATE users SET 
            username = $1, 
            password = $2
            WHERE username=$3
            RETURNING *;`;

            const updateresult = await db.query(updatequery, [username, hashPassword, username]);
            console.log('updateresult : ', updateresult)
            res.status(200)
            res.send(updateresult.rows[0])
        }
        else {
            res.status(401)
            res.send({ message: "username/password wrong"})
        }
    } else {
        res.status(401)
        res.send({ message: "username/password wrong"})
    }
})

router.put('/setadmin', async(req, res) => {

    /* ------------------ check if caller is admin    ---- start --------------------- */
    console.log('request headers: ', req.headers)
    const token = req.headers['authorization'];
    const callerusername = req.headers['username'];

    if(!token) {
        return res.status(401).send({ message: 'No token provided' });
    }
    try {
        const decoded = jwt.verify(token, callerusername)
        console.log('decoded : ', decoded)

        const check = await db.query('SELECT * FROM users WHERE username=$1', [decoded.username])
        console.log('check ', check)
        if(check.rows[0].role!='admin') {
            return res.status(401).send({ message: 'you are not an admin' });
        }

    } catch(err) {
        return res.status(401).send({ message: 'Invalid token' });
    }
    /* ------------------ check if caller is admin    ---- end --------------------- */

    /* ------- if caller is admin, then do the following --------------------------- */
    let username = req.body.username;

    const updatequery = `UPDATE users SET 
    role='admin'
    WHERE username=$1
    RETURNING *;`;

    const updateresult = await db.query(updatequery, [username]);
    console.log('updateresult : ', updateresult)
    res.status(200)
    res.send(updateresult.rows[0])
})

// delete one user via id
router.delete('/:id', async(req, res) => {

    /* ------------------ check if caller is admin    ---- start --------------------- */
    console.log('request headers: ', req.headers)
    const token = req.headers['authorization'];
    const callerusername = req.headers['username'];

    if(!token) {
        return res.status(401).send({ message: 'No token provided' });
    }
    try {
        const decoded = jwt.verify(token, callerusername)
        console.log('decoded : ', decoded)

        const check = await db.query('SELECT * FROM users WHERE username=$1', [decoded.username])
        console.log('check ', check)
        if(check.rows[0].role!='admin') {
            return res.status(401).send({ message: 'you are not an admin' });
        }

    } catch(err) {
        return res.status(401).send({ message: 'Invalid token' });
    }
    /* ------------------ check if caller is admin    ---- end --------------------- */

    /* ------- if caller is admin, then do the following --------------------------- */
    try {
        const id = req.params.id;
        const query = `DELETE FROM users WHERE id=$1`;
        const result = await db.query(query, [id])
        console.log(result)
        if (result.rowCount == 1)
            res.send({ message: "User with id=" + id + " deleted" });
        else {
            res.status(404)
            res.send({ message: "No user found with id=" + id });
        }
    } catch (err) {
        console.log(err.stack)
    } 
});

router.post('/vocabulary', async(req, res) => {
    let korean = req.body.korean || null;
    let pronunciation = req.body.pronunciation || null;
    let english = req.body.english || null;
    let example = req.body.example || null;
    let meaning = req.body.meaning || null;
    let difficulty = req.body.difficulty || null;
  
    const query = `INSERT INTO vocabulary(korean, pronunciation, english, example, meaning, difficulty) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`;
  
    try {
      const result = await db.query(query, [korean, pronunciation, english, example, meaning, difficulty]);
      console.log('Insert result:', result);
      res.send(result.rows[0]); // Rückgabe der eingefügten Vokabel
    } catch (err) {
      console.error('Error inserting vocab:', err);
      res.status(500).send({ error: 'Error inserting vocabulary' }); 
    }
  });
  
router.get('/vocabulary', async(req, res) => {
    const query = `SELECT * FROM vocabulary `;

    try {
        const result = await db.query(query)
        console.log(result)
        res.send(result.rows);
    } catch (err) {
        console.log(err.stack)
    }
});

router.get('/vocabulary/:id', async(req, res) => {
    const query = `SELECT * FROM vocabulary WHERE id=$1`;

    try {
        const id = req.params.id;
        const result = await db.query(query, [id])
        console.log(result)
        if (result.rowCount == 1)
            res.send(result.rows[0]);
        else {
            res.status(404)
            res.send({ message: "No vocabulary found with id=" + id });
        }
    } catch (err) {
        console.log(err.stack)
    }
});

router.put('/vocabulary/:id', async(req, res) => {
    const query = `SELECT * FROM vocabulary WHERE id=$1`;
    let id = req.params.id;
    const result = await db.query(query, [id])
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
        const updateresult = await db.query(updatequery, [korean, pronunciation, english, example, meaning, difficulty, id]);
        console.log(updateresult)
        res.send({ id, korean, pronunciation, english, example, meaning, difficulty });
    } else {
        res.status(404)
        res.send({
            error: "Vocabulary with id=" + id + " does not exist!"
        })
    }
});

router.delete('/vocabulary/:id', async(req, res) => {
    const query = `DELETE FROM vocabulary WHERE id=$1`;

    try {
        const id = req.params.id;
        const result = await db.query(query, [id])
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