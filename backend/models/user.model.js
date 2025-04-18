import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    fullName: { 
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true, 
        trim: true,    
    },
    phoneNumber: { 
        type: String, // Changed type to String to accommodate formatting (e.g., "+1234567890")
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ['student', 'recruiter'],
        required: true,
    },
    profile: {
        bio: { type: String },
        skills: [{ type: String }],
        resume: { type: String }, // URL to resume file
        resumeOriginalName: { type: String , default: "" },
        company: { type: mongoose.Schema.Types.ObjectId, ref: 'Company' }, // Ensure 'Company' model is defined
        profilePhoto: {
            type: String,
            default: "",
        },
    },
},
    { timestamps: true });

export const User = mongoose.model('User', userSchema);
