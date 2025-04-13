import { createSlice} from '@reduxjs/toolkit';



// Job Slice
const jobSlice = createSlice({
    name: 'job',
    initialState: {
        allJobs: [],
        allAdminJobs:[],
        status: 'idle',
        error: null,
        singleJob:null,
        searchJobByText:"",
        allAppliedJobs:[],
        searchQuery:"",
        filters: {
            location: '',
            industry: '',
            salary: [1000, 20000], // Default salary range
            jobType: ''
        }, 
    },
    reducers: {
        setAllJobs:(state, action)=>{
            state.allJobs = action.payload;
        },
        setSingleJob: (state, action) => {
            state.singleJob = action.payload;
        },
        setAllAdminJobs:(state, action)=>{
            state.allAdminJobs= action.payload;
        },
        setSearchJobByText: (state, action) => {
            state.searchJobByText = action.payload;
        },
        setAllAppliedJobs: (state, action) => {
            state.allAppliedJobs = action.payload;
        },
        setSearchQuery: (state, action) => {
            state.searchQuery = action.payload;
        },
        setFilters: (state, action) => {
            state.filters = action.payload;
        },

    }
});

export const { setAllJobs, setSingleJob, setAllAdminJobs, setSearchJobByText, setAllAppliedJobs, setSearchQuery, setFilters } = jobSlice.actions;
export default jobSlice.reducer;
