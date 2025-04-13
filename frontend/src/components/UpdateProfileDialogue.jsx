/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from './ui/dialog';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { USER_API_END_POINT } from '../utils/constant.js';
import { setUser } from '../redux/authSlice';
import { toast } from 'sonner';
import { setLoading } from '../redux/authSlice.js';

const UpdateProfileDialogue = ({ open, setOpen }) => {
    const user = useSelector(store => store.auth);

    const [input, setInput] = useState({
        fullName: user?.fullName || '',
        email: user?.email || '',
        phoneNumber: user?.phoneNumber || '',
        bio: user?.bio || '',
        skills: user?.skills || '',
        file: null,
    });
    const dispatch = useDispatch();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setInput({ ...input, [name]: value });
    };

    const submitHandler = async (e) => {
        e.preventDefault();



        const formData = new FormData();
        formData.append("fullName", input.fullName);
        formData.append("email", input.email);
        formData.append("phoneNumber", input.phoneNumber);
        formData.append("bio", input.bio);
        formData.append("skills", input.skills);

        if (input.file) {
            formData.append("file", input.file);
        }

        try {
            dispatch(setLoading(true));
            const res = await axios.post(`${USER_API_END_POINT}/updateProfile`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                },
                withCredentials: true,
            });

            if (res.data.success) {
                toast.success(res.data.message);
                dispatch(setUser(res.data.user)); // Update Redux state with new user data
                setOpen(false); // Close dialog after successful submission
            }

        } catch (error) {
            const errorMessage = error.response ? error.response.data.message : error.message;
            console.error('Error details:', errorMessage);
            toast.error(`Profile Update failed: ${errorMessage}`);
        } finally {
            dispatch(setLoading(false));
        }
    };

    const fileChangeHandler = (e) => {
        const file = e.target.files?.[0];
        setInput({ ...input, file });
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className="px-4 py-2 bg-[#8432a2] text-white rounded-full hover:bg-[#6f2498] transition duration-200">
                    Edit Profile
                </Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-[425px] p-6 bg-white rounded-lg shadow-lg">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-bold text-gray-800">Edit Profile</DialogTitle>
                    <DialogDescription className="text-gray-600">
                        Make changes to your profile here. Click save when you are done.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={submitHandler}>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="fullName" className="text-right font-medium text-gray-700">
                                Name
                            </Label>
                            <Input
                                id="fullName"
                                name="fullName"
                                value={input.fullName}
                                onChange={handleChange}
                                placeholder="Enter your name"
                                className="col-span-3 border-gray-300 focus:ring-2 focus:ring-[#8432a2] rounded-md"
                            />
                        </div>

                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="email" className="text-right font-medium text-gray-700">
                                Email
                            </Label>
                            <Input
                                id="email"
                                name="email"
                                value={input.email}
                                onChange={handleChange}
                                placeholder="Enter your email"
                                className="col-span-3 border-gray-300 focus:ring-2 focus:ring-[#8432a2] rounded-md"
                            />
                        </div>

                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="bio" className="text-right font-medium text-gray-700">
                                Bio
                            </Label>
                            <Input
                                id="bio"
                                name="bio"
                                value={input.bio}
                                onChange={handleChange}
                                placeholder="Add a short bio"
                                className="col-span-3 border-gray-300 focus:ring-2 focus:ring-[#8432a2] rounded-md"
                            />
                        </div>

                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="phoneNumber" className="text-right font-medium text-gray-700">
                                Number
                            </Label>
                            <Input
                                id="phoneNumber"
                                name="phoneNumber"
                                value={input.phoneNumber}
                                onChange={handleChange}
                                placeholder="Enter your phone number"
                                className="col-span-3 border-gray-300 focus:ring-2 focus:ring-[#8432a2] rounded-md"
                            />
                        </div>

                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="skills" className="text-right font-medium text-gray-700">
                                Skills
                            </Label>
                            <Input
                                id="skills"
                                name="skills"
                                value={input.skills}
                                onChange={handleChange}
                                placeholder="Enter your skills"
                                className="col-span-3 border-gray-300 focus:ring-2 focus:ring-[#8432a2] rounded-md"
                            />
                        </div>

                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="file" className="text-right font-medium text-gray-700">
                                Resume
                            </Label>
                            <Input
                                id="file"
                                type="file"
                                accept="application/pdf"
                                onChange={fileChangeHandler}
                                className="col-span-3 border-gray-300 focus:ring-2 focus:ring-[#8432a2] rounded-md"
                            />
                        </div>
                    </div>

                    <DialogFooter>
                        <Button
                            type="submit"
                            className="w-full py-2 bg-[#8432a2] text-white rounded-md hover:bg-[#6f2498] transition duration-200"
                        >
                            Save Changes
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default UpdateProfileDialogue;
