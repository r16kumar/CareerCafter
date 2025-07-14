import React, { useState } from 'react'
import { Button } from './ui/button'
import { Search } from 'lucide-react'
import { useDispatch } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';
import { useNavigate } from 'react-router-dom';

const HeroSection = () => {
    const [query, setQuery] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const searchJobHandler = () => {
        dispatch(setSearchedQuery(query));
        navigate("/browse");
    }

    return (
        <div className='text-center bg-white py-12'>
            <div className='flex flex-col gap-6 my-10 text-center max-w-4xl mx-auto'>
                <span className=' mx-auto px-4 py-2 rounded-full bg-sky-50 text-[#1E40AF] font-medium transition-colors duration-300 hover:bg-[#1E40AF] hover:text-white'>Connecting Talent to Opportunies!</span>
                <h1 className='text-4xl font-bold text-gray-900'>Search, Apply & <br /> Get Your <span className='text-[#06B6D4]'>Dream Jobs</span></h1>
                <p className="text-gray-600 text-lg">Discover thousands of job opportunities tailored to your skills. Start your career journey today!</p>
                <div className='flex w-[40%] shadow-lg border border--[#E5E7EB] pl-3 rounded-full items-center gap-4 mx-auto bg-white'>
                    <input
                        type="text"
                        placeholder='Find your dream jobs'
                        onChange={(e) => setQuery(e.target.value)}
                        className='outline-none border-none w-full'

                    />
                    <Button onClick={searchJobHandler} className="rounded-r-full bg-[#1E40AF] hover:bg-[#1E3A8A]">
                        <Search className='h-5 w-5' />
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default HeroSection