//Login for employee and admin
//POST /api/auth/login
import bcrypt from "bcrypt"
import User from "../models/User.js"
import jwt from 'jsonwebtoken'
export const login = async (req, res) => {
    try {
        const { email, password, role_type } = req.body
        if (!email || !password) {
            return res.status(400).json({ error: "Email and password are required" })
        }
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(401).json({ error: "Invalid Credantials" })
        }
        if (role_type === "admin" && user.role !== "ADMIN") {
            return res.status(401).json({ error: "Not authorized as admin" })
        }
        if (role_type === "employee" && user.role !== "EMPLOYEE") {
            return res.status(401).json({ error: "Not authorized as employee" });
        }

        const isValid = await bcrypt.compare(password, user.password)//compare is use to check whether 
        //save password is correct or not from data base.
        if (!isValid) {
            return res.status(401).json({ error: "Invalid Password" })
        }

        const payload = {
            userId: user._id.toString(),
            role: user.role,
            email: user.email,

        }
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "7d" })
        return res.json({ user: payload, token });
    }

    catch (error) {
        console.error("Login error:", error)
        res.status(500).json({ error: "Login failed" })
    }
}

//Get session for employee and admin

//GET/api/auth/session
export const session = async (req, res) => {
    const session = req.session;
    return res.json({
        user: session
    })
}


//Change password for employee and admin
//POST/api/auth/change-password
export const changePassword = async (req, res) => {
    try {
        console.log("BODY:", req.body);
        console.log("SESSION:", req.session);

        const session = req.session;
        const { currentPassword, newPassword } = req.body;

        const user = await User.findById(session.userId);
        console.log("USER:", user);

        const isValid = await bcrypt.compare(
            currentPassword,
            user.password
        );

        console.log("PASSWORD MATCH:", isValid);

        const hashed = await bcrypt.hash(newPassword, 10);

        await User.findByIdAndUpdate(
            session.userId,
            { password: hashed }
        );

        return res.json({ success: true });

    } catch (error) {
        console.error("CHANGE PASSWORD ERROR:", error);
        return res.status(500).json({
            error: error.message
        });
    }
};
