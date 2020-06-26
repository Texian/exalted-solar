const mongoose = require('mongoose');

const CasteSchema = new mongoose.Schema({
    name: String,
});

const Caste = mongoose.model('Caste', CasteSchema);

module.exports = Caste;