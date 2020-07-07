const db = require('../models');

const index = async (req, res) => {
    try {
        const users = await db.User.find({});
        if(!users) return res.status(404).json({error: 'No users found'});
        return res.json(users);
    } catch (err) {
        return res.status(500).json(`User index error: ${err}`);
    }
}

const show = async (req, res) => {
    try {
        const user = await db.User.find({_id: req.params.id});
        if(!user) return res.status(404).json({error: 'User not found'});
        return res.json(user);
    } catch (err) {
        return res.status(500).json(`User show error: ${err}`);
    }
}
const create = async (req, res) => {
    try {
        const newUser = await db.User.create(req.body);
        if(!newUser) return res.status(404).json({error: 'User cannot be created'});
        return res.json(newUser);
    } catch (err) {
        return res.status(500).json(`User create error: ${err}`);
    }
}
const update = async (req, res) => {
    try {
        const userToUpdate = await db.User.findOneAndUpdate({_id: req.params.id}, req.body, {new: true});
        if(!userToUpdate) return res.status(404).json({error: 'Could not find user to update'});
        return res.json(users);
    } catch (err) {
        return res.status(500).json(`User update error: ${err}`);
    }
}
const destroy = async (req, res) => {
    try {
        const destroyUser = await db.User.findOneAndDelete({_id: req.params.id});
        if(!destroyUser) return res.status(404).json({error: 'Could not find user to delete'});
        return res.json(users);
    } catch (err) {
        return res.status(500).json(`User delete error: ${err}`);
    }
}

module.exports = {
    index,
    show,
    create,
    update,
    destroy
}