const User = require('../models/user');
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASS
    }
});

module.exports.forgot_password = async (req, res) => {
    console.log("Email id", req.body.email)

    crypto.randomBytes(32, (err, buffer) => {
        if (err) {
            console.log(err)
        }
        const token = buffer.toString("hex")
        User.findOne({ email: req.body.email })
            .then(user => {
                if(user.active===false)
                {
                    return res.status(422).json({error:"User not exist with that email..."})
                }
                if (!user) {
                    return res.status(422).json({ error: "User dont exist with that email" })
                }
                user.resetToken = token
                user.expireToken = Date.now() + 3600000
                user.save()
                    .then((result) => {
                        transporter.sendMail({
                            to: user.email,
                            from: process.env.EMAIL,
                            subject: "Reset Password",
                            html: `<p>Click the link below to Reset your password</p>
                    <span>Link will expire in 1 hour</span>
                    <a href="http://localhost:3000/set-password/${token}">Click<a/>`
                        })
                        res.json({ message: "Check your email" })
                    }).catch(err => res.status(400).send('Error'))
            })
    })


}