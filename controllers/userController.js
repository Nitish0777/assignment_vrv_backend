const User = require('../models/user');
const Category = require('../models/category');
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
dotenv.config();



const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: maxAge
    });
}

module.exports.get_dropdown = async (req, res) => {
    try {
        const drop = await Category.find();
        res.status(200).json(drop)
    } catch (err) {
        res.status(400).json(err)
    }
}


module.exports.admin_check = async (req, res) => {
    const email = req.params.email;
    const user = await User.find({ email });
    const tokenvalue = createToken(user._id);
    const token = jwt.sign(tokenvalue, process.env.JWT_SECRET);
    res.header('auth-token', token)
    res.status(200).json(user)
}


module.exports.get_all_details = async (req, res) => {

    console.log("Search value", req.query.search)

    try {
        const user = await User.find()
            .populate("category")

        res.status(200).json(user);
    } catch (err) {
        res.status(400).json(err)
    }

}


module.exports.delete_item = async (req, res) => {
    const id = req.params.id;
    try {
        const user = await User.deleteOne({ _id: id });
        res.status(200).json(user);
    } catch (err) {
        res.status(400).json(err)
    }
}



module.exports.user_item = async (req, res) => {
    const id = req.params.id;
    console.log("it is id",id)
    try {
        const user = await User.findById(id)
            .populate("category")
        res.status(200).json(user);
    } catch (err) {
        res.status(400).json(err)
    }
}

module.exports.update_item = async (req, res) => {

    try {
        console.log("happening..")
        const upateUser = await User.updateOne({ _id: req.params.id }, { $set: { email: req.body.email, password: req.body.password } })
        console.log(updateUser)
    } catch (err) {
        console.log("happening.. error")
        res.status(400).send(err)
        console.log(err)
    }
}
module.exports.userupdate_item = async (req, res) => {
    console.log(req.body.email)
    console.log(req.params.id)
    console.log(req.body.category)
    try {
        const upateUser = await User.updateOne({ _id: req.params.id }, { $set: { email: req.body.email, fullname: req.body.fullname, category: req.body.category } })
            .populate("category")
        console.log(upateUser)
        const user = await User.findById({ _id: req.params.id })
            .populate("category")
        res.status(200).json({ user })
    } catch (err) {
        console.log(err)
        res.status(400).send({ err })
    }
}
module.exports.filter_data = async (req, res) => {
    try {
        const user = await User.find({ category: req.params.category })
            .populate("category")
        res.status(200).json(user)
    } catch (err) {
    }

}









function escapeRegex(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};
module.exports.search_Result = async (req, res) => {
    const pal = req.params.search;
    console.log("pal", pal.length)
    console.log(req.params.search);
    if (req.params.search) {
        const regex = new RegExp(escapeRegex(req.params.search), 'gi');
        console.log("regular expression", regex)
        User.find({ fullname: regex })
            .populate("category")
            .then(result => {
                console.log(result)
                res.send(result)
            })
    } else {
        const user = User.find().populate("category")
        res.status(200).json(user);
        console.log("other way around")
    }
}

