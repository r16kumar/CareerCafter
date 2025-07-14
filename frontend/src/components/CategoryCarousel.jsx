import React from 'react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './ui/carousel';
import { Button } from './ui/button';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setSearchedQuery } from '@/redux/jobSlice';

const category = [
    "Frontend Developer",
    "Backend Developer",
    "Data Science",
    "Graphic Designer",
    "FullStack Developer"
]

const CategoryCarousel = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const searchJobHandler = (query) => {
        dispatch(setSearchedQuery(query));
        navigate("/browse");
    }

    return (
        <div className="bg-whitebpy-12">
            <div className="w-full max-w-4xl mx-auto relative">
            <Carousel className="w-full">
                <CarouselContent>
                    {
                        category.map((cat, index) => (
                            <CarouselItem key={index} className="basis-full sm:basis-1/2 lg:basis-1/3 px-2">
                                <Button onClick={()=>searchJobHandler(cat)} variant="outline" className="rounded-full bg-white border-[#E5E7EB] text-[#1E40AF] hover:bg-[#1E40AF] hover:text-white active:bg-[#1E3A8A] w-full py-2 text-base font-medium transition-all duration-300">{cat}</Button>
                            </CarouselItem>
                        ))
                    }
                </CarouselContent>
                <CarouselPrevious className="text-[#1E40AF] hover:text-[#06B6D4] bg-white border-[#E5E7EB] hover:bg-[#E0F2FE]" />
                <CarouselNext className="text-[#1E40AF] hover:text-[#06B6D4] bg-white border-[#E5E7EB] hover:bg-[#E0F2FE]"/>
            </Carousel>
            </div>
        </div>
    )
}

export default CategoryCarousel