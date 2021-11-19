const { User } = require('../models/user.model');
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');

module.exports.findAllUsers = (req, res) => {
    User.find()
        .then(allUsers => res.json({ users: allUsers }))
        .catch(err => res.status(400).json(err));
}

module.exports.findOneUser = (req, res) => {
    User.findOne({ _id: req.params.id })
        .then(oneUser => res.json({ user: oneUser }))
        .catch(err => res.status(400).json(err));
}

// NOTE -- sign a jwt to the user and attach it to a cookie for authentication for login
module.exports.createUser = (req, res) => {
    console.log(req.body)
    User.create(req.body)
        .then(user => {
            const userToken = jwt.sign({
                id: user._id
            }, process.env.FIRST_SECRET_KEY);

            res
                .cookie("usertoken", userToken, {
                    httpOnly: true
                })
                .json({ msg: "registration success!", userId:user._id });
        })
        .catch(err => {res.status(400).json(err); console.log(err)});
}

module.exports.updateUser = (req, res) => {
    User.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true })
        .then(updatedUser => res.json({ user: updatedUser }))
        .catch(err => res.status(400).json(err));
}
module.exports.addFavStar = (req, res) => {
    User.findOneAndUpdate({ _id: req.params.id },{'$push': req.body}, { new: true })
        .then(updatedUser => res.json({ user: updatedUser }))
        .catch(err => res.status(400).json(err));
}
module.exports.removeFavStar = (req, res) => {
    User.findOneAndUpdate({ _id: req.params.id },{'$pull': req.body}, { new: true })
        .then(updatedUser => res.json({ user: updatedUser }))
        .catch(err => res.status(400).json(err));
}

module.exports.deleteUser = (req, res) => {
    User.deleteOne({ _id: req.params.id })
        .then(result => res.json({ result: result }))
        .catch(err => res.status(400).json(err));
}

module.exports.login = async (req, res) => {
    const user = await User.findOne({ email: req.body.email });

    if (user === null) {
        // email not found in users collection
        return res.status(400).json({errors:{emailError: "Email not found in our database."}});
    }

    // if we made it this far, we found a user with this email address
    // let's compare the supplied password to the hashed password in the database
    const correctPassword = await bcrypt.compare(req.body.password, user.password);

    if (!correctPassword) {
        // password wasn't a match!
        return res.status(400).json({errors: {passwordError: "Incorrect password"}});
    }

    // if we made it this far, the password was correct
    const userToken = jwt.sign({
        id: user._id
    }, process.env.FIRST_SECRET_KEY);

    // note that the response object allows chained calls to cookie and json
    res
        .cookie("usertoken", userToken, {
            httpOnly: true
        })
        .json({ msg: "login success!", userId:user._id });
}

module.exports.logout = (req, res) => {
    res.clearCookie('usertoken');
    res.sendStatus(200);
}