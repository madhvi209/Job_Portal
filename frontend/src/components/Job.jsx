/* eslint-disable no-unused-vars */
import React from 'react';
import { Button } from './ui/button';
import { Avatar, AvatarImage } from './ui/avatar';
import { Bookmark } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Badge } from './ui/badge';
import PropTypes from 'prop-types';

const Job = ({ job }) => {
    const navigate = useNavigate();

    const daysAgoFunction = (mongodbTime) =>{
        const createdAt = new Date(mongodbTime);
        const currentTime = new Date();
        const timeDifference = currentTime - createdAt;
        return Math.floor(timeDifference/ (1000*24*60*60));
    }

    return (
        <div className="bg-white p-5 shadow-md rounded-lg hover:shadow-lg transition-shadow duration-200">
            {/* Job Posted Time */}
            <p className="text-gray-400 text-sm">{daysAgoFunction(job?.createdAt)==0 ? "Today": `${daysAgoFunction(job?.createdAt)} days ago`}</p>

            {/* Bookmark Button */}
            <Button variant="outline" className="rounded-full">
                <Bookmark className="w-5 h-5 text-gray-600" />
            </Button>

            {/* Company Logo and Info */}
            <div className="flex items-center my-4">
                <Avatar className="h-16 w-16">
                    <AvatarImage
                        src={job?.company?.logo}
                        alt="Company Logo"
                    />


                </Avatar>
                <div className="ml-6">
                    <h1 className="text-lg font-semibold">{job?.company?.name}</h1>
                    <p className="text-gray-500">{job?.description}</p>
                </div>
            </div>

            {/* Job Details */}
            <div className="mb-4">
                <h2 className="text-xl font-bold text-gray-800">{job?.title}</h2>
                <Badge className="mr-2 bg-blue-600 hover:bg-red-600">{job?.location}</Badge>
                <Badge className="mr-2 bg-green-600 hover:bg-red-600">{job?.jobType}</Badge>
                <Badge className="font-semibold bg-yellow-600 hover:bg-red-600">{String(job?.salary)} LPA</Badge>
            </div>

            {/* Apply Now Button */}
            <div className="flex space-x-4">
                <Button
                    onClick={() => navigate(`/description/${job?._id}`)}
                    className="bg-purple-600 text-white hover:bg-purple-800 transition duration-200"
                >
                    Details
                </Button>
                <Button className="bg-purple-600 text-white hover:bg-purple-800 transition duration-200">
                    Save For Later
                </Button>
            </div>
        </div>
    );
};



Job.propTypes = {
    job: PropTypes.shape({
        _id: PropTypes.string.isRequired, // Assuming _id is required
        title: PropTypes.string.isRequired, // Assuming title is required
        description: PropTypes.string,
        location: PropTypes.string,
        jobType: PropTypes.string,
        salary: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number, // Accept number for salary
        ]), 
        company: PropTypes.shape({
            name: PropTypes.string,
            logo: PropTypes.oneOfType([
                PropTypes.string, // For image URL
                PropTypes.instanceOf(File), // For uploaded image file
            ]), // Add logo validation
        }),
        createdAt: PropTypes.string,
    }).isRequired, // Ensure job prop is passed in
};

export default Job;


