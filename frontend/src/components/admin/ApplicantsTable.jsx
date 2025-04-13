import axios from 'axios';
import { Popover, PopoverContent, PopoverTrigger } from '../../components/ui/popover';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/table';
import { MoreHorizontal } from 'lucide-react';
import { useSelector } from 'react-redux';
import { APPLICATION_API_END_POINT } from '../../utils/constant.js';
import { toast } from 'sonner';


const shortlistingStatus = ["Accepted", "Rejected"];

const ApplicantsTable = () => {
    const { applicants } = useSelector(store => store.application);

    if (!Array.isArray(applicants)) {
        return <div>Error: applicants data is not an array.</div>;
    }
    if (applicants.length === 0) {
        return <div>No applicants found.</div>;
    }

    const statusHandler= async(status, id) =>{
        try {
            axios.defaults.withCredentials =true;
            const res = await axios.post(`${APPLICATION_API_END_POINT}/status/update/${id}`,{status},{
                withCredentials: true
            });
            if(res.data.success){
                toast.success(res.data.message);
            }
        } catch (error) {
            toast.error(error.response.data.message);
        }
    }

    return (
        <div>
            <Table>
                <TableCaption>A list of your recent applied users</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Full Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Contact</TableHead>
                        <TableHead>Resume</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {/* Check if applicants array exists and is not empty */}
                    {applicants && applicants.length > 0 ? (
                        applicants.map((items) => (
                            <TableRow key={items._id}>
                                {/* Ensure applicant data is accessed correctly */}
                                <TableCell>{items?.applicant?.fullName || 'N/A'}</TableCell>
                                <TableCell>{items?.applicant?.email || 'N/A'}</TableCell>
                                <TableCell>{items?.applicant?.phoneNumber || 'N/A'}</TableCell>
                                <TableCell>
                                    {/* Display resume link if available */}
                                    <a href={items?.applicant?.profile?.resume || '#'} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
                                        View Resume
                                    </a>
                                </TableCell>
                                <TableCell>
                                    {/* Format the date if present */}
                                    {items?.createdAt ? new Date(items.createdAt).toLocaleDateString() : 'N/A'}
                                </TableCell>
                                <TableCell className="text-right">
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <button aria-label="More options">
                                                <MoreHorizontal className="cursor-pointer" />
                                            </button>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-32 p-2">
                                            {shortlistingStatus.map((status, index) => (
                                                <div onClick={()=>statusHandler(status,items?._id)} key={index} className="flex items-center my-1 cursor-pointer px-2 hover:bg-gray-100 rounded">
                                                    <span>{status}</span>
                                                </div>
                                            ))}
                                        </PopoverContent>
                                    </Popover>
                                </TableCell>
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan="6" className="text-center">
                                No applicants found
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>

            </Table>
        </div>
    );
};

export default ApplicantsTable;
