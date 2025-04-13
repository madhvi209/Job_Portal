/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react';
import Navbar from './shared/Navbar';
import Job from './Job.jsx'; // Assuming you have a Job component
import { useDispatch, useSelector } from 'react-redux';
import useGetAllJobs from '../hooks/useGetAllJobs';
import { setSearchQuery } from '../redux/jobSlice';

const Browse = () => {
    useGetAllJobs();
    const { allJobs } = useSelector((store) => store.job);
    const dispatch = useDispatch();
    useEffect(()=>{
        return()=>{
            dispatch(setSearchQuery(""))
        }
    })


    return (
        <div>
            <Navbar />
            <div className="max-w-7xl mx-auto my-10">
                <h1 className="font-bold text-xl my-10">Search Results: {allJobs.length}</h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 mt-5">
                    {allJobs.length > 0 ? (
                        allJobs.map((job) => (
                            <Job key={job._id} job={job} />
                        ))
                    ) : (
                        <div className="col-span-full text-center text-gray-600">
                            No jobs found. Please try searching for something else.
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Browse;
