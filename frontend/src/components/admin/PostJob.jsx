import { Label } from '@radix-ui/react-label';
import Navbar from '../../components/shared/Navbar';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectGroup, SelectItem } from '../../components/ui/select';
import axios from 'axios';
import { JOB_API_END_POINT } from '../../utils/constant.js';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

const PostJob = () => {
    const [input, setInput] = useState({
        title: "",
        description: "",
        skillsRequired: [],  // Array for skills
        salary: "",
        location: "",
        jobType: "",
        experience: "",
        position: 0,
        companyId: ""
    });

    const [loading, setLoading] = useState(false);
    const [newSkill, setNewSkill] = useState(""); 
    const navigate = useNavigate();
    const { companies } = useSelector(store => store.company);

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };

    const selectChangeHandler = (companyId) => {
        setInput({ ...input, companyId: companyId });
    };

    const handleSkillChange = (e) => {
        setNewSkill(e.target.value);
    };

    const addSkillHandler = () => {
        if (newSkill.trim() && !input.skillsRequired.includes(newSkill.trim())) {
            setInput({ ...input, skillsRequired: [...input.skillsRequired, newSkill.trim()] });
            setNewSkill(""); 
        }
    };

    const removeSkillHandler = (skill) => {
        setInput({ ...input, skillsRequired: input.skillsRequired.filter(s => s !== skill) });
    };

    const submitHandler = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);
            const res = await axios.post(`${JOB_API_END_POINT}/post`,
                { ...input },  // Send the skills array as is
                {
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    withCredentials: true
                }
            );
            if (res.data.success) {
                toast.success(res.data.message);
                navigate("/admin/jobs");
            }
        } catch (error) {
            toast.error(error.response.data.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <Navbar />
            <div className="flex items-center justify-center w-screen my-5">
                <form onSubmit={submitHandler} className="p-8 max-w-4xl border border-gray-200 shadow-lg rounded-md">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <Label htmlFor="title">Title</Label>
                            <Input
                                type="text"
                                id="title"
                                name="title"
                                value={input.title}
                                onChange={changeEventHandler}
                                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
                            />
                        </div>
                        <div>
                            <Label htmlFor="description">Description</Label>
                            <Input
                                type="text"
                                id="description"
                                name="description"
                                value={input.description}
                                onChange={changeEventHandler}
                                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
                            />
                        </div>
                        <div>
                            <Label htmlFor="skillsRequired">Skills Required</Label>
                            <div className="flex flex-wrap gap-2">
                                <Input
                                    type="text"
                                    id="skillsRequired"
                                    value={newSkill}
                                    onChange={handleSkillChange}
                                    className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
                                    placeholder="Enter a skill"
                                />
                                <Button
                                    type="button"
                                    onClick={addSkillHandler}
                                    className="bg-purple-600 text-white px-3 py-1 rounded-md"
                                >
                                    Add Skill
                                </Button>
                            </div>
                            <div className="mt-2">
                                {input.skillsRequired.map((skill, index) => (
                                    <span key={index} className="inline-flex items-center space-x-1 text-sm bg-gray-200 text-gray-700 py-1 px-2 rounded-full">
                                        <span>{skill}</span>
                                        <button type="button" onClick={() => removeSkillHandler(skill)} className="text-red-500">x</button>
                                    </span>
                                ))}
                            </div>
                        </div>
                        <div>
                            <Label htmlFor="salary">Salary</Label>
                            <Input
                                type="text"
                                id="salary"
                                name="salary"
                                value={input.salary}
                                onChange={changeEventHandler}
                                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
                            />
                        </div>
                        <div>
                            <Label htmlFor="location">Location</Label>
                            <Input
                                type="text"
                                id="location"
                                name="location"
                                value={input.location}
                                onChange={changeEventHandler}
                                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
                            />
                        </div>
                        <div>
                            <Label htmlFor="jobType">Job Type</Label>
                            <select
                                id="jobType"
                                name="jobType"
                                value={input.jobType}
                                onChange={changeEventHandler}
                                className="w-full my-1 py-2 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="">Select Job Type</option>
                                <option value="Full-time">Full-time</option>
                                <option value="Part-time">Part-time</option>
                                <option value="Contract">Contract</option>
                                <option value="Internship">Internship</option>
                            </select>
                        </div>
                        <div>
                            <Label htmlFor="experience">Experience Level</Label>
                            <Input
                                type="text"
                                id="experience"
                                name="experience"
                                value={input.experience}
                                onChange={changeEventHandler}
                                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
                            />
                        </div>
                        <div>
                            <Label htmlFor="position">No Of Positions</Label>
                            <Input
                                type="number"
                                id="position"
                                name="position"
                                value={input.position}
                                onChange={changeEventHandler}
                                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
                            />
                        </div>

                        {companies.length > 0 ? (
                            <div>
                                <Label>Select Company</Label>
                                <Select onValueChange={selectChangeHandler}>
                                    <SelectTrigger className="w-full my-1">
                                        <SelectValue placeholder="Select a Company" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            {companies.map((company) => (
                                                <SelectItem key={company._id} value={company._id}>
                                                    {company.name}
                                                </SelectItem>
                                            ))}
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </div>
                        ) : (
                            <p className="text-xs text-red-600 font-bold text-center my-3">
                                * Please register a company first
                            </p>
                        )}
                    </div>

                    <Button
                        className="w-full mt-4 bg-purple-600 text-white px-5 py-2 rounded-lg"
                        type="submit"
                        disabled={loading}
                    >
                        {loading ? 'Saving...' : 'Post New Job'}
                    </Button>
                </form>
            </div>
        </div>
    );
};

export default PostJob;
