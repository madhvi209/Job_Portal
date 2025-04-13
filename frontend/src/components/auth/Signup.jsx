import { useEffect, useState } from 'react';
import axios from 'axios';
import { USER_API_END_POINT } from '../../utils/constant.js';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { setLoading } from '../../redux/authSlice.js';
import {Button } from '../ui/button.jsx';
import { Loader2 } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';

export const Signup = () => {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phoneNumber: '',
        password: '',
        role: 'student', 
        file: null, 
    });
    const navigate = useNavigate();
    const { loading, user } = useSelector(store => store.auth);
    const dispatch = useDispatch();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFormData({
                ...formData,
                file: file,
            });
        } else {
            setFormData({
                ...formData,
                file: null,
            });
        }
    };

    const handleRadioChange = (e) => {
        setFormData({ ...formData, role: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const inputData = new FormData();
        inputData.append("fullName", formData.fullName);
        inputData.append("email", formData.email);
        inputData.append("phoneNumber", formData.phoneNumber);
        inputData.append("password", formData.password);
        inputData.append("role", formData.role);

        if (formData.file) {
            inputData.append("file", formData.file);
        }

        try {
            dispatch(setLoading(true));
            const res = await axios.post(`${USER_API_END_POINT}/register`, inputData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                },
                withCredentials: true,
            });

            if (res.data.success) {
                toast.success(res.data.message);
                navigate("/login");
            }
        } catch (error) {
            const errorMessage = error.response ? error.response.data.message : error.message;
            console.error('Error details:', errorMessage);
            toast.error(`Signup failed: ${errorMessage}`);
        } finally {
            dispatch(setLoading(false));
        }
    };

    useEffect(() => {
        if (user) {
            navigate("/")
        }
    }, [user, navigate]);

    return (
        <div className="max-w-md mx-auto p-10 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-[#F83002] text-center mb-5">Sign Up</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        required
                        placeholder="Full Name"
                        className="w-full p-3 border border-gray-300 rounded-lg text-sm focus:border-[#F83002] focus:outline-none"
                    />
                </div>
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
                        type="tel"
                        name="phoneNumber"
                        value={formData.phoneNumber}
                        onChange={handleChange}
                        required
                        placeholder="Phone Number"
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

                <div className="mb-4">
                    <h4 className="text-lg">Select Role :</h4>
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

                <div className="mb-4">
                    <label htmlFor="file-upload" className="text-sm text-gray-600">Upload Profile pic (Optional):</label>
                    <input
                        type="file"
                        id="file-upload"
                        name="file"
                        onChange={handleFileChange}
                        className="w-full p-3 border border-gray-300 rounded-lg text-sm"
                    />
                </div>

                {loading ? (
                    <Button className="w-full my-4">
                        <Loader2 className="mr-2 h-4 w-4 animate-spin my-4" />
                        Please wait
                    </Button>
                ) : (
                    <button type="submit" className="w-full py-3 bg-[#F83002] text-white rounded-lg text-lg hover:bg-[#f52f00] transition">
                        Sign Up
                    </button>
                )}
            </form>

            <p className="text-center text-sm text-gray-600 mt-4">
                Already have an account? <a href="/login" className="text-[#F83002] hover:underline">Log in</a>
            </p>
        </div>
    );
};
