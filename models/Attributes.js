const mongoose = require ('mongoose');

const AttributesSchema = new mongoose.Schema({
    character: {
        type: Schema.Types.ObjectId,
        ref: 'Character'
    },
    attribute: {
        name: {type: String},
        dots: {type: Number},
        attributeType: {type: String}
    },
});

const Attributes = mongoose.model('Attributes', AttributesSchema);

module.exports = Attributes;