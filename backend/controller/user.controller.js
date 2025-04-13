import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import getDataUri from '../utils/datauri.js';
import cloudinary from '../utils/cloudnary.js';

export const register = async (req, res) => {
    try {
        const { fullName, email, phoneNumber, password, role } = req.body;

        if (!fullName || !email || !phoneNumber || !password || !role) {
            return res.status(400).json({
                message: "All fields are required",
                success: false,
            });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                message: "User already exists with this email.",
                success: false,
            });
        }

        let fileUrl = "";

        if (req.file) {
            const fileUri = getDataUri(req.file);
            const myCloud = await cloudinary.uploader.upload(fileUri.content);
            fileUrl = myCloud.secure_url;
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await User.create({
            fullName,
            email,
            phoneNumber,
            password: hashedPassword,
            role,
            profile: {
                avatar: fileUrl || null,
                bio: "",
                skills: [],
            },
            resumeUrl: "",
        });

        return res.status(201).json({
            message: "Account created successfully",
            success: true,
            user: {
                id: newUser._id,
                fullName: newUser.fullName,
                email: newUser.email,
                phoneNumber: newUser.phoneNumber,
                role: newUser.role,
                profile: newUser.profile,
            },
        });

    } catch (error) {
        console.error("[REGISTER_ERROR]", error);
        return res.status(500).json({
            message: "Internal Server Error",
            success: false,
        });
    }
};

export const login = async (req, res) => {
    try {
        const { email, password, role } = req.body;
        if (!email || !password || !role) {
            return res.status(400).json({
                message: "Please fill all the details.",
                success: false
            });
        }
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                message: "Incorrect email or password.",
                success: false
            });
        }

        if (role !== user.role) {
            return res.status(400).json({
                message: "Account doesn't exist with current role.",
                success: false
            });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(400).json({
                message: "Incorrect email or password.",
                success: false
            });
        }

        const tokenData = { id: user._id };
        const token = jwt.sign(tokenData, process.env.SECRET_KEY, { expiresIn: '1d' });

        return res.status(200).cookie("token", token, {
            maxAge: 1 * 24 * 60 * 60 * 1000,
            httpOnly: true,
            sameSite: 'strict'
        }).json({
            message: `Welcome back ${user.fullName}`,
            user,
            success: true
        });
    } catch (error) {
        console.error("Error during login:", error);
        return res.status(500).json({
            message: "Internal Server Error",
            success: false
        });
    }
};

export const logout = async (req, res) => {
    try {
        return res.status(200).cookie("token", "", { maxAge: 0 }).json({
            message: "Logged out successfully.",
            success: true
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal Server Error",
            success: false
        });
    }
};

export const updateProfile = async (req, res) => {
    try {
        const { fullName, email, phoneNumber, bio, skills } = req.body;

        const userId = req.user.id;
        let user = await User.findById(userId);

        if (!user) {
            return res.status(400).json({
                message: "User not found.",
                success: false
            });
        }

        if (fullName) user.fullName = fullName;
        if (email) user.email = email;
        if (phoneNumber) user.phoneNumber = phoneNumber;
        if (bio) user.profile.bio = bio;
        if (skills) {
            const skillsArray = skills.split(",").map(skill => skill.trim());
            user.profile.skills = skillsArray;
        }


        if (req.file) {
            const fileUri = getDataUri(req.file);
            const myCloud = await cloudinary.uploader.upload(fileUri.content, {
                resource_type: "raw",
                folder: "file"
            });
            user.resumeUrl = myCloud.secure_url;
        }

        await user.save();

        return res.status(200).json({
            message: "Profile updated successfully.",
            success: true,
            user
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Internal Server Error",
            success: false
        });
    }
};
