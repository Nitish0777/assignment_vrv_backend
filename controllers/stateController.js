const User = require('../models/user');

module.exports.active = async (req, res) => {
    try {
        const updateUser = await User.updateOne({ _id: req.params.id }, { $set: { active: true } })
        res.status(200).json(updateUser)
    } catch (err) {
        res.send(err)
    }

}


module.exports.deactive = async (req, res) => {
    try {
        const updateUser = await User.updateOne({ _id: req.params.id }, { $set: { active: false } })
        res.status(200).json(updateUser)
    } catch (err) {
        res.send(err)
    }
}
