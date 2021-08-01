﻿const config = require('config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('_helpers/db');
const User = db.User;
const { v4: uuidv4 } = require('uuid');

module.exports = {
    authenticate,
    create,
    update,
    getById,
    googleauth

};
async function getById(id) {
    const user = await User.findById(id);
    return user
}
async function authenticate({ userName, password }) {
    let user = await User.findOne({ userName });
    if (!user) {
        user = await User.findOne({ email: userName });
    }
    if (user && bcrypt.compareSync(password, user.hash)) {
        const token = jwt.sign({ sub: user.id }, config.secret, { expiresIn: config.tokenExpiresIn });
        return {
            ...user.toJSON(),
            token
        };
    }
}
async function googleauth(userParam) {
    
    const user = await User.findOne({ userName: userParam.userName });
    if (user) {
        const token = jwt.sign({ sub: user.id }, config.secret, { expiresIn: config.tokenExpiresIn });
        return {
            ...user.toJSON(),
            token
        };
    }
    else {
        const userpassword = uuidv4()
        const user = new User(userParam);
        user.hash = bcrypt.hashSync(userpassword, 10);
        const newuser=  await user.save();
        const token = jwt.sign({ sub: newuser.id }, config.secret, { expiresIn: config.tokenExpiresIn });
        return {
            ...newuser.toJSON(),
            token
        };

    }
}

async function create(userParam) {
    // validate
    if (await User.findOne({ userName: userParam.userName })) {
        throw 'userName "' + userParam.userName + '" is already taken';
    }
    const user = new User(userParam);

    // hash password
    if (userParam.password) {
        user.hash = bcrypt.hashSync(userParam.password, 10);
    }

    // save user
    await user.save();
}

async function update(id, userParam) {
    const user = await User.findById(id);

    // validate
    if (!user) throw 'User not found';
    if (user.userName !== userParam.userName && await User.findOne({ userName: userParam.userName })) {
        throw 'userName "' + userParam.userName + '" is already taken';
    }

    // hash password if it was entered
    if (userParam.password) {
        userParam.hash = bcrypt.hashSync(userParam.password, 10);
    }

    // copy userParam properties to user
    Object.assign(user, userParam);

    await user.save();
}