import express from 'express';
import {
    postJob,
    getAllJobs,
    getJobById,
    updateJob,
    getAdminJobs,
    deleteJob,
} from '../controller/job.controller.js';
import isAuthenticated from '../middlewares/isAuthenticated.js'; // Assuming middleware for authentication

const router = express.Router();

router.route("/post").post(isAuthenticated, postJob);
router.route("/get").get(isAuthenticated,getAllJobs);
router.route("/adminJob").get(isAuthenticated, getAdminJobs);
router.route("/get/:id").get(isAuthenticated, getJobById);
router.route("/update/:id").put(isAuthenticated, updateJob);
router.route("/delete/:id").delete(isAuthenticated, deleteJob);

export default router;
