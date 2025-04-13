import mongoose from 'mongoose';
import Application from '../models/application.model.js'; // Single import of Application
import Job from '../models/job.model.js';

// Apply for a job
export const applyJob = async (req, res) => {
    try {
        const jobId = req.params.id;
        const userId = req.id;

        if (!jobId) {
            return res.status(400).json({ message: "Job ID is required.", success: false });
        }

        if (!mongoose.Types.ObjectId.isValid(jobId)) {
            return res.status(400).json({ message: "Invalid Job ID.", success: false });
        }

        const existingApplication = await Application.findOne({ job: jobId, applicant: userId });
        if (existingApplication) {
            return res.status(201).json({ message: "You have already applied for this job.", success: false });
        }

        const job = await Job.findById(jobId);
        if (!job) {
            return res.status(404).json({ message: "Job not found.", success: false });
        }

        const newApplication = await Application.create({
            job: jobId,
            applicant: userId,
            status: 'Applied',
        });

        job.applications.push(newApplication._id);
        await job.save();

        return res.status(201).json({ message: "Application submitted successfully.", application: newApplication, success: true });
    } catch (error) {
        console.error("Error applying for job:", error.message);
        return res.status(500).json({ message: "Internal Server Error", success: false });
    }
};


// Get a specific application by ID
export const getApplicationById = async (req, res) => {
    try {
        const applicationId = req.params.id;

        // Validate ObjectId
        if (!mongoose.Types.ObjectId.isValid(applicationId)) {
            return res.status(400).json({ message: "Invalid Application ID.", success: false });
        }

        // Fetch the application with populated fields
        const application = await Application.findById(applicationId)
            .populate('job', 'title location')
            .populate('applicant', 'name');

        // Log the retrieved application
        console.log("Retrieved application:", application);

        if (!application) {
            return res.status(404).json({ message: "Application not found.", success: false });
        }

        return res.status(200).json({ application, success: true });
    } catch (error) {
        console.error("Error retrieving application:", error.message);
        return res.status(500).json({ message: "Internal Server Error", success: false });
    }
};


// Get all applicants for a specific job
export const getApplicants = async (req, res) => {
    try {
        const jobId = req.params.id;

        // Check if the job exists
        const job = await Job.findById(jobId);
        if (!job) {
            return res.status(404).json({ message: "Job not found.", success: false });
        }

        // Populate the applications
        const populatedJob = await Job.findById(jobId).populate({
            path: 'applications',
            populate: { path: 'applicant', select: 'name' }
        });

        // Check if applications are populated correctly
        if (!populatedJob.applications || populatedJob.applications.length === 0) {
            return res.status(404).json({ message: "No applications found for this job.", success: false });
        }

        return res.status(200).json({ applicants: populatedJob.applications,job, success: true });
    } catch (error) {
        console.error("Error retrieving applicants:", error.message);
        return res.status(500).json({ message: "Internal Server Error", success: false });
    }
};



export const getAppliedJobs = async (req, res) => {
    try {
        const userId = req.id;

        // Retrieve applications for the user
        const applications = await Application.find({ applicant: userId })
            .sort({ createdAt: -1 })
            .populate({
                path: 'job',
                select: 'title location', 
                populate: {
                    path: 'company', 
                    select: 'name', 
                }
            });
    

        if (!applications || applications.length === 0) {
            return res.status(404).json({
                message: "No applications found for this user.",
                success: false,
            });
        }

        return res.status(200).json({
            applications,
            success: true,
        });
    } catch (error) {
        console.error("Error retrieving applications:", error.message);
        return res.status(500).json({
            message: "Internal Server Error",
            success: false,
        });
    }
};


export const updateStatus = async (req, res) => {
    try {
        console.log("Incoming request body:", req.body); 
        const { status } = req.body;
        const applicationId = req.params.id;

        // Check if the application exists
        const application = await Application.findOne({ _id: applicationId });
        if (!application) {
            return res.status(404).json({ message: "Application not found.", success: false });
        }

        // Check if status is defined and valid
        if (!status || typeof status !== 'string') {
            return res.status(400).json({ message: "Invalid or missing status. It must be a string.", success: false });
        }

        // Validate status
        const validStatuses = ['pending', 'accepted', 'rejected', 'applied'];
        if (!validStatuses.includes(status.toLowerCase())) {
            return res.status(400).json({ message: `Invalid status. Must be one of: ${validStatuses.join(', ')}`, success: false });
        }

        // Update the status
        application.status = status.toLowerCase();
        const updatedApplication = await application.save();

        return res.status(200).json({ message: "Status updated successfully.", application: updatedApplication, success: true });
    } catch (error) {
        console.error("Error updating status:", error.message);
        return res.status(500).json({ message: "Internal Server Error", success: false });
    }
};



