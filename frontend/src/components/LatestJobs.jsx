/* eslint-disable no-unused-vars */
import React from 'react';
import { useSelector } from 'react-redux';
import useGetAllJobs from '../hooks/useGetAllJobs';
import { useNavigate } from 'react-router-dom';

const LatestJobs = () => {
    // Fetch jobs when the component mounts
    useGetAllJobs();
    const navigate = useNavigate();

    // Extract job data from the Redux store
    const { allJobs } = useSelector((store) => store.job || { allJobs: [] });

    return (
        <div className="py-10 bg-gray-50">
            <h1 className='text-4xl font-bold text-center mb-8'>
                <span className='text-[#8432a2]'>Latest & Top</span> Job Openings
            </h1>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mx-8">
                {allJobs.length > 0 ? (
                    allJobs.slice(0, 6).map((job) => (
                        <div key={job?._id} className="bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition-shadow">
                            <h2 className="text-xl font-semibold text-purple-700">{job?.title}</h2>
                            <p className="text-gray-700 mt-2">{job?.company?.name || "Company not available"}</p>
                            <p className="text-gray-500">{job?.location || "Location not available"}</p>
                            <p className="text-gray-900 font-medium mt-2">{job?.salary?.toString() || "Salary not provided"}</p>
                            <p className="text-green-500 font-semibold">{job?.type || "Job type not specified"}</p>
                            <button onClick={()=> navigate(`/description/${job._id}`)} className="mt-4 px-4 py-2 bg-purple-700 text-white rounded-md hover:bg-purple-900">
                                Apply Now
                            </button>
                        </div>
                    ))
                ) : (
                    <p>No jobs available at the moment.</p>
                )}
            </div>
        </div>
    );
};

export default LatestJobs;
