const crypto = require('crypto'); 
const User = require('../models/user');
const nodemailer = require('nodemailer');

// Nodemailer Transporter
const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASS,
    },
});

module.exports.forgot_password = async (req, res) => {
    try {
        const email = req.body.email;
        console.log("Email ID:", email);

        // Generate reset token
        const buffer = crypto.randomBytes(32);
        const token = buffer.toString("hex");

        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(422).json({ error: "User does not exist with that email." });
        }

        if (user.active === false) {
            return res.status(422).json({ error: "User not active." });
        }

        // Set reset token and expiry
        user.resetToken = token;
        user.expireToken = Date.now() + 3600000; // 1 hour
        await user.save();

        // Send reset email
        await transporter.sendMail({
            to: user.email,
            from: process.env.EMAIL,
            subject: "Reset Password",
            html: `
                <p>Click the link below to reset your password:</p>
                <p><strong>Link will expire in 1 hour.</strong></p>
                <a href="${process.env.FRONTEND_URL}/set-password/${token}">Reset Password</a>
            `,
        });

        return res.status(200).json({ message: "Check your email for the reset link." });
    } catch (error) {
        console.error("Error in forgot_password:", error);
        res.status(500).json({ error: "An error occurred. Please try again later." });
    }
};
