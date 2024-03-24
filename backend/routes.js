const express = require('express');
const router = express.Router();
const Vokabel = require('./models/vokabel')

//get all Vokabeln - Read
router.get('/vokabeln', async(req,res) => {
    const allVokabeln = await Vokabel.find();
    console.log(allVokabeln)
    res.send(allVokabeln)
})

//post one Vokabel
router.post('/vokabeln', async(req, resp) => {

})


module.exports = router;