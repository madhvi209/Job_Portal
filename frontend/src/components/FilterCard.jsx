import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setFilters } from '../redux/jobSlice';
import { Label } from '../components/ui/label';
import { RadioGroup, RadioGroupItem } from '../components/ui/radio-group';

const FilterCard = () => {
    const [location, setLocation] = useState('');
    const [industry, setIndustry] = useState('');
    const [salary, setSalary] = useState([1000, 20000]);
    const [jobType, setJobType] = useState('');

    const dispatch = useDispatch();

    // Apply filters handler
    const applyFiltersHandler = () => {
        const filterData = {
            location,
            industry,
            salary,
            jobType,
        };
        dispatch(setFilters(filterData)); // Dispatching filter data to Redux
    };
    const appliedFilters = useSelector((state) => state.job.filters);


    return (
        <div className="bg-white shadow-md p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-4">Filter Jobs</h3>

            <div className="mb-4">
                <h4 className="text-lg font-semibold mb-2">Applied Filters</h4>
                <div className="flex flex-wrap gap-2">
                    {appliedFilters.location && (
                        <div className="badge badge-info">{appliedFilters.location}</div>
                    )}
                    {appliedFilters.industry && (
                        <div className="badge badge-info">{appliedFilters.industry}</div>
                    )}
                    {appliedFilters.salary && (
                        <div className="badge badge-info">
                            {appliedFilters.salary[0]} to {appliedFilters.salary[1]} LPA
                        </div>
                    )}
                    {appliedFilters.jobType && (
                        <div className="badge badge-info">{appliedFilters.jobType}</div>
                    )}
                </div>
            </div>

            {/* Location Filter */}
            <div className="mb-4">
                <label className="block text-gray-700 mb-2">Location</label>
                <select
                    className="w-full p-2 border border-gray-300 rounded-md"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                >
                    <option value="">Select Location</option>
                    <option value="Noida">Noida</option>
                    <option value="Bangalore">Bangalore</option>
                    <option value="Mumbai">Mumbai</option>
                    <option value="Delhi">Delhi</option>
                </select>
            </div>

            {/* Industry Filter */}
            <div className="mb-4">
                <label className="block text-gray-700 mb-2">Industry</label>
                <select
                    className="w-full p-2 border border-gray-300 rounded-md"
                    value={industry}
                    onChange={(e) => setIndustry(e.target.value)}
                >
                    <option value="">Select Industry</option>
                    <option value="Frontend Developer">Frontend Developer</option>
                    <option value="Backend Developer">Backend Developer</option>
                    <option value="Fullstack Developer">Fullstack Developer</option>
                    <option value="Data Analyst">Data Analyst</option>
                </select>
            </div>

            {/* Salary Filter */}
            <div className="mb-4">
                <label className="block text-gray-700 mb-2">Salary (Range)</label>
                <div className="flex justify-between items-center space-x-2">
                    <input
                        type="number"
                        className="w-full p-2 border border-gray-300 rounded-md"
                        placeholder="Min Salary"
                        value={salary[0]}
                        onChange={(e) => setSalary([+e.target.value, salary[1]])}
                    />
                    <span className="mx-2">to</span>
                    <input
                        type="number"
                        className="w-full p-2 border border-gray-300 rounded-md"
                        placeholder="Max Salary"
                        value={salary[1]}
                        onChange={(e) => setSalary([salary[0], +e.target.value])}
                    />
                </div>
            </div>

            {/* Job Type Filter */}
            <div className="mb-4">
                <h3 className="font-bold text-lg mb-2">Job Type</h3>
                <RadioGroup
                    value={jobType}
                    onValueChange={setJobType}
                    className="space-y-2"
                >
                    {['Full-time', 'Part-time', 'Freelance'].map((type, index) => (
                        <div key={index} className="flex items-center space-x-2">
                            <RadioGroupItem
                                value={type}
                                id={`job-type-${index}`}
                                className="w-4 h-4 border border-gray-300 rounded-full checked:bg-purple-600"
                            />
                            <Label htmlFor={`job-type-${index}`} className="text-gray-700 cursor-pointer">
                                {type}
                            </Label>
                        </div>
                    ))}
                </RadioGroup>
            </div>

            <button
                onClick={applyFiltersHandler}
                className="w-full bg-purple-600 text-white py-2 rounded-md hover:bg-purple-800 transition"
            >
                Apply Filters
            </button>
        </div>
    );
};

export default FilterCard;
