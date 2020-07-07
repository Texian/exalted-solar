const db = require ('../models');

const index = async (req, res) => {
    try {
        const characters = await db.Character.find({});
        if (!characters) return res.status(404).json({error: `No characters found`});
        return res.json(characters);
    } catch (err) {
        return res.status(500).json(`Index error: ${err}`);
    }
}
const show = async (req, res) => {
    try {
        const character = await db.Character.findById(req.params.id);
        if (!character) return res.status(404).json({error: `No character found with that ID`});
        return res.json(character);
    } catch (err) {
        return res.status(500).json(`Show error: ${err}`);
    }
}
const create = async (req, res) => {
    try {
        const newCharacter = await db.Character.create(req.body);
        if (!newCharacter) return res.status(404).json({error: `Unable to create new character`});
        return res.json(newCharacter);
    } catch (err) {
        return res.status(500).json(`Create error: ${err}`);
    }
}
const update = async (req, res) => {
    try {
        const updatedCharacter = await db.Character.findByIdAndUpdate(req.params.id, req.body, {new: true});
        if (!updatedCharacter) return res.status(404).json({error: `Unable to update character`});
        return res.json(updatedCharacter);
    } catch (err) {
        return res.status(500).json(`Update error: ${err}`);
    }
}
const destroy = async (req, res) => {
    try {
        const deletedCharacter = await db.Character.findByIdAndDelete(req.params.id);
        if (!deletedCharacter) return res.status(404).json({error: `Unable to delete character`});
        return res.json(deletedCharacter);
    } catch (err) {
        return res.status(500).json(`Index error: ${err}`);
    }
}

module.exports = {
    index,
    show,
    create,
    update,
    destroy,
}