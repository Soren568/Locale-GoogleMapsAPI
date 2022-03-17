const { User } = require('../models/user.model');
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');

// Finding the user for authorization/validation purposes
module.exports.findAllUsers = (req, res) => {
    console.log("finding all users")
    User.find()
        .then(allUsers => res.json({ users: allUsers }))
        .catch(err => res.status(400).json(err));
}

module.exports.findOneUser = (req, res) => {
    User.findOne({ _id: req.params.id })
        .then(oneUser => res.json({ user: oneUser }))
        .catch(err => res.status(400).json(err));
}

// CREATE UPDATE DELETE
// Signs a JWT to user and attaches to cookie upon account creation for immediate login
module.exports.createUser = (req, res) => {
    console.log(req.body)
    User.create(req.body)
        .then(user => {
            const userToken = jwt.sign({
                id: user._id
            }, process.env.FIRST_SECRET_KEY);

            res
                .cookie("usertoken", userToken, process.env.FIRST_SECRET_KEY, {
                    httpOnly: true,
                    signed: true
                })
                .json({ msg: "registration success!", userId: user._id });
        })
        .catch(err => { res.status(400).json(err); console.log(err) });
}
module.exports.updateUser = (req, res) => {
    User.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true })
        .then(updatedUser => res.json({ user: updatedUser }))
        .catch(err => res.status(400).json(err));
}
module.exports.deleteUser = (req, res) => {
    User.deleteOne({ _id: req.params.id })
        .then(result => res.json({ result: result }))
        .catch(err => res.status(400).json(err));
}

// LOGIN LOGOUT
module.exports.login = async (req, res) => {
    const user = await User.findOne({ email: req.body.email.toLowerCase() });

    // check that email is in database
    if (user === null) {
        return res.status(400).json({ errors: { emailError: "Email not found in our database." } });
    }

    // compare the supplied password to the hashed password in the database using bcrypt module - returns boolean
    const correctPassword = await bcrypt.compare(req.body.password, user.password);
    if (!correctPassword) {
        return res.status(400).json({ errors: { passwordError: "Incorrect password" } });
    }

    // sign a JWT to the user - created using jwt module, secret key ensures no hacked signings 
    const userToken = jwt.sign({
        id: user._id
    }, process.env.FIRST_SECRET_KEY);

    console.log({ userToken })
    // attach a cookie to the response with the signed JWT and return sucess message
    res
        .cookie("usertoken", userToken, process.env.FIRST_SECRET_KEY, {
            httpOnly: true,
            signed: true
        })
        .json({ msg: "login success!", userId: user._id });
    console.log("RESCOOKIES", res.cookie)
}
// clear cookies
module.exports.logout = (req, res) => {
    res.clearCookie('usertoken').sendStatus(200);
}

// Add/remove location to/from favorites or stars
module.exports.addFavStar = (req, res) => {
    User.findOneAndUpdate({ _id: req.params.id }, { '$push': req.body }, { new: true })
        .then(updatedUser => res.json({ user: updatedUser }))
        .catch(err => res.status(400).json(err));
}
module.exports.removeFavStar = (req, res) => {
    User.findOneAndUpdate({ _id: req.params.id }, { '$pull': req.body }, { new: true })
        .then(updatedUser => res.json({ user: updatedUser }))
        .catch(err => res.status(400).json(err));
}