/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { JOB_API_END_POINT, APPLICATION_API_END_POINT } from '../utils/constant';
import { setSingleJob } from '../redux/jobSlice';
import { useParams } from 'react-router-dom';
import { toast } from 'sonner';

const JobDescription = () => {
    const dispatch = useDispatch();
    const params = useParams();
    const jobId = params.id;

    const { singleJob: job } = useSelector(store => store.job); // renamed here
    const { user } = useSelector(store => store.auth);

    const hasApplied = job?.applications?.some(application => application.applicant === user?._id) || false;
    const [isApplied, setIsApplied] = useState(hasApplied);

    const applyJobHandler = async () => {
        try {
            const res = await axios.get(`${APPLICATION_API_END_POINT}/apply/${jobId}`, { withCredentials: true });
            if (res.data.success) {
                setIsApplied(true);
                const updatedJob = {
                    ...job,
                    applications: [...(job.applications || []), { applicant: user?._id }],
                };
                dispatch(setSingleJob(updatedJob));
                toast.success(res.data.message);
            }
        } catch (error) {
            console.error(error);
            toast.error(error.response?.data?.message || 'An error occurred');
        }
    };

    useEffect(() => {
        const fetchJob = async () => {
            try {
                const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`, { withCredentials: true });
                console.log("Job fetched from API:", res.data); 
                if (res.data.success) {
                    dispatch(setSingleJob(res.data.job));
                    setIsApplied(res.data.job.applications?.some(application => application.applicant === user?._id));
                }
            } catch (error) {
                console.error('Error fetching job details:', error);
            }
        };

        fetchJob();
    }, [jobId, dispatch, user?._id]);

    // Optional: show loading or error state
    if (!job) return <div className="text-center mt-10 text-gray-500">Loading job details...</div>;

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
            <h2 className="text-3xl font-semibold text-purple-800 mb-4">
                {job?.title || 'Job Title Not Available'}
            </h2>

            <div className="text-lg text-gray-700 mb-4">
                <p className="mb-4">{job?.description || 'Job description not available.'}</p>

                <h3 className="text-xl font-semibold text-purple-800 mb-2 mt-4">Skills Required</h3>
                <ul className="list-disc pl-5 space-y-2">
                    {job?.skillsRequired?.length > 0 ? (
                        job.skillsRequired.map((skill, index) => (
                            <li key={index}>{skill}</li>
                        ))
                    ) : (
                        <>
                            <li>Experience with React.js, JavaScript, and CSS</li>
                            <li>Familiarity with version control systems (Git)</li>
                            <li>Strong problem-solving skills</li>
                            <li>Excellent communication and teamwork skills</li>
                        </>
                    )}
                </ul>

                <h3 className="text-xl font-semibold text-purple-800 mb-2 mt-4">Location</h3>
                <p>{job?.location || 'Location not specified'}</p>
            </div>

            <div className="flex flex-wrap gap-4">
                <Badge className="text-red-700 font-bold" variant="ghost">
                    {job?.position || 'Position not specified'}
                </Badge>
                <Badge className="text-green-700 font-bold" variant="ghost">
                    {job?.jobType || 'Job type not specified'}
                </Badge>
                <Badge className="text-purple-700 font-bold" variant="ghost">
                    {job?.salary ? `${job.salary} LPA` : 'Salary not specified'}
                </Badge>
            </div>

            <div className="mt-6 flex justify-between items-center">
                <Button
                    onClick={isApplied ? null : applyJobHandler}
                    disabled={isApplied}
                    className={`px-6 py-2 rounded-full transition duration-200 ${isApplied ? 'bg-purple-200 text-gray-500' : 'bg-[#8432a2] text-white hover:bg-[#6f2498]'}`}
                >
                    {isApplied ? 'Already Applied' : 'Apply Now'}
                </Button>

                <h1>
                    Posted Date: <span>{job?.createdAt?.split('T')[0]}</span>
                </h1>
            </div>
        </div>
    );
};

export default JobDescription;
