import React, { useEffect, useState } from 'react'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { APPLICATION_API_END_POINT, JOB_API_END_POINT } from '@/utils/constant';
import { setSingleJob } from '@/redux/jobSlice';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'sonner';


const JobDescription = () => {
    const {singleJob} = useSelector(store => store.job);
    const {user} = useSelector(store=>store.auth);
    const isIntiallyApplied = singleJob?.applications?.some(application => application.applicant === user?._id) || false;
    const [isApplied, setIsApplied] = useState(isIntiallyApplied);
    const [error, setError] = useState(null);

    const params = useParams();
    const jobId = params.id;
    const dispatch = useDispatch();

    const applyJobHandler = async () => {
        try {
            const res = await axios.get(`${APPLICATION_API_END_POINT}/apply/${jobId}`, {withCredentials:true});
            
            if(res.data.success){
                setIsApplied(true); // Update the local state
                const updatedSingleJob = {...singleJob, applications:[...singleJob.applications,{applicant:user?._id}]}
                dispatch(setSingleJob(updatedSingleJob)); // helps us to real time UI update
                toast.success(res.data.message);

            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        }
    }

    useEffect(()=>{
        const fetchSingleJob = async () => {
            try {
                const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`,{withCredentials:true});
                if(res.data.success){
                    dispatch(setSingleJob(res.data.job));
                    setIsApplied(res.data.job.applications.some(application=>application.applicant === user?._id)) // Ensure the state is in sync with fetched data
                }
                else{setError('Job not found');
                     toast.error('Job not found');}
            } catch (error) {
                console.log(error);
                setError(error.response?.data?.message || 'Failed to fetch job');
        toast.error(error.response?.data?.message || 'Failed to fetch job');
            }
        }
        fetchSingleJob(); 
    },[jobId,dispatch, user?._id]);
    // Add error and loading checks here

  if (error) return <div className="text-center text-[#F97316] text-lg font-semibold my-10">Error: {error}</div>;
  if (!singleJob) return <div className="text-center text-[#1E40AF] text-lg font-semibold my-10">Loading...</div>;

    return (
        <div className='max-w-7xl mx-auto my-10 px-4 sm:px-6 lg:px-8'>
            <div className='flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4'>
                <div>
                    <h1 className='font-bold text-2xl text-[#1E40AF]'>{singleJob?.title}</h1>
                    <div className='flex items-center gap-2 mt-4 flex-wrap'>
                        <Badge className="bg-[#E0F2FE] text-[#1E40AF] font-semibold hover:bg-[#06B6D4] hover:text-white">{singleJob?.postion} Positions</Badge>
                        <Badge className='bg-[#E0F2FE] text-[#1E40AF] font-semibold hover:bg-[#06B6D4] hover:text-white'>{singleJob?.jobType}</Badge>
                        <Badge className="bg-[#E0F2FE] text-[#1E40AF] font-semibold hover:bg-[#06B6D4] hover:text-white">{singleJob?.salary}LPA</Badge>
                    </div>
                </div>
                <Button
                onClick={isApplied ? null : applyJobHandler}
                    disabled={isApplied}
                    className={`rounded-lg text-white font-semibold py-2 px-4 ${isApplied ? 'bg-gray-600 cursor-not-allowed' : 'bg-[#1E40AF] hover:bg-[#F97316] focus:ring-2 focus:ring-[#06B6D4]'}`}>
                    {isApplied ? 'Already Applied' : 'Apply Now'}
                </Button>
            </div>
            <h2 className='border-b-2 border-[#E5E7EB] font-semibold text-lg text-[#1E40AF] py-4 mt-6'>Job Description</h2>
            <div className='my-6 space-y-3'>
                <h3 className='font-semibold text-[#1E40AF]'>Role:{' '} <span className='pl-4 font-normal text-gray-600'>{singleJob?.title}</span></h3>
                <h3 className='font-semibold text-[#1E40AF]'>Location: <span className='pl-4 font-normal text-gray-800'>{singleJob?.location}</span></h3>
                <h3 className='font-semibold text-[#1E40AF]'>Description: <span className='pl-4 font-normal text-gray-800'>{singleJob?.description}</span></h3>
                <h3 className='font-semibold text-[#1E40AF]'>Experience: <span className='pl-4 font-normal text-gray-800'>{singleJob?.experience} yrs</span></h3>
                <h3 className='font-semibold text-[#1E40AF]'>Salary: <span className='pl-4 font-normal text-gray-800'>{singleJob?.salary}LPA</span></h3>
                <h3 className='font-semibold text-[#1E40AF]'>Total Applicants: <span className='pl-4 font-normal text-gray-800'>{singleJob?.applications?.length || 0}</span></h3>
                <h3 className='font-semibold text-[#1E40AF]'>Posted Date: <span className='pl-4 font-normal text-gray-800'>{singleJob?.createdAt && typeof singleJob.createdAt === 'string' ? singleJob.createdAt.split("T")[0] : 'N/A'}</span></h3>
            </div>
        </div>
    )
}

export default JobDescription

// {singleJob?.createdAt.split("T")[0]}