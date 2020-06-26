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
        },/*{
            name: 'Dexterity',
            dots: {type: Number},
            attributeType: 'Physical'
        },{
            name: 'Stamina',
            dots: {type: Number},
            attributeType: 'Physical'
        },{
            name: 'Charisma',
            dots: {type: Number},
            attributeType: 'Social'
        },{
            name: 'Manipulation',
            dots: {type: Number},
            attributeType: 'Social'
        },{
            name: 'Appearance',
            dots: {type: Number},
            attributeType: 'Social'
        },{
            name: 'Perception',
            dots: { type: Number },
            attributeType: 'Mental'
        },{
            name: 'Intelligence',
            dots: {type: Number},
            attributeType: 'Mental'
        },{
            name: 'Wits',
            dots: {type: Number},
            attributeType: 'Mental'
        }*/]
    },
);

const Character = mongoose.model('Character', CharacterSchema);

module.exports = Character;