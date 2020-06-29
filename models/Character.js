const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CharacterSchema = new mongoose.Schema({
    name: String,
    caste: {
        type: Schema.Types.ObjectId,
        ref: 'Caste'
    },
    supernal: String,
    anima: String,
    concept: String,
    description: String,
    attributes: [
        {
            name: String,
            dots: Number,
            attributeType: String
        },]
    },
);

const Character = mongoose.model('Character', CharacterSchema);

module.exports = Character;