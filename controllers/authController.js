const bcrypt = require('bcrypt');
const User = require('../models/user');
const Category = require('../models/category');
const jwt = require('jsonwebtoken');

const dotenv = require('dotenv');  
dotenv.config();

const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: maxAge
    });
}


module.exports.signup_post = async (req, res) => {

    const { fullname, email, password, role, category } = req.body;
    try {
        const user = await User.create({ fullname, email, password, role, category });
        const drop = await Category.find();
        res.status(201).json({ user: user._id });
    } catch (err) {
        res.status(400).json({ err })

    }
}


module.exports.login_post = async (req, res) => {
    const { email, password, role, active } = req.body;

    try {
        const user = await User.login(email, password, role, active);
        const tokenvalue = createToken(user._id);
        const token = jwt.sign(tokenvalue, process.env.JWT_SECRET);
        res.header('auth-token', token)
        res.status(200).json({ role: user.role, user: user._id, active: user.active })
    } catch (err) {
        const errors = handleErrors(err);
        res.status(400).json({ errors })
    }
}

module.exports.update_Password = async (req, res) => {
    console.log("Request body", req.body)
    const newPassword = req.body.value.newpassword;
    const confirmPassword = req.body.value.confirmpassword;
    const sentToken = req.body.token;
    console.log("present", sentToken)
    const salt = await bcrypt.genSalt();
    if (!newPassword || !confirmPassword) {
        return res.status(400).send("Password filed cannot be empty")
    }
    if (newPassword !== confirmPassword) {
        res.status(400).send("Password dosen't match")
    }
    User.findOne({ resetToken: sentToken, expireToken: { $gt: Date.now() } })
        .then(user => {
            console.log("Forgot Password", user)
            if (!user) {
                return res.status(422).send("Try again session expired")
            }
            if (newPassword === confirmPassword && newPassword.length > 0) {
                if (newPassword.length > 6) {
                    bcrypt.hash(newPassword, salt)
                    .then(hashedpassword => {
                        console.log("updatedhashed", hashedpassword)
                        User.updateOne({ _id: user._id }, { $set: { password: hashedpassword, resetToken: undefined, expireToken: undefined } })
                            .then(result => res.status(200).send("Password Updated Successfully.."))
                            .catch(err => {
                                console.log(error)
                                res.status(400).send("Try again..!!")
                            })
                    }).catch(err => res.status(400).send("Please check the password field.."))
                }
                else {
                    res.status(400).send("Password length must be at least 6 character..")
                }
            }
        }).catch(err => {
            console.log(err)
            res.status(400).json({ err })
        })

}


module.exports.reset_Password = async (req, res) => {
    const { confirmPassword, currentPassword, newPassword } = req.body;
    console.log(confirmPassword, currentPassword, newPassword, req.params.id)
    if (!confirmPassword || !currentPassword || !newPassword) {
        return res.status(400).send("Please field cannot be empty")
    }
    const salt = await bcrypt.genSalt();
    const updatedPassword = await bcrypt.hash(newPassword, salt)
    // console.log(!(confirmPassword === newPassword));
    if (!(confirmPassword === newPassword)) return res.status(400).send("Please Enter same password")
    console.log("Checking", confirmPassword == newPassword)
    if (confirmPassword == newPassword) {
        const user = await User.findById({ _id: req.params.id });
        const auth = await bcrypt.compare(currentPassword, user.password);
        console.log("The value of aut", auth)
        if (auth) {
            try {

                const user = await User.updateOne({ _id: req.params.id }, { $set: { password: updatedPassword } })
                res.status(200).send("Password Updated")
            }
            catch (err) {
                res.status(400).send({ err })
            }
        } else {
            res.status(400).send("Password dosen't match")
        }
    }
    else {
        res.status(400).send("Something went wron")
    }
}


module.exports.logout_get = (req, res) => {
    res.cookie('jwt', '', { maxAge: 1 });
    res.redirect('/');
}