const mongoose = require('mongoose');

const schema = new mongoose.Schema(
    {
        german: String,
        korean: String,
        definition: String,
        eg_german: String,
        eg_korean: String

    }
);

module.exports = mongoose.model('Vokabel', schema);