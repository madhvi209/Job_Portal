/* eslint-disable react/no-unescaped-entities */
import { useEffect, useState } from 'react';
import { USER_API_END_POINT } from '../../utils/constant.js';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { toast } from 'sonner';
import axios from 'axios'; // Import axios
import { useDispatch, useSelector } from 'react-redux';
import { setUser,setLoading } from '../../redux/authSlice.js';

import { Loader2 } from 'lucide-react';
import { Button } from '../ui/button';


export const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        role: 'student', // Default user type
    });
    const { loading, user } = useSelector(store => store.auth);
    const navigate = useNavigate(); // Initialize useNavigate
    const dispatch = useDispatch();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleRadioChange = (e) => {
        setFormData({ ...formData, role: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            dispatch(setLoading(true));
            const res = await axios.post(`${USER_API_END_POINT}/login`, formData, {
                headers: {
                    "Content-Type": "application/json"
                },
                withCredentials: true,
            });
            if (res.data.success) {
                dispatch(setUser(res.data.user));
                toast.success(res.data.message);
                navigate("/"); // Use navigate instead of Navigate
            }
        } catch (error) {
            console.log(error);
            toast.error('Login failed. Please try again.'); // Optional error handling
        } finally {
            dispatch(setLoading(false));
        }
    };

    useEffect(() => {
        if (user) {
            navigate("/")
        }
    })

    return (
        <div className="max-w-sm mx-auto p-10 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-[#F83002] text-center mb-5">Log In</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        placeholder="Email Address"
                        className="w-full p-3 border border-gray-300 rounded-lg text-sm focus:border-[#F83002] focus:outline-none"
                    />
                </div>
                <div className="mb-4">
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                        placeholder="Password"
                        className="w-full p-3 border border-gray-300 rounded-lg text-sm focus:border-[#F83002] focus:outline-none"
                    />
                </div>

                {/* Radio Group for role */}
                <div className="mb-4">
                    <h4 className="text-lg">Select Role:</h4>
                    <div className="flex items-center mb-2">
                        <input
                            type="radio"
                            name="role"
                            value="student"
                            id="student"
                            checked={formData.role === 'student'}
                            onChange={handleRadioChange}
                            className="mr-2"
                        />
                        <label htmlFor="student" className="text-sm text-gray-600">Student</label>
                    </div>
                    <div className="flex items-center mb-2">
                        <input
                            type="radio"
                            name="role"
                            value="recruiter"
                            id="recruiter"
                            checked={formData.role === 'recruiter'}
                            onChange={handleRadioChange}
                            className="mr-2"
                        />
                        <label htmlFor="recruiter" className="text-sm text-gray-600">Recruiter</label>
                    </div>
                </div>

                {loading ? (
                    <Button className="w-full my-4">
                        <Loader2 className="mr-2 h-4 w-4 animate-spin my-4" />
                        Please wait
                    </Button>
                ) : (
                    <button type="submit" className="w-full py-3 bg-[#F83002] text-white rounded-lg text-lg hover:bg-[#f52f00] transition">
                        Log In
                    </button>
                )}
            </form>

            <p className="text-center text-sm text-gray-600 mt-4">
                Don't have an account? <a href="/signup" className="text-[#F83002] hover:underline">Sign up</a>
            </p>
        </div>
    );
};
