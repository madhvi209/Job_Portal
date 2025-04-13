import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { applyJob, getApplicants, getApplicationById, getAppliedJobs, updateStatus } from "../controller/application.controller.js";



const router = express.Router();

router.route("/apply/:id").get(isAuthenticated, applyJob);
router.route("/get").get(isAuthenticated, getAppliedJobs);
router.route("/:id/getApplicants").get(isAuthenticated, getApplicationById);
router.route("/applicants/:id").get(isAuthenticated, getApplicants);
router.route("/status/update/:id").put(isAuthenticated, updateStatus);


export default router;