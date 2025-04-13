import { useState, useEffect } from 'react';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Button } from '../ui/button';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'sonner';
import axios from 'axios';
import { COMPANY_API_END_POINT } from '../../utils/constant.js';
import Navbar from '../shared/Navbar';
import { useSelector } from 'react-redux';
import { ArrowLeft } from 'lucide-react';
import useGetCompanyById from '../../hooks/useGetCompanyById';

const CompanySetup = () => {
  const params = useParams();
  useGetCompanyById(params.id);
  const navigate = useNavigate();
  const [input, setInput] = useState({
    name: "", // Update to "name" instead of "companyName"
    website: "",
    description: "",
    location: "",
    file: null,
  });
  const { singleCompany } = useSelector(store => store.company);
  const [loading, setLoading] = useState(false);

  // Handle input changes for all fields
  const changeEventHandler = (e) => {
    const { name, value } = e.target;
    setInput((prevInput) => ({
      ...prevInput,
      [name]: value,
    }));
  };

  // Handle file upload separately
  const fileChangeHandler = (e) => {
    setInput((prevInput) => ({
      ...prevInput,
      file: e.target.files[0],
    }));
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!input.name || !input.website) {
      toast.error('Company Name and Website are required');
      return;
    }

    setLoading(true);

    const formData = new FormData();
    formData.append('name', input.name); // Make sure "name" matches backend
    formData.append('website', input.website);
    formData.append('description', input.description);
    formData.append('location', input.location);
    if (input.file) {
      formData.append('file', input.file); // Append file only if available
    }

    try {
      const res = await axios.put(`${COMPANY_API_END_POINT}/update/${params.id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        withCredentials: true,
      });

      if (res.data.success) {
        toast.success('Company details updated successfully!');
        navigate(`/admin/companies`);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error occurred');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setInput({
      name: singleCompany.name || "", // Update to "name"
      website: singleCompany.website || "",
      description: singleCompany.description || "",
      location: singleCompany.location || "",
      file: null,
    });
  }, [singleCompany]);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      <div className="flex-grow flex items-center justify-center p-5">
        <form onSubmit={submitHandler} encType="multipart/form-data">
          <Button onClick={() => navigate('/admin/companies')}><ArrowLeft /><span>Back</span></Button>
          <div className="bg-white shadow-lg rounded-lg p-10 w-full max-w-3xl">
            <h1 className="text-3xl font-bold text-gray-800 mb-5">Set up Your Company</h1>

            <div className="mb-4">
              <Label className="text-lg text-gray-700">Company Name</Label>
              <Input
                type="text"
                name="name" // Updated to "name"
                className="mt-1 block w-full border border-gray-300 rounded-lg py-2 px-4"
                placeholder="Your company name"
                value={input.name}
                onChange={changeEventHandler}
                required
              />
            </div>

            <div className="mb-4">
              <Label className="text-lg text-gray-700">Company Website</Label>
              <Input
                type="url"
                name="website"
                className="mt-1 block w-full border border-gray-300 rounded-lg py-2 px-4"
                placeholder="https://yourcompany.com"
                value={input.website}
                onChange={changeEventHandler}
                required
              />
            </div>

            <div className="mb-4">
              <Label className="text-lg text-gray-700">Description</Label>
              <Textarea
                name="description"
                className="mt-1 block w-full border border-gray-300 rounded-lg py-2 px-4"
                placeholder="Tell us more about your company"
                value={input.description}
                onChange={changeEventHandler}
              />
            </div>

            <div className="mb-4">
              <Label className="text-lg text-gray-700">Location</Label>
              <Input
                type="text"
                name="location"
                className="mt-1 block w-full border border-gray-300 rounded-lg py-2 px-4"
                placeholder="Company Location"
                value={input.location}
                onChange={changeEventHandler}
              />
            </div>

            <div className="mb-4">
              <Label className="text-lg text-gray-700">Upload Logo/Document</Label>
              <Input
                type="file"
                name="file"
                className="mt-1 block w-full border border-gray-300 rounded-lg py-2 px-4"
                accept="image/*"
                onChange={fileChangeHandler}
              />
            </div>

            <div className="flex justify-end mt-6">
              <Button
                variant="outline"
                className="border border-gray-500 text-gray-700 px-5 py-2 mr-4 rounded-lg"
                onClick={() => navigate('/admin/companies')}
              >
                Cancel
              </Button>
              <Button
                className="bg-purple-600 text-white px-5 py-2 rounded-lg"
                type="submit"
                disabled={loading}
              >
                {loading ? 'Saving...' : 'Save & Continue'}
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CompanySetup;
