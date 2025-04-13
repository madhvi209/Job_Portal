import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Avatar, AvatarImage } from '../ui/avatar';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Edit2, MoreHorizontal } from 'lucide-react';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CompaniesTable = () => {
    const { companies = [], searchCompanyByText, loading, error } = useSelector(store => store.company);
    const [filterCompany, setFilterCompany] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const filteredCompany = companies.filter(company =>
            !searchCompanyByText || company?.name?.toLowerCase().includes(searchCompanyByText.toLowerCase())
        );
        setFilterCompany(filteredCompany);
    }, [companies, searchCompanyByText]);

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
                <TableCaption>A list of your currently registered companies.</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Logo</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {filterCompany.length === 0 ? (
                        <TableRow>
                            <TableCell colSpan={4} className="text-center">No companies</TableCell>
                        </TableRow>
                    ) : (
                        filterCompany.map((company) => (
                            <TableRow key={company._id}>
                                <TableCell>
                                    <Avatar className="h-16 w-16">
                                        <AvatarImage
                                            src={company.logo || "https://e7.pngegg.com/pngimages/97/170/png-clipart-job-hunting-employment-agency-career-others-miscellaneous-logo.png"}
                                            alt="Company Logo"
                                        />
                                    </Avatar>
                                </TableCell>
                                <TableCell>{company.name}</TableCell>
                                <TableCell>{company.createdAt ? new Date(company.createdAt).toLocaleDateString() : 'N/A'}</TableCell>
                                <TableCell className="text-right">
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <button aria-label="More options">
                                                <MoreHorizontal />
                                            </button>
                                        </PopoverTrigger>
                                        <PopoverContent>
                                            <div onClick={()=>navigate(`/admin/companies/${company._id}`)}className="flex items-center">
                                                <Edit2 className="mr-2" aria-label="Edit" />
                                                <span>Edit</span>
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

export default CompaniesTable;
