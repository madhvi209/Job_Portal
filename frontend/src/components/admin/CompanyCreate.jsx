import { Label } from '../ui/label';
import Navbar from '../shared/Navbar';
import { useState } from 'react';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { COMPANY_API_END_POINT } from '../../utils/constant.js';
import { toast } from 'sonner';
import { useDispatch } from 'react-redux';
import { setSingleCompany } from '../../redux/companySlice';

const CompanyCreate = () => {
  const navigate = useNavigate();
  const [companyName, setCompanyName] = useState(''); // Company name state
  const [website, setwebsite] = useState(''); // New state for company website
  const dispatch = useDispatch();

  const registerNewCompany = async () => {
    try {
      const res = await axios.post(
        `${COMPANY_API_END_POINT}/register`,
        { companyName, website }, // Include both company name and website
        {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        }
      );
      if (res?.data?.success) {
        dispatch(setSingleCompany(res.data.company));
        toast.success(res.data.message);
        const companyId = res?.data?.company?._id;
        navigate(`/admin/companies/${companyId}`);
      }
    } catch (error) {
      
      toast.error(error.response?.data?.message || "Error occurred");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      <div className="flex-grow flex items-center justify-center pt-3">
        <div className="bg-white shadow-lg rounded-lg p-10 w-full max-w-3xl">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Your Company Information</h1>
            <p className="text-base text-gray-600">
              What would you like to name your company? You can always change this later.
            </p>
          </div>

          {/* Company Name Input */}
          <div className="mb-6">
            <Label className="text-lg text-gray-700">Company Name</Label>
            <Input
              type="text"
              className="mt-1 block w-full border border-gray-300 rounded-lg py-2 px-4 text-base focus:ring-2 focus:ring-purple-500"
              placeholder="JobHunt, Microsoft, etc."
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
            />
          </div>

          {/* Company Website Input */}
          <div className="mb-6">
            <Label className="text-lg text-gray-700">Company Website</Label>
            <Input
              type="url"
              className="mt-1 block w-full border border-gray-300 rounded-lg py-2 px-4 text-base focus:ring-2 focus:ring-purple-500"
              placeholder="https://yourcompany.com"
              value={website}
              onChange={(e) => setwebsite(e.target.value)}
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-end space-x-4">
            <Button
              variant="outline"
              className="border border-purple-600 text-purple-600 hover:bg-purple-50 px-5 py-2 text-base rounded-lg"
              onClick={() => navigate("/admin/companies")}
            >
              Cancel
            </Button>
            <Button
              className="bg-purple-600 text-white hover:bg-purple-700 px-5 py-2 text-base rounded-lg"
              onClick={registerNewCompany}
            >
              Continue
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyCreate;
