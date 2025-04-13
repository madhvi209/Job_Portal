import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { APPLICATION_API_END_POINT } from '../utils/constant.js';
import { setAllAppliedJobs } from '../redux/jobSlice.js';

const useGetAppliedJobs = (userId) => {
    const dispatch = useDispatch();
    const reduxAppliedJobs = useSelector((state) => state.job.allAppliedJobs); // ✅ used below

    useEffect(() => {
        const fetchAppliedJobs = async () => {
            if (!userId) return;
            try {
                const res = await axios.get(`${APPLICATION_API_END_POINT}/get`, {
                    withCredentials: true,
                });
                console.log("Fetched Applications:", res.data.applications);

                if (res.data.success) {
                    dispatch(setAllAppliedJobs(res.data.applications));
                }
            } catch (error) {
                console.error("Failed to fetch applied jobs:", error);
            }
        };

        fetchAppliedJobs();
    }, [dispatch, userId]);

    return reduxAppliedJobs;
};

export default useGetAppliedJobs;
