/* eslint-disable no-unused-vars */
import React from 'react';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/table';
import { Badge } from '../components/ui/badge';
import { useSelector } from 'react-redux';

const AppliedJobTable = () => {
    const { allAppliedJobs } = useSelector((store) => store.job);

    return (
        <div className="overflow-x-auto bg-white p-6 rounded-lg shadow-md">
            <Table className="w-full border border-gray-200">
                <TableCaption className="text-gray-600 font-medium py-3">
                    A list of your Applied Jobs
                </TableCaption>
                <TableHeader className="bg-gray-100 border-b">
                    <TableRow>
                        <TableHead className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                            Date
                        </TableHead>
                        <TableHead className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                            Job Role
                        </TableHead>
                        <TableHead className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                            Company
                        </TableHead>
                        <TableHead className="px-6 py-3 text-right text-sm font-semibold text-gray-700">
                            Status
                        </TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {allAppliedJobs.length <= 0 ? (
                        <tr>
                            <td
                                colSpan="4"
                                className="px-6 py-4 text-center text-sm text-gray-500"
                            >
                                You haven't applied for any job yet.
                            </td>
                        </tr>
                    ) : (
                        allAppliedJobs.map((appliedJob) => (
                            <TableRow
                                key={appliedJob?._id}
                                className="hover:bg-gray-50 transition-colors"
                            >
                                <TableCell className="px-6 py-4 text-sm text-gray-700">
                                    {appliedJob?.createdAt?.split("T")[0]}
                                </TableCell>
                                <TableCell className="px-6 py-4 text-sm text-gray-700">
                                    {appliedJob?.job?.title}
                                </TableCell>
                                <TableCell className="px-6 py-4 text-sm text-gray-700">
                                    {appliedJob?.job?.company?.name}
                                </TableCell>
                                <TableCell className="px-6 py-4 text-right">
                                    <Badge
                                        className={`px-3 py-1 rounded-full text-sm text-white ${appliedJob?.status === "rejected"
                                                ? "bg-red-400"
                                                : appliedJob?.status === "pending"
                                                    ? "bg-gray-400"
                                                    : "bg-green-400"
                                            }`}
                                    >
                                        {appliedJob?.status.toUpperCase()}
                                    </Badge>
                                </TableCell>
                            </TableRow>
                        ))
                    )}
                </TableBody>
            </Table>
        </div>
    );
};

export default AppliedJobTable;
