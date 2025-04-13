import React, { useEffect, useState } from 'react';
import Navbar from './shared/Navbar';
import FilterCard from './FilterCard';
import Job from './Job.jsx';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';

const Jobs = () => {
    const { allJobs, searchQuery, filters } = useSelector((store) => store.job);
    const [filterJobs, setFilterJobs] = useState(allJobs);

    useEffect(() => {
        const filteredJobs = allJobs.filter((job) => {
            const matchesSearchQuery = job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                job.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                job.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
                job.salary?.toString().includes(searchQuery);

            // Check for location filter match
            const matchesLocation = filters.location ? job.location === filters.location : false;

            // Check for industry filter match
            const matchesIndustry = filters.industry ? job.industry === filters.industry : false;

            // Check for salary filter match (assuming salary is an array of [min, max])
            const matchesSalary = (filters.salary[0] && filters.salary[1]) ?
                (job.salary >= filters.salary[0] && job.salary <= filters.salary[1]) :
                false;

            // Check for jobType filter match
            const matchesJobType = filters.jobType ? job.jobType === filters.jobType : false;

            // Return true if any of the conditions are matched
            return matchesSearchQuery || matchesLocation || matchesIndustry || matchesSalary || matchesJobType;
        });

        setFilterJobs(filteredJobs);
    }, [allJobs, searchQuery, filters]); // Re-run filtering when allJobs, searchQuery, or filters change

    return (
        <div>
            <Navbar />
            <div className="container mx-auto py-8">
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Filter section */}
                    <div className="w-full lg:w-1/3">
                        <FilterCard />
                    </div>

                    {/* Job listings section */}
                    <div className="w-full lg:w-2/3">
                        <h2 className="text-2xl font-semibold mb-6">Job Listings</h2>
                        <div className="h-[88vh] overflow-y-auto pb-5">
                            {filterJobs.length === 0 ? (
                                <span>No jobs found</span>
                            ) : (
                                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
                                    {filterJobs.map((job) => (
                                        <motion.div
                                            key={job?._id} // Correct placement of `key`
                                            initial={{ opacity: 0, x: 100 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: -100 }}
                                            transition={{ duration: 0.3 }}
                                        >
                                            <Job job={job} />
                                        </motion.div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Jobs;
