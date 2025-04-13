import Job from '../models/job.model.js';
import mongoose from 'mongoose';

// Create a new job by admin
export const postJob = async (req, res) => {
    console.log("Job Register");
    try {
        const { title, description, companyId, location, salary, jobType, experience, skillsRequired, position } = req.body;
        const userId = req.id;

        // Validate required fields
        if (!title || !description || !companyId || !location || !salary || !jobType || !experience || !Array.isArray(skillsRequired) || !skillsRequired.length || !position) {
            return res.status(400).json({
                message: "Please fill all required fields.",
                success: false,
            });
        }

        // Create new job
        const newJob = await Job.create({
            title,
            description,
            location,
            salary: Number(salary),
            experienceLevel: experience,
            jobType,
            company: companyId,
            skillsRequired,
            position,
            created_by: userId,
        });

        return res.status(201).json({
            message: "Job created successfully.",
            job: newJob,
            success: true,
        });
    } catch (error) {
        console.error("Error creating job:", error);

        if (error.name === 'ValidationError') {
            return res.status(400).json({
                message: error.message,
                success: false,
            });
        }
        return res.status(500).json({
            message: "Internal Server Error",
            success: false,
        });
    }
};


// Get all jobs for students or job seekers
export const getAllJobs = async (req, res) => {
    try {
        const keyword = req.query.keyword || "";
        const query = {
            $or: [
                { title: { $regex: keyword, $options: "i" } },
                { description: { $regex: keyword, $options: "i" } },
            ]
        };

        // Fetch jobs with populated 'company' field
        const jobs = await Job.find(query).populate({
            path: "company"
        }).sort({ createdAt: -1 });

        return res.status(200).json({
            jobs,
            success: true,
        });
    } catch (error) {
        console.error("Error retrieving jobs:", error); 
        return res.status(500).json({
            message: "Internal Server Error",
            success: false,
            error: error.message 
        });
    }

};


export const getJobById = async (req, res) => {
    try {
        const jobId = req.params.id;

        const job = await Job.findById(jobId).populate({
            path: 'applications'

        });

        if (!mongoose.Types.ObjectId.isValid(jobId)) {
            return res.status(400).json({
                message: "Invalid Job ID.",
                success: false,
            });
        }

       

        if (!job) {
            return res.status(404).json({
                message: "Job not found.",
                success: false,
            });
        }

        return res.status(200).json({
            job,
            success: true,
        });
    } catch (error) {
        console.error("Error retrieving job:", error.message);
        return res.status(500).json({
            message: "Internal Server Error",
            success: false,
        });
    }
};

export const updateJob = async (req, res) => {
    try {
        const jobId = req.params.id;
        const updatedFields = req.body;

        const updatedJob = await Job.findByIdAndUpdate(jobId, updatedFields, { new: true });

        if (!updatedJob) {
            return res.status(404).json({
                message: "Job not found.",
                success: false,
            });
        }

        return res.status(200).json({
            message: "Job updated successfully.",
            job: updatedJob,
            success: true,
        });
    } catch (error) {
        console.error("Error updating job:", error);
        return res.status(500).json({
            message: "Internal Server Error",
            success: false,
        });
    }
};

// Get jobs created by the admin
export const getAdminJobs = async (req, res) => {
    try {
        const adminId = req.id; 
        const jobs = await Job.find({ created_by: adminId }).populate('company', 'name industry');

        if (!jobs.length) {
            return res.status(404).json({
                message: "No jobs found for this admin.",
                success: false,
            });
        }

        return res.status(200).json({
            message: "Jobs retrieved successfully.",
            jobs,
            success: true,
        });
    } catch (error) {
        console.error("Error retrieving admin jobs:", error);
        return res.status(500).json({
            message: "Internal Server Error",
            success: false,
        });
    }
};


// Delete a job
export const deleteJob = async (req, res) => {
    try {
        const jobId = req.params.id;
        const job = await Job.findByIdAndDelete(jobId);

        if (!job) {
            return res.status(404).json({
                message: "Job not found.",
                success: false,
            });
        }

        return res.status(200).json({
            message: "Job deleted successfully.",
            success: true,
        });
    } catch (error) {
        console.error("Error deleting job:", error);
        return res.status(500).json({
            message: "Internal Server Error",
            success: false,
        });
    }
};
