import axios from 'axios';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setAllJobs } from '../redux/jobSlice';
import { JOB_API_END_POINT } from '../utils/constant';

// Make sure axios sends cookies (tokens) with each request
axios.defaults.withCredentials = true;

function useGetAllJobs() {
    const dispatch = useDispatch();
    const { searchQuery } = useSelector(store => store.job);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchAllJobs = async () => {
            setLoading(true);
            setError(null);

            try {
                const res = await axios.get(
                    `${JOB_API_END_POINT}/get?keyword=${searchQuery || ''}`,
                    {
                        withCredentials: true, // required to send cookies
                    }
                );

                if (res.data.success) {
                    dispatch(setAllJobs(res.data.jobs));
                } else {
                    setError("Failed to fetch jobs");
                    console.warn("API response did not return success:", res.data);
                }
            } catch (err) {
                console.error('Error fetching jobs:', err);
                setError(err.response?.data?.message || err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchAllJobs();
    }, [dispatch, searchQuery]);

    return { loading, error };
}

export default useGetAllJobs;
