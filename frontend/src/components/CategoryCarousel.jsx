/* eslint-disable no-unused-vars */
import React from 'react';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from './ui/carousel'; // Ensure this is correctly set up
import { Button } from './ui/button';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setSearchQuery } from '../redux/jobSlice'; // Ensure correct import path and named export

const categories = [
    "Frontend Developer",
    "Backend Developer",
    "Data Science",
    "Graphic Designer",
    "Fullstack Developer",
];

export const CategoryCarousel = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const searchJobHandler = (query) => {
        dispatch(setSearchQuery(query));
        navigate("/browse");
    };

    return (
        <div className="py-12 bg-gray-100">
            <div className="text-center mb-8">
                <h2 className="text-2xl font-semibold text-gray-800">Explore Job Categories</h2>
                <p className="text-gray-600 mt-2">
                    Select a category to browse relevant jobs.
                </p>
            </div>
            <Carousel className="w-full max-w-4xl mx-auto relative">
                <CarouselContent className="flex space-x-4 px-4">
                    {categories.map((category) => (
                        <CarouselItem
                            key={category}
                            className="flex-none w-1/3 md:w-1/4 lg:w-1/5"
                        >
                            <Button
                                onClick={() => searchJobHandler(category)}
                                className="w-full px-6 py-3 bg-purple-500 text-white font-semibold rounded-full shadow-md hover:bg-purple-700 transition-all"
                            >
                                {category}
                            </Button>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-200 p-2 rounded-full shadow hover:bg-gray-300 transition" />
                <CarouselNext className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-200 p-2 rounded-full shadow hover:bg-gray-300 transition" />
            </Carousel>
        </div>
    );
};
