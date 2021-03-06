const express = require('express');
const router = express.Router();
const userService = require('./user.service');

// routes
router.post('/authenticate', authenticate);
router.post('/register', register);
router.post('/googleauth', googleauth);
router.put('/forgetpassword', ForgetPassword);
router.put('/limited', updatePassword);
router.put('/', update);

function authenticate(req, res, next) {
    userService.authenticate(req.body)
        .then(user => user ? res.json(user) : res.status(400).json({ message: 'username or password is incorrect' }))
        .catch(err => next(err));
}
function register(req, res, next) {
    userService.create(req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}
function googleauth(req, res, next) {  
    userService.googleauth(req.body)
        .then(user => user ? res.json(user) : res.status(400).json({ message: 'username or password is incorrect' }))
        .catch(err => next(err));
}

function updatePassword(req, res, next) {
    const { email, password } = req.body;
    userService.updatePassword(email, password).then((res)=>{
        res.json({ updated: res });
    }).catch(Err=>{
        res.json({ updated: false });
    });
}
function update(req, res, next) {
    userService.update(req.user, req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}
function ForgetPassword(req, res, next) {
    userService.forgetpassword(req.body)
        .then((otp) => {
            res.json(otp);
        })
        .catch(err => next(err));
}
module.exports = router;
// store returned user somehow
