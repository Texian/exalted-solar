const db = require('../models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const register = (req, res) => {
    const newUser = {
        email: req.body.email,
        password: req.body.password
    }

    if (!newUser.email || !newUser.password){
        res.sendStatus(400).send('Fields cannot be blank');
        return;
    }

    db.User.findOne({email: newUser.email}, (err, foundUser) => {
        if (err) {
            res.status(500).json(err);
            return;
        } else if (foundUser) {
            res.status(400).json({error: 'Email already exists'});
            return;
        }

        bcrypt.genSalt(10, (err, salt) => {
            if (err) return res.status(500).json(err);

            bcrypt.hash(newUser.password, salt, (err, hashedPwd) => {
                if (err) return res.status(500).json(err);
                newUser.password = hashedPwd;

                db.User.create(newUser, (err, savedUser) => {
                    if (err) return res.status(500).json(err);
                    const token = jwt.sign(
                        {
                            email: savedUser.email,
                            _id: savedUser._id
                        },
                        process.env.JWT_SECRET,
                        {
                            expiresIn: "30 days"
                        },
                    );
                    return res.status(200).json({
                        message: 'User created',
                        token
                    });
                });
            });
        });
    })
};

const login = (req, res) => {
    const user = {
        email: req.body.email,
        password: req.body.password
    }

    if (!user.email || !user.password) return res.sendStatus(400).send('Fields cannot be blank');

    db.User.findOne({email: user.email}, (err, foundUser) => {
        if (err) return res.status(500).json(err);
        if (!foundUser) return res.status(400).send('User not found');

        bcrypt.compare(user.password, foundUser.password, (err, match) => {
            if (match) {
                const token = jwt.sign(
                    {
                        email: foundUser.email,
                        _id: foundUser._id
                    },
                    process.env.JWT_SECRET,
                    {
                        expiresIn: "30 days"
                    },
                );
                return res.status(200).json({
                    message: 'User logged in',
                    token
                });
            } else {
                return res.sendStatus(400);
            }
        })
    })
}

module.exports = {
    register,
    login
}