import { useNavigate } from "react-router-dom";
import Navbar from "../shared/Navbar";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import CompaniesTable from './CompaniesTable';
import useGetAllCompanies from "../../hooks/useGetAllCompanies";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setSearchCompanyByText } from "../../redux/companySlice";


const Companies = () => {
    useGetAllCompanies();
    const [input, setInput] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(setSearchCompanyByText(input))
    },[input, dispatch]);
    return (
        <div>
            <Navbar />
            <div className="max-w-6xl mx-auto my-10">
                <div className="flex items-center justify-between">
                    <Input
                        className='w-fit'
                        placeholder='Filter by Name' 
                            onChange={(e)=> setInput(e.target.value)}
                        />
                    <Button onClick ={() => navigate("/admin/companies/create")}>New Company</Button>
                </div>
                <CompaniesTable />

            </div>
        </div>
    )
}

export default Companies