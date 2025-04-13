import Company from "../models/company.model.js";
import getDataUri from "../utils/datauri.js";
import cloudinary from "../utils/cloudnary.js";

export const registerCompany = async (req, res) => {
    try {
        const { companyName, website } = req.body;
        if (!companyName || !website) {
            return res.status(400).json({
                message: "Please fill all the details: Company name and website are required.",
                success: false,
            });
        }

        if (!companyName) {
            return res.status(400).json({
                message: "Company name is required.",
                success: false,
            });
        }
       
        if (!req.id) {
            return res.status(400).json({
                message: "User ID is required.",
                success: false,
            });
        }

        // Using 'existingCompany' to avoid variable name conflict
        let existingCompany = await Company.findOne({ name: companyName });
        if (existingCompany) {
            return res.status(400).json({
                message: "You can't register the same company.",
                success: false,
            });
        }

        // Creating a new company
        const newCompany = await Company.create({
            name: companyName,
            userId: req.id,  
            ...(website !== undefined && website !== null ? { website } : {}),
        });

        return res.status(201).json({
            message: "Company registered successfully.",
            company: newCompany,
            success: true,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal Server Error",
            success: false,
        });
    }
};

export const getCompany = async (req, res) => {
    try {
        const userId = req.id;

        if (!userId) {
            return res.status(400).json({
                message: "User ID is required.",
                success: false,
            });
        }
        const companies = await Company.find({ userId });

        if (!companies.length) { 
            return res.status(404).json({
                message: "No companies found.",
                success: false,
            });
        }

        if (!companies) {
            return res.status(404).json({
                message: "Companies not found.",
                success: false,
            });
        }

        return res.status(200).json({
            companies,
            success: true,
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal Server Error",
            success: false,
        });
    }
};


export const getCompanyById = async (req, res) => {
    try {
        const companyId = req.params.id;
        const company = await Company.findById(companyId);

        if (!company) {
            return res.status(404).json({
                message: "Company not found.",
                success: false,
            });
        }

        return res.status(200).json({
            company,
            success: true,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal Server Error",
            success: false,
        });
    }
};

export const updateCompany = async (req, res) => {
    try {
        const { name, description, website, location } = req.body;
        const file = req.file; // Check if a file is provided



        // Check if there's a file for upload
        const fileUri = getDataUri(file);
        const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
        const logo = cloudResponse.secure_url; // Add logo to update data



        
        const updateData = { name, description, website, location, logo };



        const company = await Company.findByIdAndUpdate(req.params.id, updateData, { new: true });

        if (!company) {
            return res.status(404).json({
                message: "Company not found.",
                success: false,
            });
        }

        return res.status(200).json({
            message: "Company information updated.",
            company,
            success: true,
        });
    } catch (error) {
        console.log("error", error.message);
        return res.status(500).json({
            message: "Internal Server Error",
            success: false,
        });
    }
};
