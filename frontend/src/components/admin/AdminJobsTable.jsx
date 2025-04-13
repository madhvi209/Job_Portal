import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Avatar, AvatarImage } from '../ui/avatar';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Edit2, Eye, MoreHorizontal } from 'lucide-react';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useGetAllAdminJobs from '../../hooks/useGetAllAdminJobs';

const AdminJobsTable = () => {
    
    useGetAllAdminJobs();
    const { allAdminJobs = [], searchJobByText, loading, error } = useSelector(store => store.job);
    const [filterJobs, setFilterJobs] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        // Filter based on search text and store it in filterJobs
        const filteredJobs = allAdminJobs.filter(job =>
            !searchJobByText || job?.title?.toLowerCase().includes(searchJobByText.toLowerCase())
        );
        setFilterJobs(filteredJobs);
    }, [allAdminJobs, searchJobByText]);

    // Handle loading state
    if (loading) {
        return <div className="text-center">Loading...</div>;
    }

    // Handle error state
    if (error) {
        return <div className="text-center text-red-600">{error}</div>;
    }

    return (
        <div>
            <Table>
                <TableCaption>A list of recent posted job openings.</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Logo</TableHead>
                        <TableHead>Job Title</TableHead>
                        <TableHead>Company</TableHead>
                        <TableHead>Posted Date</TableHead>
                        <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {filterJobs.length === 0 ? (
                        <TableRow>
                            <TableCell colSpan={5} className="text-center">No job postings available</TableCell>
                        </TableRow>
                    ) : (
                        filterJobs.map((job) => (
                            <TableRow key={job._id}>
                                <TableCell>
                                    <Avatar className="h-16 w-16">
                                        <AvatarImage
                                            src={job?.Company?.logo ||"https://static.vecteezy.com/system/resources/previews/000/390/524/original/modern-company-logo-design-vector.jpg"}
                                            alt="Company Logo"
                                        />
                                    </Avatar>
                                </TableCell>
                                <TableCell>{job.title}</TableCell>
                                <TableCell>{job.company?.name || 'Company Name Not Available'}</TableCell>

                                <TableCell>{job.createdAt ? new Date(job.createdAt).toLocaleDateString() : 'N/A'}</TableCell>
                                <TableCell className="text-right">
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <button aria-label="More options">
                                                <MoreHorizontal />
                                            </button>
                                        </PopoverTrigger>
                                        <PopoverContent>
                                            <div onClick={() => navigate(`/admin/jobs/${job._id}`)} className="flex items-center cursor-pointer">
                                                <Edit2 className="mr-2" aria-label="Edit" />
                                                <span>Edit</span>
                                            </div>
                                            <div onClick={()=>navigate(`/admin/jobs/${job._id}/applicants`)} className='flex items-center w-fit gap-2 cursor-pointer mt-2'>
                                                <Eye className='w-4'/>
                                                <span>Applicants</span>
                                            </div>
                                        </PopoverContent>
                                    </Popover>
                                </TableCell>
                            </TableRow>
                        ))
                    )}
                </TableBody>
            </Table>
        </div>
    );
};

export default AdminJobsTable;
