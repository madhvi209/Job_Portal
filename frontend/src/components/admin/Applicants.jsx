import { useEffect } from 'react';
import Navbar from '../../components/shared/Navbar';
import ApplicantsTable from '../../components/admin/ApplicantsTable';
import { APPLICATION_API_END_POINT } from '../../utils/constant.js';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setAllApplicants } from '../../redux/applicationSlice';
import axios from 'axios';

const Applicants = () => {
    const params = useParams();
    const dispatch = useDispatch();
    const { applicants } = useSelector(store => store.application);

    useEffect(() => {
        const fetchAllApplicants = async () => {
            try {
                const response = await axios.get(`${APPLICATION_API_END_POINT}/applicants/${params.id}`, { withCredentials: true });
                console.log("API response data:", response.data.applicants);
                dispatch(setAllApplicants(Array.isArray(response.data.applicants) ? response.data.applicants : []));
            } catch (error) {
                if (error.response) {
                    console.error("Server error:", error.response.status, error.response.data);
                } else if (error.request) {
                    console.error("Network error, no response received:", error.request);
                } else {
                    console.error("Error setting up request:", error.message);
                }
            }
        };

        fetchAllApplicants(); 
    }, [ dispatch, params.id]);

    return (
        <div>
            <Navbar />
            <div className='max-w-7xl mx-auto'>
                <h1 className='font-bold text-xl my-5'>Applicants {applicants?.length || 0}</h1>
                <ApplicantsTable />
            </div>
        </div>
    );
};

export default Applicants;
