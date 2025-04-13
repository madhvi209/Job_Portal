import { Button } from "../ui/button.jsx";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { LogOut, User2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { USER_API_END_POINT } from "../../utils/constant.js";
import { logout, setLoading } from "../../redux/authSlice.js";
import { toast } from "sonner";
import axios from 'axios';

const Navbar = () => {
    const { user, loading } = useSelector(store => store.auth);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const logoutHandler = async () => {
        try {
            dispatch(setLoading(true));
            const res = await axios.get(`${USER_API_END_POINT}/logout`, {
                withCredentials: true,
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (res.data.success) {
                dispatch(logout());
                toast.success("Successfully logged out.");
                navigate("/");
            } else {
                toast.error("Logout failed. Please try again.");
            }
        } catch (error) {
            console.error("Logout failed:", error);
            toast.error("An error occurred while logging out.");
        } finally {
            dispatch(setLoading(false));
        }
    };

    return (
        <div className='bg-white shadow-md'>
            <div className='flex items-center justify-between mx-auto max-w-7xl h-16 px-6'>
                {/* Logo Section */}
                <h1 className='text-2xl font-bold'>
                    <Link to="/">job<span className='text-[#F83002]'>Portal</span></Link>
                </h1>

                {/* Navigation Links */}
                <div className='flex items-center gap-7'>
                    <ul className='flex font-medium items-center gap-5'>
                        {user && user.role === 'recruiter' ? (
                            <>
                                <li className='hover:text-[#F83002]'>
                                    <Link to="/admin/companies">Companies</Link>
                                </li>
                                <li className='hover:text-[#F83002]'>
                                    <Link to="/admin/Jobs">Jobs</Link>
                                </li>
                            </>
                        ) : (
                            <>
                                <li className='hover:text-[#F83002]'>
                                    <Link to="/">Home</Link>
                                </li>
                                <li className='hover:text-[#F83002]'>
                                    <Link to="/Jobs">Jobs</Link>
                                </li>
                                <li className='hover:text-[#F83002]'>
                                    <Link to="/Browse">Browse</Link>
                                </li>
                            </>
                        )}
                    </ul>

                    {/* Authentication Section */}
                    {!user ? (
                        <div className="flex items-center gap-2">
                            <Link to="/login">
                                <Button variant="outline">Login</Button>
                            </Link>
                            <Link to="/signup">
                                <Button className="bg-[#8432a2]">SignUp</Button>
                            </Link>
                        </div>
                    ) : (
                        <Popover>
                            <PopoverTrigger asChild>
                                <Avatar className="cursor-pointer">
                                        <AvatarImage
                                            src={user?.profile?.profilePhoto || "https://wallpapers.com/images/hd/gaming-profile-pictures-ai9qlazq1uszo8v4.jpg"}
                                            alt={user?.fullName || "User Avatar"}
                                        />
                                </Avatar>
                            </PopoverTrigger>
                            <PopoverContent className="w-80">
                                <div className="flex items-center gap-4">
                                    <Avatar>
                                            <AvatarImage
                                                src={user?.profile?.profilePhoto || "https://wallpapers.com/images/hd/gaming-profile-pictures-ai9qlazq1uszo8v4.jpg"}
                                                alt={user?.fullName || "User Avatar"}
                                            />

                                    </Avatar>
                                    <div>
                                        <h4 className="font-medium">{user?.fullName}</h4>
                                        <p className="text-sm text-gray-500">{user?.profile?.bio || "No bio available"}</p>
                                    </div>
                                </div>

                                <div className='flex flex-col my-2'>
                                    {user?.role === 'student' && (
                                        <div className='flex w-fit items-center gap-2 cursor-pointer hover:bg-gray-200 p-2 rounded'>
                                            <User2 />
                                            <Button variant="link" className="text-gray-700 hover:text-[#8432a2]">
                                                <Link to="/Profile">View Profile</Link>
                                            </Button>
                                        </div>
                                    )}

                                    <div className='flex w-fit items-center gap-2 cursor-pointer hover:bg-gray-200 p-2 rounded'>
                                        <LogOut />
                                        <Button
                                            onClick={logoutHandler}
                                            variant="link"
                                            className="text-gray-700 hover:text-[#8432a2]"
                                            disabled={loading}
                                        >
                                            {loading ? "Logging out..." : "LogOut"}
                                        </Button>
                                    </div>
                                </div>
                            </PopoverContent>
                        </Popover>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Navbar;
