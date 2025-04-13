import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Avatar, AvatarImage } from '../components/ui/avatar';
import Navbar from './shared/Navbar';
import { Button } from '../components/ui/button';
import UpdateProfileDialogue from './UpdateProfileDialogue';
import { Badge } from '../components/ui/badge';
import useGetAppliedJobs from '../hooks/useGetAppliedJobs';

const Profile = () => {
    const { user } = useSelector(state => state.auth);
    const [userData, setUserData] = useState(null);
    const [open, setOpen] = useState(false);

    const appliedJobs = useGetAppliedJobs() || [];

    useEffect(() => {
        if (!user) {
            const storedUser = localStorage.getItem('user');
            setUserData(storedUser ? JSON.parse(storedUser) : {});
        } else {
            setUserData(user);
        }
    }, [user]);

    if (!userData) {
        return <div className="text-center py-4">Loading...</div>;
    }

    const userSkills = Array.isArray(userData?.profile?.skills) ? userData.profile.skills : [];

    return (
        <div>
            <Navbar />
            <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
                <h2 className="text-3xl font-semibold text-center mb-6">Your Profile</h2>

                {/* Profile Section */}
                <div className="flex flex-col items-center mb-6">
                    <Avatar className="w-24 h-24 border-4 border-[#8432a2] rounded-full">
                        <AvatarImage
                            src={userData.avatarUrl || '/Images/th.jpg'}
                            alt={userData.name || 'User Avatar'}
                            className="w-full h-full object-cover rounded-full"
                        />
                    </Avatar>
                    <h1 className="text-2xl font-bold mt-2">{userData.fullName || "Full Name"}</h1>
                    <p className="text-lg text-gray-600">{userData.email || "email@example.com"}</p>
                    <p className="text-md text-gray-700">{userData?.profile?.bio || "Add your Bio here"}</p>
                    <p className="text-lg text-gray-600 mt-1">{userData.phoneNumber || "+91 7488947465"}</p>
                </div>

                {/* Edit Profile Button */}
                <div className="text-center mb-6">
                    <Button
                        onClick={() => setOpen(true)}
                        className="px-6 py-2 bg-[#8432a2] text-white rounded-full hover:bg-[#6f2498] transition duration-200"
                    >
                        Edit Profile
                    </Button>
                </div>

                {/* Resume Section */}
                <div className="text-center mb-6">
                    {userData?.profile?.resumeUrl ? (
                        <a
                            href={userData?.profile?.resumeUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[#8432a2] hover:underline text-lg font-medium"
                        >
                            📄 View Resume
                        </a>
                    ) : (
                        <p className="text-gray-500 italic">No resume uploaded yet</p>
                    )}
                </div>

                {/* Skills Section */}
                <div className="p-4 bg-gray-100 rounded-lg shadow-md mt-4">
                    <h1 className="text-2xl font-semibold mb-4 text-gray-800">Skills</h1>
                    <div className="flex flex-wrap gap-3">
                        {userSkills.length > 0 ? (
                            userSkills.slice(0, 6).map((item, index) => (
                                <Badge key={index} className="bg-[#8432a2] text-white text-sm font-medium px-4 py-2 rounded-full shadow hover:bg-[#471264] transition duration-200">
                                    {item}
                                </Badge>
                            ))
                        ) : (
                            <span className="text-gray-500">No skills available</span>
                        )}
                    </div>
                </div>

                {/* Applied Jobs Section */}
                <div className="p-4 bg-gray-100 rounded-lg shadow-md mt-6">
                    <h1 className="text-2xl font-semibold mb-4 text-gray-800">Applied Jobs</h1>
                    {appliedJobs && appliedJobs.length > 0 ? (
                        <ul className="space-y-3">
                            {appliedJobs.map((job, index) => (
                                <li key={index} className="bg-white border rounded-md p-3 shadow-sm">
                                    <p className="text-lg font-medium text-[#8432a2]">
                                        {job?.job?.title || "Untitled Job"}
                                    </p>
                                    <p className="text-sm text-gray-600">
                                        {job?.job?.company?.name || "Unknown Company"} - {job?.job?.location || "Location not specified"}
                                    </p>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-gray-500">No applied jobs found</p>
                    )}
                </div>

                {/* Edit Profile Dialog */}
                <UpdateProfileDialogue open={open} setOpen={setOpen} />
            </div>
        </div>
    );
};

export default Profile;
